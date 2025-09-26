import { useState, useEffect } from "react";

import Card from "../components/Card";
import Video from "../components/Video";
import { apiService } from "../../lib/api";
import type { VideoType } from "../../lib/api";


export default function AccountPage() {
  const [currentVideos, setCurrentVideos] = useState<VideoType[] | null>(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const storedUser = localStorage.getItem("user");
  const userData = storedUser ? JSON.parse(storedUser) : null;

  const userName = userData?.name
  const userMail = userData?.email

  const fetchAllVideos = async () => {
    setLoading(true);
    setError(null);

    try {
      const videos = await apiService.fetchAllVideos();
      setCurrentVideos(videos);
    } catch(error: any) {
      setError(error.message || 'Failed to fetch video');
      setCurrentVideos(null);
    }
  }


  useEffect(() => {
    fetchAllVideos();
  }, []);

  return (
    <div className="flex flex-row gap-7.5 h-full w-full">
      
      <Card className="relative flex flex-col gap-7.5">
        <h1 className="font-bold mb-2 self-start">Your videos:</h1>
        
        <div className="overflow-y-auto max-h-[100%] rounded-[15px]">
          {currentVideos && currentVideos.length > 0 ? (
            currentVideos
              .slice()
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
              .map(video => (
                <Video key={video.video_id} video_id={video.video_id} />
              ))
          ) : (
            <h1 className="font-bold mb-16 self-start">No videos today ;(</h1>
          )}
        </div>
      </Card>
      
      
      <Card>
        <h1 className="font-bold mb-4 self-start">Something else here</h1>
        {userMail && <p className="font-bold self-start">Email: {userMail}</p>}
        {userName && <p className="font-bold self-start">Username: {userName}</p>}
      </Card>
    </div>
  );
}