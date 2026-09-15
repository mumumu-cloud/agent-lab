export const COUNTRY_CODE_MAP = {
  "CC-COUNTRY-012": "CAN",
  "CC-COUNTRY-003": "CHN",
  "CC-COUNTRY-010": "GBR",
  "CC-COUNTRY-011": "HUN",
  "CC-COUNTRY-009": "IDN",
  "CC-COUNTRY-004": "IND",
  "CC-COUNTRY-005": "JPN",
  "CC-COUNTRY-002": "KOR",
  "CC-COUNTRY-006": "OMN",
  "CC-COUNTRY-007": "SGP",
  "CC-COUNTRY-008": "TWN",
  "CC-COUNTRY-001": "USA",
} as const;

export const COUNTRY_NAME_MAP = {
  "CC-COUNTRY-012": "Canada",
  "CC-COUNTRY-003": "China",
  "CC-COUNTRY-010": "United Kingdom",
  "CC-COUNTRY-011": "Hungary",
  "CC-COUNTRY-009": "Indonesia",
  "CC-COUNTRY-004": "India",
  "CC-COUNTRY-005": "Japan",
  "CC-COUNTRY-002": "Korea",
  "CC-COUNTRY-006": "Oman",
  "CC-COUNTRY-007": "Singapore",
  "CC-COUNTRY-008": "Taiwan",
  "CC-COUNTRY-001": "United States",
};

export const COUNTRY_LIST = Object.entries(COUNTRY_CODE_MAP).map(([key]) => {
  return {
    label: COUNTRY_NAME_MAP[key as keyof typeof COUNTRY_NAME_MAP],
    value: key,
  };
});
