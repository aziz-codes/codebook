import { Copy } from "lucide-react";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeProps {
  language: string;
  code: string;
}

const CodeHighlighter = ({ language, code }: CodeProps) => {
  return (
    <div className="flex flex-col w-full rounded-none  ">
      <div className="h-10 w-full bg-[#2f2f2f] rounded-tl-md rounded-none rounded-tr-md flex items-center justify-between px-2">
        <p className="text-xs">Jsx</p>
        <div className="flex items-center px-2 py-1.5 rounded-md text-xs gap-1 text-gray-400 cursor-pointer">
        <Copy className="h-4 w-4 text-gray-400"/>
        Copy code
        </div>
      </div>
    <SyntaxHighlighter
      customStyle={{
        padding: "10px 5px",
        backgroundColor: "#0D0E12",
        height: "auto",
        maxHeight: "350px",
        msOverflowY: "auto",
        borderRadius: "0px",
        width: "100%",
        overflowX: "auto",
        overflowY: "auto",
      }}
      language={language}
      style={dracula}
      lineNumberStyle={dracula}
      wrapLongLines={true}
      showLineNumbers={true}
      wrapLines={true}
    >
      {code}
    </SyntaxHighlighter>
    </div>
  );
};

export default CodeHighlighter;

// test commit