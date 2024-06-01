import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CodeProps {
  language: string;
  code: string;
}

const CodeHighlighter = ({ language, code }: CodeProps) => {
  return (
    <SyntaxHighlighter
      customStyle={{
        padding: "10px 5px",
        backgroundColor: "#0D0E12",
        height: "350px",
        maxHeight: "350px",
        msOverflowY: "auto",
        borderRadius: "0px",
        width: "100%",
        overflow: "hidden",
        overflowY: "auto",
      }}
      language={language}
      style={dracula}
      lineNumberStyle={dracula}
      wrapLongLines={true}
      showLineNumbers={true}
      wrapLines={false}
    >
      {code}
    </SyntaxHighlighter>
  );
};

export default CodeHighlighter;
