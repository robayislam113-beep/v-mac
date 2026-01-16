
export interface Notice {
  id: string;
  text: string;
}

export interface AboutData {
  image: string;
  text: string;
}

export interface GalleryItem {
  id: string;
  image: string;
  caption: string;
  timestamp: number;
}

export interface CommitteeMember {
  id: string;
  name: string;
  image: string;
  designation: string;
  position: number;
}

export interface Article {
  id: string;
  title: string;
  author: string;
  content: string;
  image: string;
  date: string;
  timestamp: number;
}

export type ViewState = 'HOME' | 'GALLERY_ALL' | 'COMMITTEE_ALL' | 'ADMIN';
