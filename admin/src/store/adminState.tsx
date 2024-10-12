import { create } from 'zustand'


const useStore = create((set) => ({
  data : null,
  loading:true,
  setloading : () => set({loading: false}),
  login: (data:any) => set(() => ({data})),
  logout: () => set(() => ({data:null})),
}))

export default useStore as any;