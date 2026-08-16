// Define como os dados obtidos serão organizados

export interface UserData {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
}

export interface RepositoryData {
  name: string;
  description: string | null;
  visibility: string;
  html_url: string;
  language: string | null;
}
