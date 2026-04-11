// Entry point for the build script in your package.json
import Quill from 'quill';
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
const BlockEmbed = Quill.import("blots/block/embed");


const Parchment = Quill.import('parchment');

class CustomAlignAttributor extends Parchment.Attributor {
    constructor(attrName, keyName, whitelist) {
        super(attrName, keyName, { whitelist });
    }

    add(node, value) {
        if (!(node instanceof HTMLElement)) {
            return false;
        }

        // Clear any existing alignment classes
        this.remove(node);

        if (value === 'center') {
            node.setAttribute("align", "center");
        } else if (value === 'right') {
            node.setAttribute("align", "right");
        } else if (value === 'justify') {
            node.setAttribute("align", "justify");
        } else {
            this.remove(node);
        }

        return true;
    }

    remove(node) {
        if (!(node instanceof HTMLElement)) {
            return;
        }
        node.removeAttribute("align");
    }

    value(node) {
        if (!(node instanceof HTMLElement)) {
            return false;
        }
        if (node.getAttribute("align") === "center") {
            return 'center';
        } else if (node.getAttribute("align") === "right") {
            return 'right';
        } else if (node.getAttribute("align") === "justify") {
            return 'justify';
        }

        // Return false if no specific alignment class is found (Quill expects false or a value)
        return false;
    }
}

Quill.register(
    'formats/align',
    new CustomAlignAttributor('align', 'ql-align', ['center', 'right', 'justify']),
    true
);

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

    postProcessQuill(quill);

    quill.clipboard.dangerouslyPasteHTML(0, document.querySelector('input[class=chapter-content]').value);

    quill.on('text-change', (delta, oldDelta, source) => {
        var body = document.querySelector('input[class=chapter-content]');
        body.value = quill.root.innerHTML;
    });
}

