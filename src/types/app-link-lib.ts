import { type ReactElement, type ReactNode } from 'react';
import { type WebViewProps } from 'react-native-webview';

export type CustomWebViewProps = WebViewProps;
export type AppLinkWrapperProps = {
  children: ReactNode;
  loader: ReactElement;
};
