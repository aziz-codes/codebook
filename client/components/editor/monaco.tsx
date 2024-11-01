"use client"
import { useState } from "react";
import Editor from "@monaco-editor/react";

const Monaco = ({ code, language }: { code: string; language: string }) => {
  const [height, setHeight] = useState(150);  

  const handleEditorDidMount = (editor:any, monaco:any) => {
    const adjustHeight = () => {
      const contentHeight = Math.min(editor.getContentHeight(), 350);  
      setHeight(contentHeight);
      editor.getAction('editor.action.formatDocument').run();
    };

    adjustHeight(); // Set height based on content at mount

    // Adjust the height whenever the content changes
    editor.onDidChangeModelContent(() => {
      adjustHeight();
    });
  
  };

  return (
    <Editor
      language={language}
      value={code}
      theme="vs-dark"
      height={`${height}px`} // Dynamic height
      options={{
        minimap: { enabled: false }, // Disable the minimap if not needed
        scrollBeyondLastLine: true,
        readOnly: true,
         
      
      }}
      onMount={handleEditorDidMount}
      
      
    />
  );
};

export default Monaco;
