import cn from "../../i18n/cn";
import en from "../../i18n/en";

const translations = {
  cn,
  en
};

export function translateCourseOperationStatus(lang, status) {
  return translations?.[lang]?.courseOperationStatus?.[status] ?? status;
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

export const goBack = () => {
  window.history.back();
};
