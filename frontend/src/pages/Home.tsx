import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import Card from "../components/Card";
import Video from "../components/Video";
import { apiService } from "../../lib/api";
import type { VideoType } from "../../lib/types";


export default function Home() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  console.log(API_BASE_URL);
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
    <div className="flex flex-col md:flex-row gap-10 w-full max-w-[1024px]">
      <Card className="flex-[3]">
        <h1 className="font-bold text-lg self-start">Our Video Hub</h1>
        <p className="text-xl font-bold self-start">Find ideas here</p>
        {currentVideo && <Video video_id={currentVideo.video_id}/>}
        {error && <p>{error}</p>}
        {loading && <p>Loading...</p>}
      </Card>
      <Card className="flex-[1] items-start text-left">
        <h2 className="font-bold text-2xl self-start">For now let's just use it for the link :p</h2>
        <p className="text-xl font-bold self-start">Coming soon...</p>
        <button className="text-white w-full bg-gradient-to-r from-[#7e5bfc] to-[#9745c3] font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50">
          <Link to={"/videos/add"}>Add a Video</Link>
        </button>
      </Card>
    </div>
  );
}