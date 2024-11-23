"use client";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";

const Test = () => {
  const [open, setOpen] = useState(false);
  const [emojis, setEmojis] = useState<string[]>([]); // Array to hold selected emojis

  const handleEmojiSelect = (item: any) => {
    setEmojis((prev) => [...prev, item.native]); // Append the selected emoji
  };

  return (
    <div>
      <button onClick={() => setOpen((prev) => !prev)}>
        {open ? "Close" : "Open"}
      </button>
      <div style={{ marginTop: "10px", fontSize: "24px" }}>
        {/* Display selected emojis */}
        {emojis.map((emoji, index) => (
          <span key={index} style={{ marginRight: "5px" }}>
            {emoji}
          </span>
        ))}
      </div>
      {open && (
        <Picker
          data={data}
          onEmojiSelect={handleEmojiSelect}
          previewPosition="none"
          onClickOutside={() => setOpen(false)}
          theme="dark"
        />
      )}
    </div>
  );
};

export default Test;
