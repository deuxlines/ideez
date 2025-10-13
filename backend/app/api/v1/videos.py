from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.schemas import VideoRead, VideoCreate
from app.domain import Video
from app.database import get_db
from app.auth import get_current_user_id
from app.crud import get_random_video, create_video, get_all_videos as all_videos

video_router: APIRouter = APIRouter(prefix="/videos", tags=["Share your favorite youtube videos"])

@video_router.get("/", response_model=VideoRead)
async def get_video(db: Session = Depends(get_db), user_id: UUID = Depends(get_current_user_id)) -> VideoRead | dict:
    video: Video | None = get_random_video(db)
    if not video:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No videos found")
    return video

@video_router.post("/", response_model=VideoRead)
async def add_video(
    video_data: VideoCreate,
    db: Session = Depends(get_db), 
    user_id: UUID = Depends(get_current_user_id)
) -> VideoRead:
    video: Video = create_video(db, video_data, user_id)
    return video
        
@video_router.get("/all", response_model=list[VideoRead])
async def get_all_videos(db: Session = Depends(get_db), user_id: UUID = Depends(get_current_user_id)) -> list[VideoRead]:
    videos: list[Video]= all_videos(db, user_id)
    return videos

@video_router.delete("/{video_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_video(
    video_id: UUID,
    db: Session = Depends(get_db),
    user_id: UUID = Depends(get_current_user_id)
) -> None:
    video: Video | None = db.query(Video).filter(Video.id == video_id, Video.user_id == user_id).first()
    if not video:
        raise HTTPException(status_code=400, detail="Video not found or no access")
    db.delete(video)
    db.commit()
    return None