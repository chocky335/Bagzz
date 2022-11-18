import {initReactI18next} from 'react-i18next';
import {I18nManager, NativeModules, Platform} from 'react-native';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-community/async-storage';
import i18n, {LanguageDetectorAsyncModule} from 'i18next';

import 'intl-pluralrules';

import {USER_LANG} from '$src/constants';

const getDeviceLang = () => {
  const appLanguage =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier;

  return appLanguage.search(/-|_/g) !== -1
    ? appLanguage.slice(0, 2)
    : appLanguage;
};

const languageDetector: LanguageDetectorAsyncModule = {
  init: () => {},
  type: 'languageDetector',
  async: true,
  detect: async callback => {
    const userLang = await AsyncStorage.getItem(USER_LANG);

    const deviceLang = userLang || getDeviceLang();
    const isLangRTL = deviceLang === 'ar';
    if (isLangRTL !== I18nManager.isRTL) {
      await I18nManager.allowRTL(isLangRTL);
      await I18nManager.forceRTL(isLangRTL);
      RNRestart.Restart();
    }
    callback(deviceLang);
  },
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources: {
      en: {
        translation: require('./en.json'),
      },
    },
    debug: true,
    cache: {
      enabled: true,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
