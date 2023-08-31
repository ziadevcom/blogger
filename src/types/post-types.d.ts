export interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  status: "public" | "draft" | "trash";
  featured_image: string;
  blogSlug: string;
  createdAt: string;
  updatedAt: string;
}
