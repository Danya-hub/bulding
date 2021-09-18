import _createShape from "./createShape.js";
import _setInfoShape from "../window/infoShape.js";
import {
    data
} from "../../data.js";

export default () => {
    let platform = document.createElement('div');
    platform.id = 'platform';
    document.body.append(platform);

    let arr = Array(...document.querySelectorAll('.input'));
    let bool = false;
    arr.forEach(e => e.addEventListener('input', () => {
        platform.innerHTML = '';
        data[e.id] = Number(e.value);

        !bool ? bool = arr.every(e => e.value.length > 0) : null;
        if (bool) {
            document.querySelector('.openInfo').style.cssText = `opacity: 1; visibility: visible;`;
            let shape = new _createShape(
                data.sides,
                [data.width, data.height],
                [] //sides, surface
            )

            platform.style.cssText = `width: ${data.numOfShape * shape.maxW}px; height: ${data.numOfShape * shape.maxW}px;`;
            for (let i = 0; i < data.numOfShape * data.numOfShape; i++)
                platform.innerHTML += shape.parent.outerHTML;
            new _setInfoShape(shape)

            document.querySelector('.openInfo').addEventListener('click', () => document.querySelector('#info').style.cssText = `opacity: 1; visibility: visible;`);
            document.querySelector('.closeInfo').addEventListener('click', () => document.querySelector('#info').style.cssText = ``);
        }
    }));
}