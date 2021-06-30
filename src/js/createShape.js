import _createSurface from "./createSurface.js";

const _createShape = (numberOfSide, size) => {
    let data = {};

    function __init__() {
        data.sides = numberOfSide;
        data.maxW = size[0],
            data.maxH = size[1];

        _createElem();
        _appendChildIntoParent();

        for (let i = 0; i < numberOfSide; i++) {
            const oldTransform = data.child[i].style.transform;
            (i % 2) == 0 ? data.child[i].style.transformOrigin = 'top' : data.child[i].style.transformOrigin = 'bottom';
            data.child[i].style.transform = `${oldTransform} rotateX(${data.insDegree}deg)`;
        }
        data.parent.prepend(data.surface);
        console.log(data.surface);

        return data;
    }

    function _setSize(elem, commonHeight = data.maxH) {
        elem.style.width = `${data.maxW}px`;
        elem.style.height = `${commonHeight}px`;
    }

    function _appendChildIntoParent() {
        let empty = true;

        for (let i = 0, j = 1; j < data.sides; i++, j++) {
            if (empty) {
                data.parent.append(data.child[i]);
                data.child[i].style.transform = `translate3d(0px, ${data.insDegree > 90 ? data.r - (data.r / Math.floor(data.sides / 2)) : 0}px, -${data.r}px)`;
                empty = false;
            }

            data.child[i].append(data.child[j]);
        }
    }

    function _createElem() {
        data.insDegree = Math.round((180 * (data.sides - 2)) / data.sides),
            data.centDegree = 360 / data.sides;
        data.h = data.maxH * (data.insDegree > 90 ? Math.sin((180 / data.sides) * (Math.PI / 180)) : 1);
        data.r = data.h / (2 * Math.tan(180 / data.sides * (Math.PI / 180))),
            data.R = data.h / (2 * Math.sin(180 / data.sides * (Math.PI / 180)));

        let parentElem = document.createElement('div');
        parentElem.className = 'baseSide';
        data.parent = parentElem;
        _setSize(data.parent);

        data.child = [],
            data.points = [];
        let _degree = 0;
        for (let i = 0; i < data.sides; i++) {
            let DOMElem = document.createElement('div');
            DOMElem.className = 'sideShape';
            data.child.push(DOMElem);
            _setSize(DOMElem, data.h);

            data.points.push({
                x: 2 * data.R * Math.cos(_degree * (Math.PI / 180)),
                y: 2 * data.R * Math.sin(_degree * (Math.PI / 180)),
            });
            _degree += data.centDegree;
        }

        _createSurface(data);
    }

    return __init__();
}

export default _createShape;