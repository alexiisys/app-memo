import { getItem, setItem } from '@/lib/storage/helpers';
import { type Profile } from '@/types';

const store = 'profile';

export const getProfile = () => getItem<Profile | null>(store);
export const writeProfile = (value: Profile | null) =>
  setItem<Profile | null>(store, value);
