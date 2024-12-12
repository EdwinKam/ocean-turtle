import { Post } from "@/model/post";
import {
  CreatePostRequest,
  GetBatchPostRequest,
  GetRecommendationPostRequest,
} from "@/model/whaleRequests";
import { getBatchUser } from "./userService";
import User from "@/model/user";

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

export async function getRecommendationPostIdsForUser(
  request: GetRecommendationPostRequest
): Promise<string[]> {
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
}

export async function getBatchPost(request: GetBatchPostRequest) {
  const queryParams = request.postIds
    .map((id) => `postIds=${encodeURIComponent(id)}`)
    .join("&");
  const url = `${process.env.EXPO_PUBLIC__BACKEND_HOST}/api/post/getBatchPost?${queryParams}`;

  console.log("calling " + url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*", // Match the accept header from the curl command
      accessToken: request.accessToken,
    },
  });

  if (!response.ok) {
    // If the response status is not OK, throw an error
    const errorText = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, details: ${errorText}`
    );
  }

  const data = await response.json();
  const authorIds: string[] = Array.from(
    new Set(data.posts.map((post) => post.authorId))
  ); // get deduped authorId

  const users: User[] = await getBatchUser({
    accessToken: request.accessToken,
    userIds: authorIds,
  });

  const userIdMap = users.reduce((map, user) => {
    map[user.uid] = user;
    return map;
  }, {} as Record<string, User>);

  const posts: Post[] = data.posts.map((post) => ({
    author: userIdMap[post.authorId],
    content: post.content,
  }));

  return posts;
}

export async function getOwnPosts(accessToken: string): Promise<Post[]> {
  const url = `${process.env.EXPO_PUBLIC__BACKEND_HOST}/api/post/getOwnPosts`;

  console.log("calling " + url);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*", // Match the accept header from the curl command
      accessToken: accessToken,
    },
  });

  if (!response.ok) {
    // If the response status is not OK, throw an error
    const errorText = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, details: ${errorText}`
    );
  }

  const data = await response.json();
  const authorIds: string[] = Array.from(
    new Set(data.posts.map((post) => post.authorId))
  ); // get deduped authorId

  const users: User[] = await getBatchUser({
    accessToken: accessToken,
    userIds: authorIds,
  });

  const userIdMap = users.reduce((map, user) => {
    map[user.uid] = user;
    return map;
  }, {} as Record<string, User>);

  const posts: Post[] = data.posts.map((post) => ({
    author: userIdMap[post.authorId],
    content: post.content,
  }));

  return posts;
}
