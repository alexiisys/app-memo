import { type Memory } from '@/types/memory';
import { getItem, setItem } from '@/lib/storage/helpers';

const store = 'memories';

export const getMemories = () => getItem<Memory[]>(store);
export const writeMemories = (value: Memory[]) =>
  setItem<Memory[]>(store, value);
