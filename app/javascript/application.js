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

let editor = document.querySelector("lexxy-editor")
editor.addEventListener("lexxy:focus", (event) =>
    {
    let selectors = "lexxy-toolbar-dropdown:not(.lexxy-editor__toolbar-overflow), " +
        "lexxy-highlight-dropdown, " +
        "button[name=\"highlight\"], " +
        "button[name=\"file\"], " +
        "button[name=\"table\"], " +
        "button[name=\"code\"]"
        if(editor.querySelectorAll(selectors).length > 0) {
            editor.querySelectorAll(selectors).forEach((elem) => elem.parentNode.removeChild(elem)); // for IE compatibility
            let toolbar=document.querySelector("lexxy-toolbar");
            let children=toolbar.children;
            let newOrder=[7,12,11,9,10,8,6,4,3,5,2,1];
            for(let i=0;i<newOrder.length;i++) {
                for (let j = 0; j < newOrder.length; j++) {
                    if (i == newOrder[j]) {
                        // toolbar.appendChild(children[j]);
                        break;
                    }
                }
            }
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