from uuid import UUID

from fastapi import HTTPException, status
from sqlalchemy import func
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.domain import Video
from app.schemas import VideoCreate

def create_video(db: Session, video_data: VideoCreate, user_id: UUID) -> Video:
    video = Video(video_id=video_data.video_id, user_id=user_id)
    db.add(video)
    try:
        db.commit()
        db.refresh(video)
        return video
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Video already exists"
        )

def get_random_video(db: Session) -> Video | None:
    video: Video | None = db.query(Video).order_by(func.random()).first()
    return video

def get_all_videos(db: Session, user_id: UUID) -> list[Video]:
    return db.query(Video).filter(Video.user_id == user_id).all()