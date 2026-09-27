// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
/*jshint esversion: 6 */

import "lexxy";

import * as Lexxy from "lexxy";

Lexxy.configure({
    default: {
        highlight: {
            permit: { // I don't know if this works either
                color: [],
                "background-color": []
            }
        },
        markdown: false
    }
});

class EditingField {
    constructor(comment_field) {
        this.comment_field = comment_field;
        this.rte = null;
        this.html_editor = comment_field.querySelector("textarea.comment_form");
        this.html_link = comment_field.querySelector(".html-link");
        this.rtf_link = comment_field.querySelector(".rtf-link");
        this.html_notes = comment_field.querySelector(".html-notes");
        this.rtf_notes = comment_field.querySelector(".rtf-notes");

        this.get_ready();
    }

    switchToRTE() {
        this.rtf_link.classList.add("current");
        this.html_link.classList.remove("current");

        this.rte.value = this.html_editor.value;

        this.html_editor.classList.add("hidden");
        this.rte.classList.remove("hidden");

        this.html_notes.classList.add("hidden");
        this.rtf_notes.classList.remove("hidden");
    }

    switchToHTML() {
        this.html_link.classList.add("current");
        this.rtf_link.classList.remove("current");

        if(this.rte.value != "<p><br></p>") {
            this.html_editor.value = rte.value;
        }

        this.html_editor.classList.remove("hidden");
        this.rte.classList.add("hidden");

        this.html_notes.classList.remove("hidden");
        this.rtf_notes.classList.add("hidden");
    }

    get_ready() {
        this.comment_field.querySelector(".rtf-html-switch").classList.remove('hidden');
        this.html_link.classList.add("current");

        this.rtf_link.onclick = () => {
            if (this.comment_field.querySelector("lexxy-editor")) {
                this.switchToRTE();
            } else {
                let node = document.createRange().createContextualFragment('<lexxy-editor id="comment_content_for_173" class="comment_form observe_textlength" title="Enter Comment" input="comment_content_for_173_trix_input_comment" name="comment[comment_content]"></lexxy-editor>');
                this.comment_field.querySelector("#lexxy_parent").appendChild(node);
                this.comment_field.addEventListener("lexxy:initialize", () => {
                    this.comment_field.querySelector(".lexxy-editor__content").classList.add("userstuff");
                    this.rte = this.comment_field.querySelector("lexxy-editor");

                    let selectors = "button[name=\"highlight\"], " +
                        "button[name=\"file\"], " +
                        "button[name=\"image\"], " +
                        "button[name=\"code\"]";
                    if(this.rte.querySelectorAll(selectors).length > 0) {
                        this.rte.querySelectorAll(selectors).forEach((elem) => elem.parentNode.removeChild(elem)); // for IE compatibility

                        this.switchToRTE();
                    }
                });
            }
        };

        this.html_link.onclick = () => {
            this.switchToHTML();
        };
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    new EditingField(document.querySelector("div.post.comment"));

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            for (const addedNode of mutation.addedNodes) {
                if (addedNode.classList != null && addedNode.classList.contains("post")) {
                    new EditingField(addedNode);
                }
            }
        }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(document, config);
});
