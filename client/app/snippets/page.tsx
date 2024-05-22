"use client";
// import { useRouter } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

const discussion = {
  username: "JohnDoe",
  avatar: "https://via.placeholder.com/150",
  title: "How to Learn Next.js?",
  description:
    "I am new to Next.js and would like to know the best practices for learning it.",
  tags: ["Next.js", "React", "JavaScript"],
  images: [
    "https://via.placeholder.com/600x400",
    "https://via.placeholder.com/600x400",
  ],
  comments: [
    {
      id: 1,
      username: "JaneSmith",
      avatar: "https://via.placeholder.com/150",
      content:
        "You can start with the official documentation and follow some tutorials online.",
      timestamp: "2024-05-22T10:00:00Z",
      likes: 5,
      isCorrect: false,
    },
    {
      id: 2,
      username: "BobJohnson",
      avatar: "https://via.placeholder.com/150",
      content:
        "I recommend checking out some YouTube channels for video tutorials.",
      timestamp: "2024-05-22T11:00:00Z",
      likes: 3,
      isCorrect: true,
    },
  ],
};

const Snippets = () => {
  const router = useRouter();
  const id = 4;
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(discussion.comments);

  const handleAddComment = () => {
    const newCommentObj = {
      id: comments.length + 1,
      username: "CurrentUser",
      avatar: "https://via.placeholder.com/150",
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      isCorrect: false,
    };
    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-black shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <Image
            src={discussion.avatar}
            alt="Avatar"
            width={50}
            height={50}
            className="rounded-full"
          />
          <div>
            <h1 className="text-xl font-bold">{discussion.username}</h1>
          </div>
        </div>
        <h2 className="text-2xl font-bold mt-4">{discussion.title}</h2>
        <p className="mt-2 text-gray-600">{discussion.description}</p>
        <div className="mt-4 flex space-x-2">
          {discussion.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-200 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {discussion.images.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt="Discussion Image"
              width={600}
              height={400}
              className="rounded-lg"
            />
          ))}
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Comments</h3>
          <div className="mt-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="Add a comment"
            />
            <button
              onClick={handleAddComment}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
            >
              Add Comment
            </button>
          </div>
          <div className="mt-4 space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Image
                    src={comment.avatar}
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{comment.username}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(comment.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <p className="mt-2">{comment.content}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <button className="text-blue-500">
                    Like ({comment.likes})
                  </button>
                  {comment.isCorrect && (
                    <span className="px-2 py-1 bg-green-200 text-green-800 rounded-full text-xs">
                      Correct
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Snippets;
