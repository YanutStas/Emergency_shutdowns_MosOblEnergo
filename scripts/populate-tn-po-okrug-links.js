#!/usr/bin/env node
"use strict";

const PAGE_SIZE = 100;
const COLLECTION = "tn-po-okrug-links";
const WRITE = process.argv.includes("--write");

const env = (name, fallback = "") => process.env[name] || fallback;

const STRAPI_URL = String(env("URL_STRAPI", "https://jtv.mosoblenergo.ru")).replace(/\/$/, "");
const LOGIN = env("LOGIN_STRAPI");
const PASSWORD = env("PASSWORD_STRAPI");

const normalizeKey = (value) =>
  String(value || "")
    .replace(/ё/g, "е")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const mapItem = (item) => {
  const attributes = item?.attributes || {};
  return {
    id: item?.id ?? attributes.id,
    documentId: item?.documentId || attributes.documentId || null,
    ...attributes,
    ...item,
  };
};

const toList = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(mapItem).filter(Boolean);
  if (Array.isArray(value.data)) return value.data.map(mapItem).filter(Boolean);
  if (value.data) return [mapItem(value.data)].filter(Boolean);
  return [mapItem(value)].filter(Boolean);
};

const getWriteId = (row) => row?.documentId || row?.id;

const toQuery = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) query.append(key, value);
  });
  return query.toString();
};

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const error = new Error(`HTTP ${response.status}`);
    error.response = { status: response.status, data };
    throw error;
  }

  return data;
};

const createClient = (jwt) => ({
  get: async (path, { params } = {}) => {
    const query = toQuery(params);
    const data = await fetchJson(`${STRAPI_URL}${path}${query ? `?${query}` : ""}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return { data };
  },
  post: async (path, body) => {
    const data = await fetchJson(`${STRAPI_URL}${path}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${jwt}` },
      body: JSON.stringify(body),
    });
    return { data };
  },
});

const getResource = (row, key) => {
  const value = row?.[key];
  return value === null || value === undefined || value === "" ? null : value;
};

const getAuthToken = async () => {
  if (!LOGIN || !PASSWORD) {
    throw new Error("Нужны env LOGIN_STRAPI и PASSWORD_STRAPI");
  }

  const data = await fetchJson(`${STRAPI_URL}/api/auth/local`, {
    method: "POST",
    body: JSON.stringify({
    identifier: LOGIN,
    password: PASSWORD,
    }),
  });

  if (!data?.jwt) throw new Error("Strapi не вернула jwt");
  return data.jwt;
};

const fetchAll = async (client, path, params) => {
  const rows = [];
  let page = 1;
  let pageCount = 1;

  do {
    const { data } = await client.get(path, {
      params: {
        ...params,
        "pagination[page]": page,
        "pagination[pageSize]": PAGE_SIZE,
      },
    });

    rows.push(...(Array.isArray(data?.data) ? data.data.map(mapItem) : []));
    pageCount = Number(data?.meta?.pagination?.pageCount || 1);
    page += 1;
  } while (page <= pageCount);

  return rows;
};

const getOkrugRowsForPo = (poRow, fallbackOkruga = []) => {
  const poOkruga = toList(poRow?.tn_okruga);
  return poOkruga.length ? poOkruga : fallbackOkruga;
};

const relationValue = (row) => getWriteId(row);

const buildLinkName = (filialRow, poRow, okrugRow) =>
  [filialRow?.name, poRow?.name, okrugRow?.name || okrugRow?.source_name]
    .filter(Boolean)
    .join(" / ");

const buildLinkKey = (filialRow, poRow, okrugRow) =>
  [
    normalizeKey(getWriteId(filialRow) || filialRow?.name),
    normalizeKey(getWriteId(poRow) || poRow?.name),
    normalizeKey(getWriteId(okrugRow) || okrugRow?.name || okrugRow?.source_name),
  ].join("|||");

const createLinkPayload = (filialRow, poRow, okrugRow, sortOrder) => ({
  name: buildLinkName(filialRow, poRow, okrugRow),
  is_active: poRow?.is_active !== false && okrugRow?.is_active !== false,
  sort_order: sortOrder,
  ovb: getResource(poRow, "ovb") ?? getResource(okrugRow, "ovb") ?? getResource(filialRow, "ovb"),
  osn_resours:
    getResource(poRow, "osn_resours") ??
    getResource(okrugRow, "osn_resours") ??
    getResource(filialRow, "osn_resours"),
  comment: "Автозаполнение из текущих связей ТН: Филиалы / ПО / Округа",
  tn_filialy: relationValue(filialRow),
  tn_po: relationValue(poRow),
  tn_okrug: relationValue(okrugRow),
});

const main = async () => {
  const jwt = await getAuthToken();
  const client = createClient(jwt);

  const filialRows = await fetchAll(client, "/api/tn-filialies", {
    status: "draft",
    "filters[is_active][$eq]": true,
    "fields[0]": "name",
    "fields[1]": "is_active",
    "fields[2]": "sort_order",
    "fields[3]": "ovb",
    "fields[4]": "osn_resours",
    "populate[tn_okruga][fields][0]": "name",
    "populate[tn_okruga][fields][1]": "source_name",
    "populate[tn_okruga][fields][2]": "sort_order",
    "populate[tn_okruga][fields][3]": "is_active",
    "populate[tn_okruga][fields][4]": "ovb",
    "populate[tn_okruga][fields][5]": "osn_resours",
    "populate[tn_pos][fields][0]": "name",
    "populate[tn_pos][fields][1]": "sort_order",
    "populate[tn_pos][fields][2]": "is_active",
    "populate[tn_pos][fields][3]": "ovb",
    "populate[tn_pos][fields][4]": "osn_resours",
    "populate[tn_pos][populate][tn_okruga][fields][0]": "name",
    "populate[tn_pos][populate][tn_okruga][fields][1]": "source_name",
    "populate[tn_pos][populate][tn_okruga][fields][2]": "sort_order",
    "populate[tn_pos][populate][tn_okruga][fields][3]": "is_active",
    "populate[tn_pos][populate][tn_okruga][fields][4]": "ovb",
    "populate[tn_pos][populate][tn_okruga][fields][5]": "osn_resours",
    "sort[0]": "sort_order:asc",
  });

  const existingRows = await fetchAll(client, `/api/${COLLECTION}`, {
    status: "draft",
    "fields[0]": "name",
    "pagination[withCount]": false,
    "populate[tn_filialy][fields][0]": "name",
    "populate[tn_po][fields][0]": "name",
    "populate[tn_okrug][fields][0]": "name",
  }).catch((error) => {
    if (error?.response?.status === 404) {
      throw new Error(
        `Endpoint /api/${COLLECTION} еще не существует. Сначала задеплой и перезапусти Strapi с новой collection.`
      );
    }
    throw error;
  });

  const existingKeys = new Set(
    existingRows.map((row) =>
      buildLinkKey(
        toList(row?.tn_filialy)[0],
        toList(row?.tn_po)[0],
        toList(row?.tn_okrug)[0]
      )
    )
  );

  const links = [];
  const seenKeys = new Set(existingKeys);

  filialRows.forEach((filialRow) => {
    const filialOkruga = toList(filialRow?.tn_okruga).filter((row) => row?.is_active !== false);
    const poRows = toList(filialRow?.tn_pos).filter((row) => row?.is_active !== false);
    const sourcePoRows = poRows.length
      ? poRows
      : filialOkruga.map((okrugRow) => ({
          id: `direct-${getWriteId(okrugRow)}`,
          documentId: `direct-${getWriteId(okrugRow)}`,
          name: okrugRow?.name || okrugRow?.source_name,
          is_active: okrugRow?.is_active,
          sort_order: okrugRow?.sort_order,
          ovb: okrugRow?.ovb,
          osn_resours: okrugRow?.osn_resours,
          tn_okruga: [okrugRow],
        }));

    sourcePoRows.forEach((poRow) => {
      if (String(getWriteId(poRow) || "").startsWith("direct-")) return;

      getOkrugRowsForPo(poRow, filialOkruga)
        .filter((okrugRow) => okrugRow?.is_active !== false)
        .forEach((okrugRow) => {
          const key = buildLinkKey(filialRow, poRow, okrugRow);
          if (seenKeys.has(key)) return;
          seenKeys.add(key);
          links.push(createLinkPayload(filialRow, poRow, okrugRow, links.length + 1));
        });
    });
  });

  console.log(
    `[tn-po-okrug-links] Филиалов: ${filialRows.length}, уже есть связок: ${existingRows.length}, новых к созданию: ${links.length}`
  );
  console.table(
    links.slice(0, 20).map((link) => ({
      name: link.name,
      ovb: link.ovb,
      osn_resours: link.osn_resours,
    }))
  );
  if (links.length > 20) console.log(`...и еще ${links.length - 20}`);

  if (!WRITE) {
    console.log("[tn-po-okrug-links] Dry-run. Для записи добавь --write");
    return;
  }

  for (const link of links) {
    await client.post(`/api/${COLLECTION}`, {
      data: {
        ...link,
        publishedAt: new Date().toISOString(),
      },
    });
    console.log(`[tn-po-okrug-links] created: ${link.name}`);
  }
};

main().catch((error) => {
  console.error(
    "[tn-po-okrug-links] Ошибка:",
    error?.response?.data || error?.message || error
  );
  process.exit(1);
});
