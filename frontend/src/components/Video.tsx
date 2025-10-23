interface VideoProps {
  video_id: string;
  created_at?: string;
};

export default function Video({ video_id }: VideoProps) {
  return (   
    <div className="aspect-video w-full max-w-3xl mx-auto mb-6">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${video_id}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="rounded-lg"
      />
    </div>
  );
};