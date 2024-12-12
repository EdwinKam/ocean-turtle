import User from "@/model/user";
import {
  GetBatchUserPublicDataRequest,
  WhaleBaseRequest,
} from "@/model/whaleRequests";

export async function getBatchUser(
  request: GetBatchUserPublicDataRequest
): Promise<User[]> {
  // Construct the query string with userIds
  const queryParams = request.userIds
    .map((id) => `userIds=${encodeURIComponent(id)}`)
    .join("&");
  const url = `${process.env.EXPO_PUBLIC__BACKEND_HOST}/api/user/getBatchUserPublicData?${queryParams}`;

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
  return data.userPublicDataList as User[]; // Ensure this matches the structure of your API response
}
