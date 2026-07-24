// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "lexxy"

import "trix"
import "@rails/actiontext"


// import { defineExtension, COMMAND_PRIORITY_HIGH, FORMAT_TEXT_COMMAND } from "lexical"
import * as Lexxy from "lexxy"

Lexxy.configure({
    /*
    global: {
        extensions: [ NoBoldExtension ]
    },
    */
    default: {
        highlight: {
            buttons: {
                color: [],
                "background-color": []
            }, // this might not be necessary if we remove the button altogether
            permit: {
                color: [],
                "background-color": []
            }
        },
        headings: [ "h1", "h2", "h3", "h4" ], // this might not be necessary too
    }
})

const editor = document.querySelector("lexxy-editor")
editor.addEventListener("lexxy:focus", (event) =>
    {
        if(editor.querySelector("button[name='file']")) {
            editor.querySelectorAll("lexxy-toolbar-dropdown:not(.lexxy-editor__toolbar-overflow), button[name=\"highlight\"], button[name=\"file\"], button[name=\"table\"], button[name=\"code\"]").forEach((elem) => elem.parentNode.removeChild(elem));
        }
    }
);
// No Bold Extension

/* class NoBoldExtension extends Lexxy.Extension {
    get enabled() {
        return this.editorElement.supportsRichText
    }

    get lexicalExtension() {
        return defineExtension({
            name: "lexxy/no_bold",
            register(editor, _config) {
                return editor.registerCommand(FORMAT_TEXT_COMMAND, (payload) => {
                    return payload === "bold"
                }, COMMAND_PRIORITY_HIGH)
            }
        })
    }

    initializeToolbar(lexxyToolbar) {
        lexxyToolbar.querySelector("button[name=bold]")?.remove()
    }
}

*/