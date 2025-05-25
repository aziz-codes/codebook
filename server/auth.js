import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const separator = process.env.separator || "codebook2025";

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Missing Authorization header" });
  }

  const sessionToken = authHeader.split(" ")[1]; // Get token after 'Bearer '
  const [refreshToken, accessToken] = sessionToken.split(separator);

  if (!accessToken || !refreshToken) {
    return res
      .status(403)
      .json({ message: "Forbidden: Invalid session token" });
  }

  try {
    const decodedAccessToken = jwt.verify(
      accessToken,
      process.env.NEXTAUTH_SECRET
    );
    req.user = decodedAccessToken;
    return next();
  } catch (accessError) {
    if (accessError.name === "TokenExpiredError") {
      try {
        const decodedRefreshToken = jwt.verify(
          refreshToken,
          process.env.NEXTAUTH_SECRET
        );

        // Generate new access token
        const newAccessToken = jwt.sign(
          { id: decodedRefreshToken.id },
          process.env.NEXTAUTH_SECRET,
          { expiresIn: "15m" }
        );

        // Rebuild full session token
        const newSessionToken = `${refreshToken}${separator}${newAccessToken}`;

        // Send it back in Authorization header for client to store if needed
        res.setHeader("x-new-token", `Bearer ${newSessionToken}`);

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
};

export default authMiddleware;
