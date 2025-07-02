import { create } from 'zustand';

import { createSelectors } from '@/lib';
import { getSettings } from '@/lib/storages/settings/utils';
import { type Settings } from '@/types/settings';

interface AccountState {
  settings: Settings;
  readSettings: () => void;
}

const _useSetting = create<AccountState>((set) => ({
  settings: {},
  readSettings: () => {
    set((state) => ({ settings: getSettings() || state.settings }));
  },
}));

export const useSetting = createSelectors(_useSetting);

export const readSettings = () => _useSetting.getState().readSettings();
