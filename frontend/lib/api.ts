import type { VideoCreate, VideoDelete, VideoType } from "./types";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_BASE_URL = "";


class ApiService {
  async addVideo(request: VideoCreate): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/videos`, {
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
    const res = await fetch(`${API_BASE_URL}/videos`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch video");
    const data: VideoType = await res.json();
    return data;
  }

  async fetchAllVideos(): Promise<VideoType[] | null> {
    const res = await fetch(`${API_BASE_URL}/videos/all`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Failed to fetch video");
    const data: VideoType[] = await res.json();
    return data;
  }
}

export const apiService = new ApiService();