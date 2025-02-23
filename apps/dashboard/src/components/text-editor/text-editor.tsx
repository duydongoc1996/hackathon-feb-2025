import TextArea, { TextAreaProps, TextAreaRef } from "antd/es/input/TextArea";

const handleTabPress = (e: React.KeyboardEvent) => {
  if (e.key === "Tab") {
    e.preventDefault();
    const { selectionStart, selectionEnd } = e.target as HTMLTextAreaElement;
    const value = (e.target as HTMLTextAreaElement).value;
    const newValue =
      value.substring(0, selectionStart) +
      "    " +
      value.substring(selectionEnd);
    (e.target as HTMLTextAreaElement).value = newValue;
    (e.target as HTMLTextAreaElement).selectionStart = (
      e.target as HTMLTextAreaElement
    ).selectionEnd = selectionStart + 4;
  }
};

const TextEditor = (
  props: TextAreaProps & React.RefAttributes<TextAreaRef>
) => {
  return <TextArea {...props} rows={10} autoSize onKeyDown={handleTabPress} />;
};

export default TextEditor;
