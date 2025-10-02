import { SimpleEditor } from '../@/components/tiptap-templates/simple/simple-editor';

function Editor({ content, onUpdate }) {
  console.log('📝 Editor render - content length:', content?.length);
  console.log('📝 Editor render - content preview:', content?.substring(0, 100));
  
  return (
    <SimpleEditor
      content={content}
      onUpdate={({ editor }) => onUpdate(editor.getHTML())}
    />
  );
}

export default Editor;