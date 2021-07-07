const createSurface = (object) => {
    let coordForShape = '';
    
    function __init__() {
        object.points.forEach((coord, i) => coordForShape += `${coord.x} ${coord.y}` + (object.numberOfSides - 1 > i ? ',' : ''));
        const minX = _findSpecialCoord('min', 'x'),
            minY = _findSpecialCoord('min', 'y');

        _createElem(minX, minY);
    }

    function _findSpecialCoord(meth, axis) {
        return Math[meth](...object.points.map(e => e[axis]))
    }

    function _createElem(_x, _y) {
        let surface = document.createElement('svg'),
            polygon = document.createElement('polygon');

        surface.className = 'surface',
            polygon.className = 'polygon';
            console.log(object.maxH - (object.numberOfSides % 2 ? object.R : object.r));

        surface.setAttribute('viewBox', `${_x} ${_y} ${object.maxW} ${object.maxW}`);
        surface.style.cssText = `
            position: absolute;
            width: ${object.maxW}px;
            height: ${object.maxW}px;
        `;

        polygon.setAttribute('points', coordForShape);
        surface.append(polygon);
        object.surface = surface;
    }

    __init__();
}

export default createSurface;