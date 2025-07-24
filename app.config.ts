/* eslint-disable max-lines-per-function */
import type { ConfigContext, ExpoConfig } from '@expo/config';
import type { AppIconBadgeConfig } from 'app-icon-badge/types';

import { ClientEnv, Env } from './env';

const appIconBadgeConfig: AppIconBadgeConfig = {
  enabled: Env.APP_ENV !== 'production',
  badges: [
    {
      text: Env.APP_ENV,
      type: 'banner',
      color: 'white',
    },
    {
      text: Env.VERSION.toString(),
      type: 'ribbon',
      color: 'white',
    },
  ],
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: Env.NAME,
  description: `${Env.NAME} Mobile App`,
  owner: Env.EXPO_ACCOUNT_OWNER,
  scheme: Env.SCHEME,
  slug: Env.SLUG,
  version: Env.VERSION.toString(),
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    buildNumber: '1',
    supportsTablet: false,
    bundleIdentifier: Env.BUNDLE_ID,
    associatedDomains: [
      `applinks:gnyq7.app.link`,
      `applinks:gnyq7-alternate.app.link`,
    ],
    config: {
      usesNonExemptEncryption: false, // Avoid the export compliance warning on the app store
    },
  },
  experiments: {
    typedRoutes: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#2E3C4B',
    },
    package: Env.PACKAGE,
  },
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
  },
  plugins: [
    [
      '@config-plugins/react-native-branch',
      {
        apiKey: Env.BRANCH_SDK_KEY,
        iosAppDomain: 'gnyq7.app.link',
      },
    ],

    [
      'react-native-fbsdk-next',
      {
        appID: Env.FB_APP_ID,
        clientToken: Env.FB_CLIENT_TOKEN,
        displayName: Env.NAME,
        scheme: `fb${Env.FB_APP_ID}`,
        advertiserIDCollectionEnabled: true,
        autoLogAppEventsEnabled: true,
        isAutoInitEnabled: true,
      },
    ],
    [
      'expo-splash-screen',
      {
        backgroundColor: '#2E3C4B',
        image: './assets/splash-icon.png',
        imageWidth: 150,
      },
    ],
    [
      'expo-image-picker',
      {
        photosPermission: 'The app accesses your photos.',
      },
    ],
    [
      'expo-font',
      {
        fonts: [
          './assets/fonts/Gilroy-Regular.ttf',
          './assets/fonts/Gilroy-Bold.ttf',
          './assets/fonts/Gilroy-SemiBold.ttf',
          './assets/fonts/Gilroy-Medium.ttf',
          './assets/fonts/Gilroy-ExtraBold.ttf',
          './assets/fonts/Gilroy-Thin.ttf',
          './assets/fonts/Gilroy-UltraLight.ttf',
          './assets/fonts/Gilroy-Light.ttf',
          './assets/fonts/Gilroy-Black.ttf',
        ],
      },
    ],
    'expo-localization',
    'expo-router',
    ['app-icon-badge', appIconBadgeConfig],
    ['react-native-edge-to-edge'],
  ],
  extra: {
    ...ClientEnv,
    eas: {
      projectId: Env.EAS_PROJECT_ID,
    },
  },
});
