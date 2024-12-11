import User from "./user";

// Define the Post interface
export interface Post {
  subject: string;
  content: string;
  author: User;
}
