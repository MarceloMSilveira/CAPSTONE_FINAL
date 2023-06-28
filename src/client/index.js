import { performAction } from "./js/app"

import "./styles/style.scss"

document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('generate');
    generateButton.addEventListener('click', performAction);
});

document.addEventListener('DOMContentLoaded', () => {
    const generateButton = document.getElementById('changeImg');
    generateButton.addEventListener('click', performAction);
});

export {performAction}