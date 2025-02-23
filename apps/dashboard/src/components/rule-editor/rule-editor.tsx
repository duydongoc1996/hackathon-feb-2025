import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-coy.css"; //Example style, you can use another
import Editor from "react-simple-code-editor";

const RuleEditor = ({
  code,
  setCode,
}: {
  code: string;
  setCode: (code: string) => void;
}) => {
  return (
    <Editor
      value={code}
      onValueChange={(code) => setCode(code)}
      highlight={(code) => highlight(code, languages.js, "js")}
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
        border: "1px solid #d9d9d9",
        borderRadius: 4,
        minHeight: 100,
      }}
    />
  );
};

export default RuleEditor;
