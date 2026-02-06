import React from "react";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";

const mdParser = new MarkdownIt();

const MarkdownEditor: React.FC<any> = ({
  longDescription,
  setLongDescription,
}: any) => {
  return (
    <div className=" h-96">
      <MdEditor
        value={longDescription}
        style={{ height: "100%", backgroundColor: "#F4F5FA" }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={({ text }) => setLongDescription(text)}
        plugins={["font-bold", "header", "list-unordered", "mode-toggle"]}
        config={{
          view: {
            menu: true,
            md: true,
            html: true,
          },
        }}
      />
    </div>
  );
};

export default MarkdownEditor;
