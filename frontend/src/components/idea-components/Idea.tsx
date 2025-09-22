import Card from "@/components/Card";

type IdeaProps = {
  id: number;
  title: string;
  description?: string;
  source: "Youtube" | "Book";
  url?: string; 
};

function YouTubeIdea(videoUrl: string) {
  const getVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getVideoId(videoUrl);
  return 
}

export default function Idea({ title, description, url }: IdeaProps) {
  const getVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  var videoId;

  if (url) {
    videoId = getVideoId(url);
  }

  return (
    <Card>
      <h2 className="text-xl font-semibold mb-2 text-black">{title}</h2>
      <p className="text-gray-700">{description}</p>
      <div className="w-[75%] mx-auto">
        <div className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </Card>
  );
}