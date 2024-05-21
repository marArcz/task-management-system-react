import { create } from 'zustand'

export const useProcessingState = create((set) => ({
    processing: false,
    setProcessing: (st) => set({processing:st})
}))
