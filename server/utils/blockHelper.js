import BlockUserSchema from "../schemas/BlockSchema.js";

export async function getBlockedUserIds(userId) {
  if (!userId) return [];

  // Users blocked BY the logged-in user
  const blockedByUserDocs = await BlockUserSchema.find({
    blocker: userId,
  }).select("blocked");
  const blockedByUserIds = blockedByUserDocs.map((doc) =>
    doc.blocked.toString()
  );

  // Users who have blocked the logged-in user
  const blockedUserDocs = await BlockUserSchema.find({
    blocked: userId,
  }).select("blocker");
  const blockedUserIds = blockedUserDocs.map((doc) => doc.blocker.toString());

  // Combine both arrays and remove duplicates
  const combinedBlockedIds = Array.from(
    new Set([...blockedByUserIds, ...blockedUserIds])
  );

  return combinedBlockedIds;
}
