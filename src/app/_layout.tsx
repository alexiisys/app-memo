// Import  global CSS file
import '../../global.css';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import FlashMessage from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import AppLinkWrapper from '@/components/wrappers/app-link-wrapper';
import { loadSelectedTheme } from '@/lib';
import { readSettings } from '@/lib/storage';
import { loadSelectedTheme } from '@/lib';
import { readMemories } from '@/lib/storages/memories';
import { readProfile } from '@/lib/storages/profile';
import { readSettings } from '@/lib/storages/settings';
import { useThemeConfig } from '@/lib/use-theme-config';
import {
  initializeFacebookAttribution,
  trackAppLaunch
} from '@/lib/attribution';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(app)',
};

loadSelectedTheme();
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <Providers>
      <Stack>
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen
          name="profile-memory/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="edit-profile" options={{ headerShown: false }} />
        <Stack.Screen
          name="new-profile-memory"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="report" />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeConfig();

  useEffect(() => {
    readSettings();
    readProfile();
    readMemories();

    // Initialize Facebook attribution tracking
    initializeFacebookAttribution();
    trackAppLaunch();
  });
  return (
    <GestureHandlerRootView
      style={styles.container}
      className={theme.dark ? `dark` : undefined}
    >
      <KeyboardProvider>
        <ThemeProvider value={theme}>
          <BottomSheetModalProvider>
            <AppLinkWrapper loader={<Text>Loading...</Text>}>
              {children}
            </AppLinkWrapper>
            <FlashMessage position="top" />
          </BottomSheetModalProvider>
        </ThemeProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
