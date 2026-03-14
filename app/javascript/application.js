// Entry point for the build script in your package.json
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import { TableKit } from '@tiptap/extension-table'

const editor = new Editor({
    element: document.querySelector('.tiptap'),
    extensions: [
        StarterKit,
        Image,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        TableKit
    ],
    textDirection: 'auto',
    onUpdate: ({ editor }) => {
    	var content = document.querySelector('input[class=chapter-content]')
	    content.value = editor.getHTML()
    },
    content: document.querySelector('input[class=chapter-content]').value
});
document.getElementById("bold").onclick = function () {editor.chain().focus().extendMarkRange('bold').toggleBold().run()};
document.getElementById("italic").onclick = function () {editor.chain().focus().extendMarkRange('italic').toggleItalic().run()};
document.getElementById("underline").onclick = function () {editor.chain().focus().extendMarkRange('underline').toggleUnderline().run()};
document.getElementById("strikethrough").onclick = function () {editor.chain().focus().extendMarkRange('strike').toggleStrike().run()};

document.getElementById("blockquote").onclick = function () {editor.chain().focus().toggleBlockquote().run()};
document.getElementById("horizontal_rule").onclick = function () {editor.chain().focus().setHorizontalRule().run()};
document.getElementById("unordered_list").onclick = function () {editor.chain().focus().toggleBulletList().run()};
document.getElementById("ordered_list").onclick = function () {editor.chain().focus().toggleOrderedList().run()};
document.getElementById("align_left").onclick = function () {editor.chain().focus().setTextAlign('left').run()};
document.getElementById("align_center").onclick = function () {editor.chain().focus().setTextAlign('center').run()};
document.getElementById("align_right").onclick = function () {editor.chain().focus().setTextAlign('right').run()};
document.getElementById("justify").onclick = function () {editor.chain().focus().setTextAlign('justify').run()};
document.getElementById("undo").onclick = function () {editor.chain().focus().undo().run()};
document.getElementById("redo").onclick = function () {editor.chain().focus().redo().run()};
document.getElementById("left_to_right").onclick = function () {editor.chain().focus().setTextDirection('ltr').run()};
document.getElementById("right_to_left").onclick = function () {editor.chain().focus().setTextDirection('rtl').run()};
