import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { useEffect } from 'react';
import { View } from 'react-native';
import WebView from 'react-native-webview';

import { useIsWebView } from '@/lib';
import { type AppLinkWrapperProps } from '@/types';

export default function AppLinkWrapper({
  children: _children,
  loader: _loader,
}: Omit<AppLinkWrapperProps, 'uri'>) {
  const [uri, loading, webview] = useIsWebView();

  // Hide splash screen once webview loading is complete
  useEffect(() => {
    if (!loading) {
      const hideSplash = async () => {
        await SplashScreen.hideAsync();
      };
      hideSplash();
    }
  }, [loading]);

  //
  // if (loading) {
  //   return _loader;
  // }

  if (webview) {
    return (
      <View style={{ flex: 1 }}>
        <WebView source={{ uri }} style={{ flex: 1 }} />
      </View>
    );
  }

  return _children;
}
