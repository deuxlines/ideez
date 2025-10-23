import { useState } from 'react';
import toast from 'react-hot-toast';

import Card from "../components/Card";
import { apiService } from '../../lib/api';
import type { VideoCreate } from '../../lib/types';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AddVideo() {
    const [link, setLink] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        const video: VideoCreate = { video_id: link };

        try {
            await apiService.addVideo(video);
            setSuccess(true);
        } catch (err: any) {
            console.log(err);
            if (err.message === "Conflict") {
                toast.error("Video has already been added.")
            } else if (err.message === "Unprocessable Content") {
                toast.error("Try another link");
            } else toast.error("Failed to add video. Try again.");
            setSuccess(false);
        } finally {
            setLoading(false);
            setLink("");
        }
    };

    return (
            <Card className="justify-between bg-transparent p-2 rounded-2xl shadow-xl w-[400px] text-center">
                <Link
                    to="/"
                    className="text-[#7e5bfc] hover:opacity-80"
                >
                    <ArrowLeft size={30} color="#7e5bfc"/>
                </Link>
                <h1 className="text-xl font-semibold mb-4">
                    Add a New Video
                </h1>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center gap-4"
                >
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="Enter video link"
                        className="
                            w-full px-4 py-2 rounded-lg
                            border border-[#1b1b3a]/30 dark:border-[#1b1b3a]/20
                            bg-[#DEFEF7]
                            text-black
                            placeholder:text-gray-500
                            focus:border-[#7b5cf0] focus:ring-2 focus:ring-[#7b5cf0]/30
                            outline-none transition
                        "
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-[#7e5bfc] to-[#9745c3] font-semibold py-2 rounded-lg shadow-md hover:opacity-90 transition disabled:opacity-50"
                    >
                        {loading ? "Adding..." : "Add Video"}
                    </button>
                </form>
                

                {success ? (
                    <p className="text-green-600 font-medium">✅ Video added!</p>
                ) : (
                    <p className='text-green-600 font-medium'></p>
                )}
            </Card>
    )
}