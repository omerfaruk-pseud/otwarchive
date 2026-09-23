// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
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

document.addEventListener("DOMContentLoaded", (event) => {
    let rte = null;
    let html_editor = document.querySelector("textarea[id=comment_content_for_173]");
    let html_link = document.querySelector(".html-link");
    let rtf_link = document.querySelector(".rtf-link");

    document.querySelector(".rtf-html-switch").classList.remove('hidden');
    html_link.classList.add("current");

    function switchToRTE() {
        rtf_link.classList.add("current");
        html_link.classList.remove("current");

        rte.value = html_editor.value;

        html_editor.classList.add("hidden");
        rte.classList.remove("hidden");
    }

    function switchToHTML() {
        html_link.classList.add("current");
        rtf_link.classList.remove("current");

        if(rte.value != "<p><br></p>") {
            html_editor.value = rte.value;
        }

        html_editor.classList.remove("hidden");
        rte.classList.add("hidden");
    }

    rtf_link.onclick = function () {
        if (document.querySelector("lexxy-editor")) {
            switchToRTE();
        } else {
            let node = document.createRange().createContextualFragment('<lexxy-editor id="comment_content_for_173" class="comment_form observe_textlength" title="Enter Comment" input="comment_content_for_173_trix_input_comment" name="comment[comment_content]"></lexxy-editor>');
            document.getElementById("lexxy_parent").appendChild(node);
            document.addEventListener("lexxy:initialize", function () {
                document.querySelector(".lexxy-editor__content").classList.add("userstuff");
                rte = document.querySelector("lexxy-editor");

                let selectors = "button[name=\"highlight\"], " +
                    "button[name=\"file\"], " +
                    "button[name=\"image\"], " +
                    "button[name=\"code\"]";
                if(rte.querySelectorAll(selectors).length > 0) {
                    rte.querySelectorAll(selectors).forEach((elem) => elem.parentNode.removeChild(elem)); // for IE compatibility

                    switchToRTE();
                }
            });
        }
    };

    html_link.onclick = function () {
        switchToHTML();
    };
});
