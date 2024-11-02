import Snippet from "../schemas/Snippet.js";
import User from "../schemas/User.js";
export const allSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find()
  .populate("user", "username avatar name")
  .sort({ createdAt: -1 }) 

    res
      .status(200)
      .json({ message: "All snippets fetched successfully",result: snippets });
  } catch (error) {
    console.error("Error fetching snippets:", error);
    res.status(500).json({
      message: "Failed to fetch snippets",
      error: error.message,
    });
  }
};

export const saveSnippet = async (req, res) => {
  try {
    const {
      title,
      programmingLanguage,
      description,
      tags,
      resource,
      code,
      user,
    } = req.body;

    // Check if the user exists
    const existingUser = await User.findById(user);
    if (!existingUser) {
      return res.status(400).json({ message: "User not found", status: 400 });
    }

    // Create a new snippet instance
    const snippet = new Snippet({
      title,
      programmingLanguage,
      description,
      tags,
      resource,
      code,
      user,
    });

    // Save the snippet to the database
    const savedSnippet = await snippet.save();

    // Respond with the saved snippet
    res.status(201).json({
      message: "Snippet saved successfully",
      snippet: savedSnippet,
    });
  } catch (error) {
    console.error("Error saving snippet:", error);
    res.status(500).json({
      message: "Failed to save snippet",
      error: error.message,
    });
  }
};
