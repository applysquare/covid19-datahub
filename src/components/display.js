import cn from "../../i18n/cn";
import en from "../../i18n/en";

const translations = {
  cn,
  en,
};

function translateL2(lang, key1, key2) {
  return translations?.[lang]?.[key1]?.[key2] ?? key2;
}

export function translateBingAreaId(lang, id) {
  return translateL2(lang, "bingAreaId", id);
}

export function translateCourseOperationStatus(lang, status) {
  return translateL2(lang, "courseOperationStatus", status);
}

export function formatDate(date) {
  return new Date(date).toISOString().slice(0, 10);
}

export const sliceArr = (arr = [], num = 0) => {
  return arr.length > num ? arr.slice(0, num) : arr;
};

export const domainURI = (str = "") => {
  const durl = /.*:\/\/([^/]*).*/;
  const domain = str.match(durl);
  return domain && domain[1] ? domain[1] : str;
};
