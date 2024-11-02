"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";
 
 
const Monaco = ({ code, language }: { code: string; language: string }) => {
 
  const [height, setHeight] = useState(300);
 

  const handleEditorDidMount = (editor: any, monaco: any) => {
    const adjustHeight = () => {
      const contentHeight = Math.min(editor.getContentHeight(), 350);
      setHeight(contentHeight);
    };

    adjustHeight();

    editor.onDidChangeModelContent(() => {
      adjustHeight();
    });
  };
  
  return (
 
      <Editor
      language={language}
      value={code}
      theme="vs-dark"
      height={`${height}px`}  
      options={{
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        readOnly: true,
       
      }}
      onMount={handleEditorDidMount}
    />

  );
};

export default Monaco;
