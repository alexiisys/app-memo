import * as Application from 'expo-application';
import * as Device from 'expo-device';

export const appendUTMParameters = async (_url: string) => {
  try {
    const OS = Device.osName;
    const url = new URL(_url);
    Array.from(url.searchParams.keys()).forEach((item) => {
      const lower = item.toLowerCase();
      (lower.startsWith('utm_') || lower === 's1' || lower === 's2' || lower === 's3') &&
        url.searchParams.delete(item);
    });

    const deviceID =
      OS === 'ios'
        ? ((await Application.getIosIdForVendorAsync()) ?? crypto.randomUUID())
        : Application.getAndroidId();

    url.searchParams.append('s1', deviceID ?? '');
    url.searchParams.append('s2', OS ?? '');
    url.searchParams.append('s3', 'com.truelinkchat.app');

    return url.toString();
  } catch {
    return '';
  }
};
