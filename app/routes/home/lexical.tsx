import React from "react";
import MyCustomAutoFocusPlugin from "~/components/common/lexical/lexical";

export default function LexicalPage() {
  return (
    <div className="w-screen">
      <MyCustomAutoFocusPlugin editable={true} />
    </div>
  );
}
