import { getSessionToken } from "@/actions/getSession";
import { baseUrl } from "@/server-utils";

export const getRequest = async (endpoint: string): Promise<any> => {
  try {
    const accessToken = await getSessionToken();

    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken && {
          Authorization: `Bearer ${accessToken}`,
        }),
      },
      credentials: "include",
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
//end of get Req

export const postRequest = async (
  endpoint: string,
  data?: any
): Promise<any> => {
  const accessToken = await getSessionToken();

  const res = await fetch(`${baseUrl}${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  return res;
};
//end of post
export const patchRequest = async (
  endpoint: string,
  data?: any
): Promise<any> => {
  const accessToken = await getSessionToken();
  const res = await fetch(`${baseUrl}${endpoint}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res;
};

// put re
export const putRequest = async (
  endpoint: string,
  data?: any
): Promise<any> => {
  const accessToken = await getSessionToken();
  const res = await fetch(`${baseUrl}${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
  return res;
};

export const deleteRequest = async (
  endpoint: string,
  data?: any
): Promise<any> => {
  const accessToken = await getSessionToken();
  return await fetch(`${baseUrl}${endpoint}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && {
        Authorization: `Bearer ${accessToken}`,
      }),
    },
    credentials: "include",
    body: JSON.stringify(data),
  });
};
