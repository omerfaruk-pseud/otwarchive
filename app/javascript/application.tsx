import React from "react";
import ReactDOM from "react-dom/client";
import h from "preact";
import { SimpleEditor } from '../../components/tiptap-templates/simple/simple-editor'

import '../../styles/_variables.scss';
import '../../styles/_keyframe-animations.scss';

document.addEventListener("DOMContentLoaded", () => {
    const tiptap = document.getElementById("tiptap");
    if (tiptap) {
        ReactDOM.createRoot(tiptap).render(App());
    }
});

// @ts-ignore
const App = () => (
    React.createElement(SimpleEditor)
)
