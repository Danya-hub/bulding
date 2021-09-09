'use strict';

import _createShape from "./js/createShape.js";
import { data } from "./data.js";

let platform = document.createElement('div');
platform.id = 'platform';
document.body.append(platform);

Array(...document.querySelectorAll('.input')).forEach(e => e.addEventListener('input', () => {
    platform.innerHTML = '';
    data[e.id] = Number(e.value);
    let shape = new _createShape(
        data.sides, 
        [data.width, data.height],
        [] //sides, surface
    );

    platform.style.cssText = `width: ${data.numOfShape * shape.maxW}px; height: ${data.numOfShape * shape.maxW}px;`;
    for (let i = 0; i < data.numOfShape * data.numOfShape; i++)
        platform.innerHTML += shape.parent.outerHTML;
}));