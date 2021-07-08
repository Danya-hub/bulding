import _createSurface from "./createSurface.js";

const _createShape = (numberOfSide, size) => {
    let data = {};

    function __init__() {
        data.numberOfSides = numberOfSide;
        data.maxW = size[0],
            data.maxH = size[1];

        _createElem();
        _appendChildIntoParent();

        for (let i = 0; i < numberOfSide; i++) {
            const oldTrans = data.sides[i].style.transform;
            (i % 2) == 0 ? data.sides[i].style.transformOrigin = 'right' : data.sides[i].style.transformOrigin = 'left';
            data.sides[i].style.transform = `${oldTrans} rotateY(${data.insDegree}deg)`;
        }
        data.parent.prepend(data.surface);

        return data;
    }

    function _setSize(elem, commonWidth = data.maxW) {
        elem.style.width = `${commonWidth}px`;
        elem.style.height = `${data.maxH}px`;
    }

    function _appendChildIntoParent() { //TODO: <---------
        let empty = true;

        for (let i = 0, j = 1; j < data.numberOfSides; i++, j++) {
            if (empty) {
                data.parent.append(data.sides[i]);
                data.sides[i].style.cssText += `
                    transform: translate3d(-50%, -${data.movCentY}%, -${data.maxH / 2}px) rotateX(90deg);
                    left: 50%;
                    top: 50%;
                `;
                empty = false;
            }

            data.sides[i].append(data.sides[j]);
        }
    }

    function _findSpecialCoord(meth, axis) {
        return Math[meth](...data.points.map(e => e[axis]))
    }

    function _createElem() {
        data.insDegree = (180 * (data.numberOfSides - 2)) / data.numberOfSides,
            data.centDegree = 360 / data.numberOfSides;

        // data.r = data.maxW / 2,
        //     data.R = data.r / Math.cos((data.centDegree / 2) * (Math.PI / 180));
        //     data.w = 2 * data.R * Math.sin((data.centDegree / 2) * (Math.PI / 180));

        data.w = data.maxW * (data.insDegree > 90 ? Math.sin((data.centDegree / 2) * (Math.PI / 180)) : 1);
        data.r = data.w / (2 * Math.tan((data.centDegree / 2) * (Math.PI / 180))),
            data.R = data.w / (2 * Math.sin((data.centDegree / 2) * (Math.PI / 180)));

        let parentElem = document.createElement('div');

        parentElem.className = 'baseSide';
        data.parent = parentElem;
        _setSize(data.parent);

        data.sides = [],
            data.points = [];
        let _degree = 0;
        for (let i = 0; i < data.numberOfSides; i++) {
            let DOMElem = document.createElement('div');
            DOMElem.className = 'sideShape';
            data.sides.push(DOMElem);
            _setSize(DOMElem, data.w);

            data.points.push({
                x: data.R * Math.cos((_degree + data.insDegree / 2) * (Math.PI / 180)),
                y: data.R * Math.sin((_degree + data.insDegree / 2) * (Math.PI / 180)),
            });
            _degree += data.centDegree;
        }

        data.minX = _findSpecialCoord('min', 'x'),
            data.minY = _findSpecialCoord('min', 'y');
        data.maxX = _findSpecialCoord('max', 'x'),
            data.maxY = _findSpecialCoord('max', 'y');
        data.movCentY = Math.abs(((data.maxW - (Math.abs(data.minY) + data.maxY)) * 100) / data.maxW) / 2;

        _createSurface(data);
    }

    return __init__();
}

export default _createShape;