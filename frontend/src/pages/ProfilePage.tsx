import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { Pencil, Camera } from "lucide-react";
import toast from "react-hot-toast";
import dayjs from "dayjs";

import Card from "../components/Card";
import Video from "../components/Video";
import { apiService } from "../../lib/api";
import type { VideoType } from "../../lib/types";
import { useAuthStore } from "../store/useAuthStore";

export default function ProfilePage() {
  const { user, changeName, updateAvatar } = useAuthStore();

  const [currentVideos, setCurrentVideos] = useState<VideoType[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [newUserName, setNewUserName] = useState(user?.name || "");

  const userAvatar = user?.picture;
  const memberSince = user?.created_at ? dayjs(user.created_at).toDate() : null;
  const userEmail = user?.email;

  const fetchAllVideos = async () => {
    setLoading(true);
    setError(null);
    try {
      const videos = await apiService.fetchAllVideos();
      setCurrentVideos(videos);
    } catch (err: any) {
      setError(err.message || "Failed to fetch videos");
      setCurrentVideos(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUsername = async () => {
    if (!newUserName || newUserName.trim() === "" || newUserName === user?.name) return;

    try {
      await changeName(newUserName);
      toast.success("Username updated!");
      setIsEditing(false);
    } catch (err: any) {
      if (err.message === "Bad Request") {
        toast.error("The name is too long");
      } else {
        toast.error(err.message || "Failed to update username");
      }
    }
  };

  const handleProfilePicChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      await updateAvatar(file);
      toast.success("Profile picture updated!");
    } catch (err: any) {
      toast.error(err.message || "Failed to upload picture");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await apiService.deleteVideo({ id });
      setCurrentVideos((prev) => prev?.filter((v) => v.id !== id) ?? null);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete video");
    }
  };

  useEffect(() => {
    fetchAllVideos();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-10 w-full max-w-[1024px] mx-auto">
      <Card className="flex-1 md:flex-[3] w-full">
        <h1 className="font-bold text-xl mb-4">Your videos:</h1>
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[60vh]">
          {loading && <p className="font-bold">Loading...</p>}
          {error && <p className="font-bold text-red-500">{error}</p>}
          {currentVideos && currentVideos.length > 0 ? (
            currentVideos
              .slice()
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .map((video) => (
                <div key={video.id} className="flex flex-col items-center gap-2">
                  <Video video_id={video.video_id} />
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="text-white w-full md:w-auto bg-gradient-to-r from-[#7e5bfc] to-[#9745c3] font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              ))
          ) : (
            <p>No videos yet.</p>
          )}
        </div>
      </Card>

      <Card className="flex-1 w-full flex flex-col gap-4 p-6 md:p-8">
        <h2 className="font-bold text-xl">Your profile</h2>

        <div className="flex justify-center mb-4">
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            <img
              src={userAvatar || "/avatar.jpg"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-2 border-purple-500"
            />
            <label
              htmlFor="profilePicUpload"
              className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full cursor-pointer hover:bg-purple-500"
            >
              <Camera size={20} color="white" />
            </label>
            <input
              type="file"
              id="profilePicUpload"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePicChange}
            />
          </div>
        </div>

        <p className="font-semibold text-sm md:text-base break-words">
          Email: {userEmail || "No email :("}
        </p>

        <div className="flex flex-col gap-2 w-full">
          {isEditing ? (
            <>
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="border border-purple-400 rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleSaveUsername}
                  disabled={!newUserName || newUserName.trim() === "" || newUserName === user?.name}
                  className="text-white bg-gradient-to-r from-[#7e5bfc] to-[#9745c3] font-semibold rounded-lg shadow-md py-1 px-4 hover:opacity-90 transition disabled:opacity-50"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setNewUserName(user?.name || "");
                  }}
                  className="text-white bg-gradient-to-r from-[#7e5bfc] to-[#9745c3] font-semibold rounded-lg shadow-md py-1 px-4 hover:opacity-90 transition disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between">
              <p className="font-bold text-lg break-words">Username: {user?.name}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-[#7e5bfc] to-[#9745c3] font-semibold p-2 rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50"
              >
                <Pencil size={14} color="white" />
              </button>
            </div>
          )}
        </div>

        <p className="font-semibold text-sm md:text-base">
          Member Since: {memberSince ? memberSince.toLocaleDateString() : "Unknown"}
        </p>
      </Card>
    </div>
  );
}