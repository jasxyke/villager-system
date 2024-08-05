import { create } from 'zustand'

const useAuthStore = create((set)=>({
    loading: false,
    user: null,
    setLoading: ()=> set((state)=>({loading: state.}))
}))