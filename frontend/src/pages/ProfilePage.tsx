import { useState, useEffect } from "react";

import Card from "../components/Card";
import Video from "../components/Video";
import { apiService } from "../../lib/api";
import type { VideoType } from "../../lib/api";


export default function ProfilePage() {
  const [currentVideos, setCurrentVideos] = useState<VideoType[] | null>(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const storedUser = localStorage.getItem("user");
  const userData = storedUser ? JSON.parse(storedUser) : null;

  const userName = userData?.name
  const userMail = userData?.email

  const handleDelete = async (id: string) => {
    try {
      await apiService.deleteVideo({ id: id });
      setCurrentVideos(prev => prev?.filter(v => v.id !== id) ?? null);
    } catch (err: any) {
      setError(err.message || "Failed to delete video");
    }
  };

  const fetchAllVideos = async () => {
    setLoading(true);
    setError(null);

    try {
      const videos = await apiService.fetchAllVideos();
      setCurrentVideos(videos);
      setLoading(false);
    } catch(error: any) {
      setError(error.message || 'Failed to fetch video');
      setCurrentVideos(null);
      setLoading(false);
    }
  }


  useEffect(() => {
    fetchAllVideos();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-10 w-full">
      <Card className="flex-[3]">
        <h1 className="font-bold text-xl self-start">Your videos:</h1>       
        <div className="overflow-y-auto max-h-[80%] rounded-[35px] flex flex-col gap-4 p-4">
          {loading && <h1 className="font-bold self-start">Loading...</h1>}
          {error && <h1 className="font-bold self-start">{error}</h1>}
          {currentVideos && currentVideos.length > 0 ? (
            currentVideos
              .slice()
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .map(video => (
              <div className="flex flex-col">
                <div key={video.video_id} className="flex flex-col items-center">
                  <Video video_id={video.video_id} />
                  <button 
                    onClick={() => handleDelete(video.id)}
                    className="bg-gradient-to-r from-[#7e5bfc] to-[#9745c3] font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
              ))
          ) : (
            <h1>No videos yet.</h1>
          )}
        </div>
      </Card>
      <Card className="flex-[2]">
        <h1 className="font-bold text-xl self-start">Something else here</h1>
        {userMail && <p className="font-bold self-start">Email: {userMail}</p>}
        {userName && <p className="font-bold self-start">Username: {userName}</p>}
      </Card>
    </div>
  );
}