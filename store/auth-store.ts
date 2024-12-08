import { create } from 'zustand';

export interface AuthState {
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;

  isLocation: boolean;
  setIsLocation: (isLocation: boolean) => void;

  email: string;
  setEmail: (email: string) => void;

  password: string;
  setPassword: (password: string) => void;

  firstName: string;
  setFirstName: (firstName: string) => void;

  lastName: string;
  setLastName: (lastName: string) => void;

  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;

  photo: string;
  setPhoto: (photo: string) => void;

  location: string;
  setLocation: (location: string) => void;

  isLoggedIn: null | string | boolean;
  setIsLoggedIn: (isLoggedIn: null | string) => void;

  // user data
  userData: {
    email: '';
    password: '';
    firstName: '';
    lastName: '';
    phoneNumber: '';
    photo: '';
    location: '';
    otp: '';
  };
  setUserData: (userData: object) => void;

  otp: string;
  setOtp: (otp: string) => void;

  loading: boolean;
  setLoading: (loading: boolean) => void;

  user: string;
  setUser: (user: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  showPassword: false,
  setShowPassword: (show) => set({ showPassword: show }),

  isLocation: false,
  setIsLocation: (isLocation) => set({ isLocation }),

  email: '',
  setEmail: (email) => set({ email }),

  password: '',
  setPassword: (password) => set({ password }),

  firstName: '',
  setFirstName: (firstName) => set({ firstName }),

  lastName: '',
  setLastName: (lastName) => set({ lastName }),

  phoneNumber: '',
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),

  photo: '',
  setPhoto: (photo) => set({ photo }),

  location: '',
  setLocation: (location) => set({ location }),

  otp: '',
  setOtp: (otp) => set({ otp }),

  loading: false,
  setLoading: (loading) => set({ loading }),

  user: '',
  setUser: (user) => set({ user }),

  isLoggedIn: null,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  // user data
  userData: {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    photo: '',
    location: '',
    otp: '',
  },

  // setUserData: (userData) => set({ userData }),

  setUserData: (newData) =>
    set((state) => ({
      userData: { ...state.userData, ...newData },
    })),
}));
