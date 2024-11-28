export interface WhaleBaseRequest {
  accessToken: string;
}

export interface CreatePostRequest extends WhaleBaseRequest {
  content: string;
}
