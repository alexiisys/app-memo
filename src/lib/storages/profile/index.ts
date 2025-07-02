import { create } from 'zustand';

import { createSelectors } from '@/lib';
import { type Profile } from '@/types';

import { getProfile, writeProfile } from './utils';

interface ProfileState {
  profile: Profile | null;
  readProfile: () => void;
  setProfile: (profile: Profile) => void;
  updateProfile: (profile: Partial<Profile>) => void;
  clearProfile: () => void;
}

const _useProfile = create<ProfileState>((set) => ({
  profile: null,
  readProfile: () => {
    set({ profile: getProfile() });
  },
  setProfile: (profile: Profile) => {
    set({ profile });
    writeProfile(profile);
  },
  updateProfile: (data: Partial<Profile>) => {
    set((state) => {
      const updated = { ...state.profile, ...data } as Profile;
      writeProfile(updated);
      return { profile: updated };
    });
  },
  clearProfile: () => {
    set({ profile: null });
    writeProfile(null);
  },
}));

export const useProfile = createSelectors(_useProfile);

export const readProfile = _useProfile.getState().readProfile;
export const setProfile = _useProfile.getState().setProfile;
export const updateProfile = _useProfile.getState().updateProfile;
export const clearProfile = _useProfile.getState().clearProfile;
