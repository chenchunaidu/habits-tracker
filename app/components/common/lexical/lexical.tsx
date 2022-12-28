import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LinkNode } from "@lexical/link";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode } from "@lexical/link";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import type { FC } from "react";
import { useState } from "react";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import type { EditorState } from "lexical";

// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

interface EditorProps {
  editable?: boolean;
  name?: string;
  initialState?: string;
}

const Editor: FC<EditorProps> = ({ editable = false, name, initialState }) => {
  const [editorState, setEditorState] = useState("");
  function onChange(state: EditorState) {
    state.read(() => {
      setEditorState(JSON.stringify(state));
    });
  }

  return (
    <LexicalComposer
      initialConfig={{
        editorState: initialState,
        editable,
        nodes: [
          HeadingNode,
          ListNode,
          ListItemNode,
          QuoteNode,
          CodeNode,
          CodeHighlightNode,
          TableNode,
          TableCellNode,
          TableRowNode,
          AutoLinkNode,
          LinkNode,
        ],
      }}
    >
      <div className={editable ? "editor-container" : ""}>
        {editable ? (
          <input type="hidden" name={name} value={editorState} />
        ) : (
          <div></div>
        )}

        <RichTextPlugin
          contentEditable={
            <ContentEditable className={editable ? "editor-input" : ""} />
          }
          placeholder={editable ? <Placeholder /> : <div></div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <AutoFocusPlugin />
        <ListPlugin />
        <OnChangePlugin onChange={onChange} />
        <LinkPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      </div>
    </LexicalComposer>
  );
};

function Placeholder() {
  return <div className="editor-placeholder">Enter some plain text...</div>;
}

export default Editor;
