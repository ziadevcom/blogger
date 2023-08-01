export type BlogData =
  | {
      id: string;
      title: string;
      description: string;
      author: string;
      slug: string;
      userId: string;
    }
  | undefined;
