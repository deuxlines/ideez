# iDeez

iDeez is a web app built by me (my first full project) — a simple place where people can share their favorite YouTube videos that truly *inspire* them. Whether it's a song, a speech, or a clip that changed your perspective — you can share it, browse others’ ideez, and feel connected.

Live demo: https://ideez-qm13.onrender.com

---

## Table of Contents

1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [How It Works](#how-it-works)  
4. [Why I Use What I Use](#why-i-use-what-i-use)  
5. [Getting Started](#getting-started)  
6. [Running Locally](#running-locally)  
7. [Contributing](#contributing)  
8. [Future Ideas](#future-ideas)  
9. [License](#license)

---

## Features

- Create, view, and share YouTube video links  
- Responsive UI (mobile + desktop)  
- Simple user authentication  

---

## Tech Stack

- **Frontend**: TypeScript, React  
- **Backend**: Python (FastAPI)
- **Database**: Postgres
- **Cloudinary**: for storing and serving images/videos  
- **Hosting**: Render.com (free version :D)

---

## How It Works

1. A user visits the app and signs in
2. They can submit a YouTube video URL, which will become part of the main videos hub where people can see it.
3. The backend saves the video link.  
4. The frontend displays the list of all shared ideez
5. Users can browse, click, and be inspired by other people’s favorite videos

---

## Why I Use What I Use

- **Cloudinary**: I use Cloudinary to handle media (profile images).
- **Render**: For deployment — makes it easy to host both frontend and backend without managing my own servers.  
- **Python backend**: I’m comfortable writing server logic in Python, and it’s great for quick development (I wanna move to GO).  
- **TypeScript frontend**: Gives type safety in the UI, making it more robust and maintainable (I hate JS and most of it was written with ChatGPT just so I could see how it all interacts with the back end).

---

## Getting Started

**Prerequisites**

- Node.js / npm (for frontend)  
- Python 3.x (for backend)  
- Access to a Cloudinary account (for media uploads)  
- (Optional) .env / environment variables setup for Cloudinary credentials, database URL, etc.

---

## Running Locally

1. Clone the repo:  
```bash
git clone https://github.com/deuxlines/ideez.git
cd ideez
```  
Set up environment variables:
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
(plus any DB or secret keys)

Backend:
```bash
cd backend
poetry install
poetry env activate
poetry alembic upgrade head
ENVIRONMENT=development uvicorn main:app --reload
```

Fontend:
```bash
cd frontend  
npm install
npm run dev
```

### Future Ideas
- Add commenting and likes for each idea
- Let people tag or categorize ideas (e.g. “music,” “talks,” “art”)
- Authentication (Google / GitHub login)
- Search functionality for ideez
- Notifications (e.g., for new videos in your category)
- A public profile page for each user
