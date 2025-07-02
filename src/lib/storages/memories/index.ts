import { create } from 'zustand';

import { createSelectors } from '@/lib';
import { type Memory } from '@/types/memory';

import { getMemories, writeMemories } from './utils';

interface MemoryState {
  memories: Memory[];
  readMemories: () => void;
  addMemory: (memory: Memory) => void;
  deleteMemory: (id: string) => void;
  getMemory: (id: string) => Memory | undefined;
  updateMemory: (memory: Memory) => void;
}

const _useMemory = create<MemoryState>((set, get) => ({
  memories: [],
  readMemories: () => {
    set((state) => ({ memories: getMemories() || state.memories }));
  },
  getMemory: (id: string) => {
    return get().memories.find((item) => item.id === id);
  },
  addMemory: (memory: Memory) => {
    set((state) => ({ memories: [...state.memories, memory] }));
    writeMemories(get().memories);
  },
  deleteMemory: (id: string) => {
    set((state) => ({
      memories: state.memories.filter((item) => item.id !== id),
    }));
    writeMemories(get().memories);
  },
  updateMemory: (memory: Memory) => {
    set((state) => ({
      memories: state.memories.map((item) =>
        item.id === memory.id ? memory : item
      ),
    }));
    writeMemories(get().memories);
  },
}));

export const useMemory = createSelectors(_useMemory);

export const readMemories = _useMemory.getState().readMemories;
export const getMemory = _useMemory.getState().getMemory;
export const addMemory = (memory: Memory) =>
  _useMemory.getState().addMemory(memory);
export const deleteMemory = _useMemory.getState().deleteMemory;
export const updateMemory = _useMemory.getState().updateMemory;
