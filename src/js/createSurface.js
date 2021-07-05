const createSurface = (object) => {
    let coordForShape = '';
    object.points.forEach((coord, i) => coordForShape += `${coord.x} ${coord.y}` + (object.numberOfSides - 1 > i ? ',' : ''));
    const minX = _findSpecialCoord('min', 'x'),
        minY = _findSpecialCoord('min', 'y');

    function __init__() {
        _createElem();
    }

    function _findSpecialCoord(meth, axis) {
        return Math[meth](...object.points.map(e => e[axis]))
    }

    function _createElem() {
        let surface = document.createElement('svg'),
            polygon = document.createElement('polygon');

        surface.className = 'surface',
            polygon.className = 'polygon';

        surface.setAttribute('viewBox', `${minX} ${minY} ${object.maxW} ${object.maxW}`);
        // polygon.style.transform = `translateY(${object.R - object.r}px)`;
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