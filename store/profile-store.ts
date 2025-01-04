import { create } from 'zustand';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
  photo: string;
  createdAt: any;
}

interface ProfileStore {
  user: User | null; // Use `null` for an initial state when no user is loaded
  setUser: (user: User) => void;
}

const useProfileStore = create<ProfileStore>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user })),
}));

export default useProfileStore;
