import { getItem, setItem } from '@/lib/storage/helpers';
import { type Settings } from '@/types/settings';

const store = 'settings';

export const getSettings = () => getItem<Settings>(store);
export const writeSettings = (value: Settings) =>
  setItem<Settings>(store, value);
