"use client";
import { useState } from "react";
import Editor from "@monaco-editor/react";

const Monaco = ({ code, language }: { code: string; language: string }) => {
  const [height, setHeight] = useState(200);

  const handleEditorDidMount = (editor: any, monaco: any) => {
    const adjustHeight = () => {
      const contentHeight = Math.min(editor.getContentHeight(), 200);
      setHeight(contentHeight);
    };

    adjustHeight();

    editor.onDidChangeModelContent(() => {
      adjustHeight();
    });
  };

  return (
    <Editor
      language={language || "plaintext"}
      value={code}
      theme="vs-dark"
      height={`${height}px`}
      onMount={handleEditorDidMount}
      loading={
        <div className="flex items-center justify-center h-full">
          <div className="text-muted-foreground">Loading editor...</div>
        </div>
      }
      options={{
        readOnly: true,
        minimap: { enabled: false },
        fontSize: 14,
        lineNumbers: "on",
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        insertSpaces: true,
        wordWrap: "on",
        contextmenu: true,
        selectOnLineNumbers: true,
        glyphMargin: false,
        folding: true,
        lineDecorationsWidth: 10,
        lineNumbersMinChars: 3,
        renderLineHighlight: "line",
        scrollbar: {
          vertical: "visible",
          horizontal: "visible",
          useShadows: false,
          verticalHasArrows: false,
          horizontalHasArrows: false,
        },
        suggest: {
          showKeywords: true,
          showSnippets: true,
        },
        quickSuggestions: {
          other: true,
          comments: true,
          strings: true,
        },
        parameterHints: {
          enabled: true,
        },
        bracketPairColorization: {
          enabled: true,
        },
      }}
      className="rounded-md border rounded-tr-none rounded-tl-none h-auto  bg-[#1E1E1E] pt-4 overflow-auto"
    />
  );
};

export default Monaco;
