const API_BASE_URL = 'http://127.0.0.1:8000';

export type VideoType = {
  id: string;          
  video_id: string;    
  user_id: string;     
  created_at: string;  
};

export type VideoCreate = {
  video_id: string;
};

export interface User {
  email: string;
  name: string;
  picture: string;
}

class ApiService {
  async handleGoogleCredentialResponse(response: any): Promise<void> {
    try {
      const idToken = response.credential;
      const res = await fetch(`${API_BASE_URL}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken }),
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to authenticate with backend");
      }
      const data = await res.json();
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/";
      } else {
        throw new Error("Failed to sign in");
      }
    } catch (error) {
      console.error("Google login error:", error);
    }
  }

  isAuthenticated(): boolean {
    const user = localStorage.getItem("user");
    return !!user;
}

  async logout(): Promise<void> {
    await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem('user');
  }

  async fetchRandomVideo(): Promise<VideoType | null> {
    const res = await fetch(`${API_BASE_URL}/videos/`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch video");
    const data: VideoType = await res.json();
    return data;
  }

  async fetchAllVideos(): Promise<VideoType[] | null> {
    const res = await fetch(`${API_BASE_URL}/videos/all/`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch video");
    const data: VideoType[] = await res.json();
    return data;
  }

  async me(): Promise<User> {
    const res = await fetch(`${API_BASE_URL}/me/`,{
      method: "GET",
      credentials: "include",
    })
  
    if (!res.ok) {
      throw new Error(`Failed to fetch current user: ${ await res.text() }`);
    }

    const data = await res.json();
    if (!data.user) {
      throw new Error("No user data");
    }
    localStorage.setItem("user", JSON.stringify(data.user));

    return data.user;
  }

  async changeName() {
    try {
      const user = await this.me();
      // do something with the user, e.g., update UI
    } catch (err) {
      console.error(err);
    }
  }
}

export const apiService = new ApiService();