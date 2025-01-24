"use server";

import { cookies } from "next/headers";

export async function userStatus(data: any) {
  (await cookies()).set(data);
}
