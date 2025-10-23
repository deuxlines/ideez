export type VideoType = {
  id: string;          
  video_id: string;    
  user_id: string;     
  created_at: string;  
}

export type VideoCreate = {
  video_id: string;
}

export type VideoDelete = {
  id: string;
}

export interface User {
  email: string;
  name: string;
  picture: string;
  memberSince: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}