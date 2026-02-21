import {Controller} from "@hotwired/stimulus";
import {Editor} from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

export default class extends Controller {
    connect() {
        this.editor = new Editor({
            element: this.element,
            extensions: [
                StarterKit,
            ],
            content: '<p>Hello World!</p>',
        });
    }
}
