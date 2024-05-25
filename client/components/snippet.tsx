import React from "react";
import CodeHighlighter from "./syntax-highlighter";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";
import User from "./user";
import { Ellipsis } from "lucide-react";
const Snippet = () => {
  const language = "jsx";
  const code = ` <Card className="w-full py-2">
      <CardHeader className="p-0 px-2">
        <div className="flex justify-between ">
          <User hasBorder={false} hoverEffect={false} />
          <button className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
            <Ellipsis />
          </button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <CodeHighlighter language={language} code={code} />
      </CardContent>
    </Card>`;
  return (
    // <div className="h-auto max-h-svh  w-full overflow-hidden">
    //   {/* <CodeHighlighter language={language} code={code} /> */}

    // </div>
    <Card className="w-full overflow-hidden py-2">
      <CardHeader className="p-0 px-2">
        <div className="flex justify-between ">
          <User hasBorder={false} hoverEffect={false} date="06 March" />
          <button className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100">
            <Ellipsis />
          </button>
        </div>
      </CardHeader>
      <CardContent className="my-3 px-0">
        <CodeHighlighter language={language} code={code} />
      </CardContent>
      <CardFooter>Footer</CardFooter>
    </Card>
  );
};

export default Snippet;
