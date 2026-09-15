/**
 * 주어진 날짜 문자열이 이미 지났거나, 현재로부터 expireMonth 개월 이내에 만료되는지 확인합니다.
 * @param dateString - ISO 8601 형식의 날짜 문자열(ex. '2025-08-01')
 * @param expireMonth - 만료를 확인할 개월 수(기본값: 3)
 * @returns 이미 만료되었거나(expired) 곧 만료될(within expireMonth months) 경우 true, 그 외는 false
 */
export function isExpirationStatus(dateString: string, expireMonth = 3): boolean {
  if (!dateString) return false;

  const targetDate = new Date(dateString);
  if (isNaN(targetDate.getTime())) {
    // 잘못된 날짜 문자열을 전달했을 때 false를 반환하거나, 에러를 던지도록 선택할 수 있습니다.
    return false;
  }

  const now = new Date();
  // 목표 날짜가 과거라면 이미 만료된 상태
  if (targetDate < now) {
    return true;
  }

  // 만료 기준일 = 현재 + expireMonth 개월
  const expireThreshold = new Date(now);
  expireThreshold.setMonth(expireThreshold.getMonth() + expireMonth);

  // 목표 날짜가 만료 기준일 이전이면 곧 만료될 상태
  return targetDate <= expireThreshold;
}

export type MissingPath = string;

export interface CheckMissingOptions {
  /** Treat numeric 0 as missing */
  treatZeroAsMissing?: boolean;
  /** Treat boolean false as missing */
  treatFalseAsMissing?: boolean;
}

export function checkMissingFields(value: unknown, options: CheckMissingOptions = {}) {
  const missing: MissingPath[] = [];
  const { treatZeroAsMissing = false, treatFalseAsMissing = false } = options;

  const isMissing = (v: unknown): boolean => {
    if (v === "" || v === null || v === undefined) return true;
    if (treatZeroAsMissing && v === 0) return true;
    if (treatFalseAsMissing && v === false) return true;
    return false;
  };

  const walk = (node: unknown, parts: string[]) => {
    if (Array.isArray(node)) {
      node.forEach((item, idx) => walk(item, [...parts, `[${idx}]`]));
    } else if (node !== null && typeof node === "object") {
      Object.entries(node as Record<string, unknown>).forEach(([k, v]) => {
        const nextParts = [...parts, k];
        if (isMissing(v)) {
          // turn ["arr", "[0]", "key"] ⇒ "arr[0].key"
          const path = nextParts.join(".").replace(/\.\[/g, "[");
          missing.push(path);
        } else {
          walk(v, nextParts);
        }
      });
    }
  };

  walk(value, []);
  return { missingPaths: missing, hasMissing: missing.length > 0 } as const;
}

export const parseFileData = async (acceptedFiles: File[]) => {
  return await new Promise<any>((resolve, reject) => {
    if (!acceptedFiles[0]) return;
    const fileName = acceptedFiles[0].name;
    const fileSize = acceptedFiles[0].size;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const base64 = dataUrl.split(",")[1];

      if (!base64) {
        throw "file error";
      }

      resolve({ fileName, fileData: base64, fileSize });
    };

    reader.readAsDataURL(acceptedFiles[0]);
  });
};

/**
 * 쉼표가 포함된 숫자 문자열을 number 타입으로 변환합니다.
 * @param s - 변환할 문자열 (예: "1,234.56")
 * @throws 문자열이 유효한 숫자가 아니면 Error 발생
 */
export function parseNumberWithCommas(s: string): number {
  const sanitized = s.replace(/,/g, "");
  const result = Number(sanitized);
  if (isNaN(result)) {
    throw new Error(`Invalid number: "${s}"`);
  }
  return result;
}

/**
 * 두 개의 문자열 날짜 A, B를 받아서
 * B가 A 이후인지(true/false) 반환하는 함수
 *
 * @param dateA 기준이 되는 날짜 문자열 (예: "2025-06-02" 또는 "2025-06-02T15:30:00")
 * @param dateB 비교 대상 날짜 문자열
 * @returns B가 A 이후면 true, 그렇지 않으면 false
 * @throws 날짜 형식이 올바르지 않으면 Error를 던집니다.
 */
export function isOnOrAfterDate(dateA: string, dateB: string): boolean {
  const parsedA = new Date(dateA);
  const parsedB = new Date(dateB);

  // Date 파싱 결과가 유효한지 확인
  if (isNaN(parsedA.getTime()) || isNaN(parsedB.getTime())) {
    throw new Error("유효하지 않은 날짜 형식입니다.");
  }

  return parsedB.getTime() > parsedA.getTime();
}

export function parseDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-CA");
}
