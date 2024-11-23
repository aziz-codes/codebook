"use client";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";

const Test = () => {
  const [open, setOpen] = useState(false);
  const [emojis, setEmojis] = useState<string[]>([]);

  const handleEmojiSelect = (item: any) => {
    setEmojis((prev) => [...prev, item.native]);
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
        <div style={{ position: "relative" }}>
          {/* Custom close button */}
          <button
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "transparent",
              border: "none",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            ✖
          </button>

          <Picker
          navPosition="none"
            data={data}
            onEmojiSelect={handleEmojiSelect}
            previewPosition="none"
            onClickOutside={() => setOpen(false)}
             className="border"
            emojiSize={12}  
            emojiButtonSize={20}  
          />
        </div>
      )}
    </div>
  );
};

export default Test;
