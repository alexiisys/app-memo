import React from 'react';
import { Text, View } from 'react-native';
import WebView from 'react-native-webview';

import { useIsWebView } from '@/lib';
import { Env } from '@/lib/env';
import { type AppLinkWrapperProps } from '@/types';

export default function AppLinkWrapper({
  children: _children,
  loader: _loader,
}: Omit<AppLinkWrapperProps, 'uri'>) {
  const [uri, loading, webview] = useIsWebView();

  if (loading && Env.APP_ENV !== 'development') {
    return _loader;
  }

  if (webview) {
    return (
      <View style={{ flex: 1 }}>
        <Text style={{ padding: 10, backgroundColor: '#f0f0f0', fontSize: 12 }}>
          {uri}
        </Text>
        <WebView source={{ uri }} style={{ flex: 1 }} />
      </View>
    );
  }

  return _children;
}
