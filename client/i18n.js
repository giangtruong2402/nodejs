import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import các file ngôn ngữ
import translationEN from './locales/en/translation.json';
import translationVI from './locales/vi/translation.json';

// Cấu hình i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN
      },
      vi: {
        translation: translationVI
      }
    },
    lng: 'en', // Ngôn ngữ mặc định
    fallbackLng: 'en', // Ngôn ngữ dự phòng nếu ngôn ngữ hiện tại không có
    interpolation: {
      escapeValue: false // React đã thoát giá trị mặc định
    }
  });

export default i18n;
