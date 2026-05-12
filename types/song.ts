export type SongType = {
  _id: string;
  title: string;
  audioUrl: string;

  userId:
    | string
    | {
        _id: string;
        firstName: string;
        lastName?: string;
        profileImage?: string;
      };

  likes?: string[];

  comments?: {
    userId: string | { firstName: string };
    text: string;
    createdAt: string;
  }[];

  createdAt: string;

  coverImage?: string;
};