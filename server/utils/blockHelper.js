import BlockUserSchema from "../schemas/BlockSchema.js";

export async function getBlockedUserIds(userId) {
  if (!userId) return [];

  // Find all users blocked by the logged-in user
  const blockedUsers = await BlockUserSchema.find({ blocker: userId }).select(
    "blocked"
  );

  // Extract only the blocked user IDs as an array
  const ids = blockedUsers.map((doc) => doc.blocked.toString());

  return ids;
}
