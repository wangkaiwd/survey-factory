import { create } from 'zustand'

interface AppStoreState {
  loading: boolean
  actions: AppStoreActions
}

interface AppStoreActions {
  setLoading: (loading: boolean) => void
}

export const useAppStore = create<AppStoreState>()((set) => {
  return {
    loading: true,
    actions: {
      setLoading: (loading: boolean) => {
        set(() => ({ loading }))
      },
    },
  }
})

export const useAppStoreActions = () => useAppStore((state) => state.actions)
