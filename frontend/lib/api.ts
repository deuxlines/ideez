const API_BASE_URL = 'http://127.0.0.1:8000';

export type VideoType = {
  id: string;          
  video_id: string;    
  user_id: string;     
  created_at: string;  
}

export type VideoCreate = {
  video_id: string;
}

export type VideoDelete = {
  id: string;
}

export interface User {
  email: string;
  name: string;
  picture: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

class ApiService {
  async handleGoogleCredentialResponse(response: any): Promise<void> {
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
      console.log(localStorage.getItem('user'));
      window.location.href = "/";
    } else {
      throw new Error("Failed to sign in");
    }
  }

  async login(request: LoginRequest): Promise<void> {
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
      window.location.href = "/";
    } else {
      throw new Error("Failed to sign in");
    }
  }

  async register(request: RegisterRequest): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request)
    });

    const data = await res.json();
    if (data.user) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...data.user,
          picture: "/avatar.jpg",
        })
      );
      window.location.href = "/";
    } else {
      throw new Error("Failed to register");
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
    window.location.href = "/";
  }

  async addVideo(request: VideoCreate): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/videos/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request)
    });

    if (!res.ok) throw new Error(res.statusText);
  }

  async deleteVideo(request: VideoDelete): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/videos/${request.id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to delete video: " + await res.text());
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