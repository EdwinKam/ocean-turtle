export interface WhaleBaseRequest {
  accessToken: string;
}

export interface CreatePostRequest extends WhaleBaseRequest {
  content: string;
}

export interface GetRecommendationPostRequest extends WhaleBaseRequest {
  // only need accessToken
}

export interface GetBatchPostRequest extends WhaleBaseRequest {
  postIds: string[];
}
