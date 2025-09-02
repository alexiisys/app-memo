import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';
import { type WebViewSourceUri } from 'react-native-webview/lib/WebViewTypes';

import { appendUTMParameters } from '@/lib/utils';
import { type CustomWebViewProps } from '@/types';

export default function CustomWebView({
  source,
  ...props
}: CustomWebViewProps) {
  const { uri, ...sourceProps } = (source as WebViewSourceUri) ?? { uri: '' };
  const [uriUTM, setUriUTM] = useState<string>(uri ?? '');

  useEffect(() => {
    if (uri) {
      appendUTMParameters(uri).then((modifiedUri) => {
        setUriUTM(modifiedUri || uri);
      });
    }
  }, [uri]);

  // Don't render WebView if URI is empty
  if (!uriUTM) {
    return null;
  }

  return <WebView source={{ uri: uriUTM, ...sourceProps }} {...props} />;
}
