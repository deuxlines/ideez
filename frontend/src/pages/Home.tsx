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
      setLoading(false);
    } catch(error: any) {
      setError(error.message || 'Failed to fetch video');
      setCurrentVideo(null);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRandomVideo();
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-10 w-full">
      <Card className="flex-[3]">
        <h1 className="font-bold text-lg self-start">Our Video Hub</h1>
        <p className="text-xl font-bold self-start">Find ideas here</p>
        {currentVideo && <Video video_id={currentVideo.video_id}/>}
        {error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
      </Card>
      <Card className="flex-[1]">
        <h1 className="font-bold text-lg self-start">What Do We Add Here?</h1>
        <p className="text-xl font-bold self-start">Coming soon...</p>
      </Card>
    </div>
  );
}