import { useState, useEffect } from "react";

import Card from "../components/Card";
import Video from "../components/Video";
import { apiService } from "../../lib/api";
import type { VideoType } from "../../lib/api";


export default function Home() {
  const [currentVideo, setCurrentVideo] = useState<VideoType | null>(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRandomVideo = async () => {
    setLoading(true);
    setError(null);

    try {
      const video = await apiService.fetchRandomVideo();
      setCurrentVideo(video);
    } catch(error: any) {
      setError(error.message || 'Failed to fetch video');
      setCurrentVideo(null);
    }
  }

  useEffect(() => {
    fetchRandomVideo();
  }, []);

  return (
    <div className="flex flex-row gap-7.5 h-full w-full">
      <Card>
        <h1 className="font-bold mb-4 self-start">Our Video Hub</h1>
        <p className="text-2xl font-bold mb-4 self-start">Find ideas here</p>
        {currentVideo ? <Video video_id={currentVideo.video_id}/> : <h1 className="font-bold mb-16 self-start">No videos today ;(</h1>}
        {error && <p>{error}</p>}
      </Card>
      <Card>
        <h1 className="font-bold mb-4 self-start">Our Video Hub</h1>
        
      </Card>
    </div>
  );
}