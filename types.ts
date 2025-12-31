
export type View = 'home' | 'about' | 'practice' | 'blog' | 'article' | 'careers' | 'contact';

export interface NavItem {
  label: string;
  view: View;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  content: string[];
}

export interface PracticeArea {
  title: string;
  description: string;
  details: string;
}
