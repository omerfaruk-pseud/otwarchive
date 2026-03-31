// Entry point for the build script in your package.json
import Quill from 'quill';
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
const BlockEmbed = Quill.import("blots/block/embed");

// register Quill divider Blot:

class DividerBlot extends BlockEmbed {
    static blotName = "divider";
    static tagName = "hr";
}
Quill.register(DividerBlot);

// post-process function for Quill instances:

const postProcessQuill = (quill) => {
    const toolbar = quill.getModule("toolbar");
    const divider = toolbar.container?.querySelector(".ql-divider");

    if (divider) {
        divider.innerHTML = `
      <svg viewBox="0 0 18 18">
        <line class="ql-stroke" x1="1.795" y1="9" x2="16.205" y2="9"/>
        <polyline class="ql-stroke" points="13.494,4.706 13.494,6.239 4.506,6.239 4.506,4.706 "/>
        <polyline class="ql-stroke" points="13.494,13.295 13.494,11.76 4.506,11.76 4.506,13.295 "/>
      </svg>
    `;
    }

    toolbar.addHandler("divider", () => {
        const range = quill.getSelection(true);
        const prev = quill.getText({ index: range.index - 1, length: 1 });
        const next = quill.getText({ index: range.index, length: 1 });

        if (prev !== "\n" && prev !== "") {
            quill.insertText(range.index++, "\n", "user");
        }
        quill.insertEmbed(range.index++, "divider", true, "user");
        if (next === "\n") {
            quill.deleteText(range.index, 1, "user");
        }

        quill.setSelection(range.index, 0, "user");
    });
};
if (!this.quill) {

    const quill = new Quill('#editor', {
        modules: {
            toolbar: [
                [{'header': [1, 2, 3, 4, 5, 6, false]}],
                [
                    'bold', 'italic', 'underline', 'strike', 'link'
                ],
                ['image', 'blockquote', 'divider'],
                [{'list': 'bullet'}, {'list': 'ordered'}],
                [{'align': ['center', 'right', 'justify', false]}],
                ['undo', 'redo'],
                [{'direction': 'rtl'}],
            ],
            history: []
        },
        formats: ['header', 'bold', 'italic', 'underline', 'strike', 'link', 'image', 'blockquote', 'divider', 'list', 'align', 'direction'],
        theme: 'snow'
    });
}

postProcessQuill(quill);

quill.setText(document.querySelector('input[class=chapter-content]').value);

quill.on('text-change', (delta, oldDelta, source) => {
    var body = document.querySelector('input[class=chapter-content]');
    body.value = quill.getSemanticHTML(0);
});
