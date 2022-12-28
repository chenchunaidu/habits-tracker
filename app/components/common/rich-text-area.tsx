import React from "react";
import Editor from "./lexical/lexical";

interface RichTextAreaProps {
  name: string;
}

const RichTextArea: React.FC<RichTextAreaProps> = ({ name }) => {
  return <Editor name={name} editable={true} />;
};

export default RichTextArea;
export type { RichTextAreaProps };
