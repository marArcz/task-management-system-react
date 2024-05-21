import { create } from 'zustand'

export const useAuthStore = create((set) => ({
    user: null,
    logout: () => set({ user: null }),
    setUser: (u) => set({user:u})
}))
