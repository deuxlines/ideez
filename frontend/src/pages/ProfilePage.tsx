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
    <div className="flex flex-1 flex-col md:flex-row gap-10 w-full max-w-[1024px]">
      <Card className="flex-[3] md:w-[650px]">
        <h1 className="font-bold text-xl self-start">Your videos:</h1>
        <div className="overflow-y-auto max-h-[80%] rounded-[35px] flex flex-col gap-4 p-4">
          {loading && <h1 className="font-bold self-start">Loading...</h1>}
          {error && <h1 className="font-bold self-start">{error}</h1>}
          {currentVideos && currentVideos.length > 0 ? (
            currentVideos
              .slice()
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .map((video) => (
                <div key={video.id} className="flex flex-col items-center">
                  <Video video_id={video.video_id} />
                  <button
                    onClick={() => handleDelete(video.id)}
                    className="text-white bg-gradient-to-r from-[#7e5bfc] to-[#9745c3] font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50 mt-2"
                  >
                    Delete
                  </button>
                </div>
              ))
          ) : (
            <h1>No videos yet.</h1>
          )}
        </div>
      </Card>

      <Card className="flex-[1] p-6 flex flex-col gap-4">
        <h1 className="font-bold text-xl self-start">Your profile</h1>

        <div className="flex w-full justify-center">
          <div className="relative w-32 h-32 mb-4">
            <img
              src={userAvatar || "/avatar.jpg"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-2 border-purple-500"
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

        <h3 className="font-bold text-xl self-start">Email: {userEmail ? userEmail : "No email :("}</h3> 
        
        <div className="flex items-center gap-2">
          {isEditing ? (
            <div className="flex flex-col gap-2 w-full">
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="border border-[#9745c3] border-b-4 rounded px-2 py-1 flex-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <div className="flex flex-row gap-2 justify-end w-full">
                <button
                  onClick={handleSaveUsername}
                  disabled={
                    !newUserName ||
                    newUserName.trim() === "" ||
                    newUserName === user?.name
                  }
                  className="text-white bg-gradient-to-r from-[#7e5bfc] to-[#9745c3] font-semibold rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setNewUserName(user?.name || "");
                  }}
                  className="text-white bg-gradient-to-r from-[#7e5bfc] to-[#9745c3] font-semibold rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-row justify-between w-full items-center">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-xl self-start">{`Username: ${user?.name}`}</h3>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-[#7e5bfc] to-[#9745c3] font-semibold p-2 rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50"
                >
                  <Pencil size={10} color="white" />
                </button>
              </div>
            </div>
          )}
        </div>

        <h3 className="font-bold text-xl self-start">
          Member Since: {memberSince ? memberSince.toLocaleDateString() : "Unknown"}
        </h3>
      </Card>
    </div>
  );
}