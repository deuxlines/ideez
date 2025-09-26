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

class ApiService {
  private getAuthHeaders() {
    const token = localStorage.getItem('access_token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  async handleGoogleCredentialResponse(response: any): Promise<void> {
    try {
        const idToken = response.credential;
        const res = await fetch(`${API_BASE_URL}/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: idToken }),
        });

        if (!res.ok) {
            throw new Error("Failed to authenticate with backend");
        }
        const data = await res.json();
        if (data.access_token) {
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "/";
        } else {
            throw new Error("No access token returned from backend");
        }
    } catch (error) {
        console.error("Google login error:", error);
    }
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem("access_token");
    if (!token) return false;

    const payload = JSON.parse(atob(token.split(".")[1]));
    const now = Math.floor(Date.now() / 1000);

    return payload.exp > now;
}

  logout(): void {
    if (localStorage.getItem('access_token')) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
  }

  async fetchRandomVideo(): Promise<VideoType | null> {
    const token = localStorage.getItem("access_token");
    if (!token) return null;

    const res = await fetch("http://127.0.0.1:8000/videos/", {
      headers: this.getAuthHeaders(),
    });

    if (!res.ok) throw new Error("Failed to fetch video");
    const data: VideoType = await res.json();
    return data;
  }

  async fetchAllVideos(): Promise<VideoType[] | null> {
    const token = localStorage.getItem("access_token");
    if (!token) return null;

    const res = await fetch("http://127.0.0.1:8000/videos/all/", {
      headers: this.getAuthHeaders(),
    });

    if (!res.ok) throw new Error("Failed to fetch video");
    const data: VideoType[] = await res.json();
    return data;
  }
}

export const apiService = new ApiService();