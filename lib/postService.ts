import { Post } from "@/model/post";
import {
  CreatePostRequest,
  GetRecommendationPostRequest,
} from "@/model/whaleRequests";

export const createPost = async (request: CreatePostRequest) => {
  console.log(
    "calling " + `${process.env.EXPO_PUBLIC__BACKEND_HOST}/api/post/create`
  );
  const response = await fetch(
    `${process.env.EXPO_PUBLIC__BACKEND_HOST}/api/post/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*", // Match the accept header from the curl command
        accessToken: request.accessToken,
      },
      body: JSON.stringify({ postContent: request.content }), // Ensure the body matches the expected JSON structure
    }
  );

  if (!response.ok) {
    // If the response status is not OK, throw an error
    const errorText = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, details: ${errorText}`
    );
  }

  const data = await response.json();
  return data;
};

export const getRecommendationPostsForUser = async (
  request: GetRecommendationPostRequest
): Promise<string[]> => {
  console.log(
    "calling " +
      `${process.env.EXPO_PUBLIC__BACKEND_HOST}/api/recommendation/get`
  );
  const response = await fetch(
    `${process.env.EXPO_PUBLIC__BACKEND_HOST}/api/recommendation/get`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*", // Match the accept header from the curl command
        accessToken: request.accessToken,
      },
    }
  );

  if (!response.ok) {
    // If the response status is not OK, throw an error
    const errorText = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, details: ${errorText}`
    );
  }

  const data = await response.json();
  if (
    data &&
    data.recommendedPostIds &&
    Array.isArray(data.recommendedPostIds.recommendations)
  ) {
    return data.recommendedPostIds.recommendations as string[];
  } else {
    throw new Error("Unexpected response structure");
  }
};
