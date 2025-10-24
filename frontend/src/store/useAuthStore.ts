import { create } from "zustand";
import type { LoginRequest, RegisterRequest, User } from "../../lib/types";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  handleGoogleCredentialResponse: (response: any) => Promise<void>;
  login: (request: LoginRequest) => Promise<void>;
  register: (request: RegisterRequest) => Promise<void>
  me: () => Promise<void>;
  logout: () => Promise<void>;
  changeName: (newName: string) => Promise<void>;
  updateAvatar: (file: File) => Promise<void>;
}

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE_URL = "";

export const useAuthStore = create<AuthState>((set) => ({
  user: null, 

  setUser: (user) => set({ user }),
  
  handleGoogleCredentialResponse: async (response: any): Promise<void> => {
    const idToken = response.credential;
    const res = await fetch(`${API_BASE_URL}/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: idToken }),
      credentials: "include",
    });
    if (!res) {
      throw new Error("Failed to authenticate with backend");
    }
    if (!res.ok) {
      throw new Error("Failed to authenticate with backend");
    }
    const data = await res.json();
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      set({ user: data.user });
      window.location.href = "/";
    } else {
      throw new Error("Failed to sign in");
    }
  },

  login: async (request: LoginRequest) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request)
    });

    if (!res.ok) throw new Error(res.statusText);

    const data = await res.json();
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
      set({ user: data.user });
    }
  },

  register: async (request: RegisterRequest) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request)
    });

    if (!res.ok) throw new Error(res.statusText);    

    const data = await res.json();
    if (data.user) {
      set({ user: data.user });
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...data.user,
          picture: "/avatar.jpg",
        })
      );
      
    }
  },

  me: async () => {
    const res = await fetch(`${API_BASE_URL}/me/`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch current user: ${await res.text()}`);
    }

    const data = await res.json();
    if (!data.user) throw new Error("No user data");

    localStorage.setItem("user", JSON.stringify(data.user));
    set({ user: data.user });
  },
  
  logout: async () => {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem('user');
    set({ user: null });
  },

  changeName: async (newName) => {
    const res = await fetch(`${API_BASE_URL}/user/change-name`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ new_name: newName }),
    });

    if (!res.ok) throw new Error(res.statusText);

    const { user } = useAuthStore.getState();
    if (user) {
      const updatedUser = { ...user, name: newName };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      useAuthStore.getState().setUser(updatedUser);
    }
  },

  updateAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE_URL}/user/upload-avatar`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    if (!res.ok) throw new Error(res.statusText);

    const data = await res.json();
    const newAvatarUrl = data.url;

    const { user } = useAuthStore.getState();
    if (user) {
      const updatedUser = { ...user, picture: newAvatarUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      useAuthStore.getState().setUser(updatedUser);
    }
  },
}));