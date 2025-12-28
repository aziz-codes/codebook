import Snippet from "../schemas/Snippet.js";
import User from "../schemas/User.js";
import { validator } from "../utils/validator.js";
export const allSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find()
      .populate("user", "username avatar name")
      .sort({ createdAt: -1 });

    res.status(200).json(snippets);
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
    const user = req?.user?.id;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized." });
    }

    const {
      title,
      programmingLanguage,
      description,
      tags,
      resource,
      code,
      isPublic,
      allowForks,
      allowComments,
      complexity,
    } = req.body;

    // Fields to validate
    const fieldsToValidate = {
      title,
      programmingLanguage,
      code,
    };

    const { success, message } = validator(fieldsToValidate);

    if (!success) {
      return res.status(400).json({ message });
    }

    // Create and save the snippet
    const snippet = new Snippet({
      title,
      programmingLanguage,
      description,
      tags,
      resource,
      code,
      user,
      allowForks,
      isPublic,
      allowComments,
      complexity,
    });

    await snippet.save();

    return res.status(201).json({
      message: "Snippet saved successfully.",
    });
  } catch (error) {
    console.error("Error saving snippet:", error);
    return res.status(500).json({
      message: "An unexpected error occurred while saving the snippet.",
    });
  }
};
