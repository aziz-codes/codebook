import { getBlockedUserIds } from "../utils/blockHelper.js";

export async function attachBlockedUsers(req, res, next) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      req.blockedUserIds = [];
      return next();
    }
    const ids = await getBlockedUserIds(userId);

    req.blockedUserIds = ids;

    next();
  } catch (error) {
    req.blockedUserIds = [];
    next();
  }
}
