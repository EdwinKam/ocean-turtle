import { Post } from "./post";
import User from "./user";

export interface PostComment {
  commenter: User;
  post: Post;
  content: string;
  childComments?: PostComment[];
  parentComment?: PostComment;
}
