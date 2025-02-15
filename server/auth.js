import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies || !cookies["next-auth.session-token"] || !cookies.session) {
    return res.status(401).json({ message: "Unauthorized: Missing tokens" });
  }

  try {
    // Extract session token (refresh + access token combined)
    const sessionToken = cookies.session;
    const separator = process.env.separator || "codebook2025"; // Ensure separator exists
    const [refreshToken, accessToken] = sessionToken.split(separator);

    if (!accessToken || !refreshToken) {
      return res
        .status(403)
        .json({ message: "Forbidden: Invalid session token" });
    }

    try {
      // Verify Access Token
      const decodedAccessToken = jwt.verify(
        accessToken,
        process.env.NEXTAUTH_SECRET
      );
      req.user = decodedAccessToken;
      return next();
    } catch (accessError) {
      // If access token is expired, verify refresh token
      if (accessError.name === "TokenExpiredError") {
        try {
          const decodedRefreshToken = jwt.verify(
            refreshToken,
            process.env.NEXTAUTH_SECRET
          );

          // Generate a new access token
          const newAccessToken = jwt.sign(
            { id: decodedRefreshToken.id },
            process.env.NEXTAUTH_SECRET,
            {
              expiresIn: "15m",
            }
          );

          // Update cookie with new access token
          res.cookie(
            "session",
            `${refreshToken}${separator}${newAccessToken}`,
            {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "Strict",
            }
          );

          req.user = { id: decodedRefreshToken.id };
          return next();
        } catch (refreshError) {
          return res
            .status(401)
            .json({ message: "Unauthorized: Invalid refresh token" });
        }
      }

      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid access token" });
    }
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token processing failed" });
  }
};

export default authMiddleware;
