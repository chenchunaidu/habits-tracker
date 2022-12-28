import React from "react";

const Editor = React.lazy(() => import("./editor"));

interface RichTextAreaProps {
  name: string;
}

const RichTextArea: React.FC<RichTextAreaProps> = ({ name }) => {
  return <Editor name={name} editable={true} />;
};

export default RichTextArea;
export type { RichTextAreaProps };
