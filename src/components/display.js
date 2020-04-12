import cn from '../../i18n/cn';
import en from '../../i18n/en';

const translations = {
  cn, en
};

export function translateCourseOperationStatus(lang, status) {
  return translations?.[lang]?.courseOperationStatus?.[status] ?? status;
}

export function formatDate(date) {
  return (new Date(date)).toISOString().slice(0, 10);
}