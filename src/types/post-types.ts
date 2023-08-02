export interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  status: "public" | "draft" | "trash";
  createdAt: string
}
