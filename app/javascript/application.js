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
        markdown: false,
        attachments: false
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

        if(!this.rte.classList.contains("lexxy-editor--empty")) {
            this.html_editor.value = this.rte.value;
        }

        this.html_editor.classList.remove("hidden");
        this.rte.classList.add("hidden");

        this.html_notes.classList.remove("hidden");
        this.rtf_notes.classList.add("hidden");
    }

    get_ready() {
        this.comment_field.querySelector(".rtf-html-switch").classList.remove('hidden');
        this.html_link.classList.add("current");

        this.rtf_link.onclick = (e) => {
            e.preventDefault();
            if(!this.rtf_link.classList.contains("current")) {
                if (this.comment_field.querySelector("lexxy-editor")) {
                    this.switchToRTE();
                } else {
                    this.initialize_lexxy();
                }
            }
        };

        this.html_link.onclick = (e) => {
            e.preventDefault();
            if(!this.html_link.classList.contains("current")) {
                this.switchToHTML();
            }
        };
    }

    initialize_lexxy() {
        let node = document.createRange().createContextualFragment("<lexxy-editor ></lexxy-editor>");
        this.comment_field.querySelector("#lexxy_parent").appendChild(node);

        this.comment_field.addEventListener("lexxy:initialize", () => {
            this.comment_field.querySelector(".lexxy-editor__content").classList.add("userstuff");
            this.rte = this.comment_field.querySelector("lexxy-editor");

            let attributes = this.comment_field.querySelector("#lexxy_attributes");
            this.rte.setAttribute("class", attributes.dataset.class);
            this.rte.setAttribute("title", attributes.dataset.title);
            this.rte.setAttribute("name", attributes.dataset.name);
            this.rte.setAttribute("id", attributes.dataset.id); // TODO: does this break validation and/or is the id it replaces used

            let selectors = "button[name=\"highlight\"], " +
                "button[name=\"code\"], " +
                "lexxy-code-language-picker";
            if(this.rte.querySelectorAll(selectors).length > 0) {
                this.rte.querySelectorAll(selectors).forEach((elem) => elem.parentNode.removeChild(elem)); // for IE compatibility

                this.switchToRTE();
            }

            let validation_for_rte = new LiveValidation(this.rte, { wait: 500, onlyOnBlur: false });
            // validation_for_rte.add(Validate.Length, {"minimum":"12","tooShortMessage":"Brevity is the soul of wit, but we need your comment to have text in it."});
            // the reason I commented out that line is Lexxy starts with a br in p when it's blank, making it 11
            // characters. If we make 12 minimum, something like <p>cool</p> will fail too.
            validation_for_rte.add(Validate.Length, {"maximum":"10000","tooLongMessage":"must be less than 10000 characters long."});
            // TODO: i18n
        });
    }
}

document.addEventListener("DOMContentLoaded", (event) => {
    let main_comment = document.querySelector("div.post.comment");
    if(main_comment !== null) {
        new EditingField(main_comment);
    }

    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    // Callback function to execute when mutations are observed
    const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
            for (const addedNode of mutation.addedNodes) {
                if (addedNode.classList != null && addedNode.matches("div.post.comment")) {
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
