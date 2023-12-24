export type Idea = {
  id: number;
  slug: string;
  title: string;
  content: string;
  published_at: string;
  deleted_at: string;
  created_at: string;
  updated_at: string;
  small_image: [{
    url: string;
  }];
  medium_image: [{
    url: string;
  }];
};
