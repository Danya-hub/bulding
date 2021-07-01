const createSurface = (object) => {
    let coordForShape = '';
    object.points.forEach((coord, i) => coordForShape += `${coord.x} ${coord.y}` + (object.numberOfSides - 1 > i ? ',' : ''));
    const minX = _findSpecialCoord('min', 'x'),
        minY = _findSpecialCoord('min', 'y');
    // console.log('x:', _findSpecialCoord('max', 'x'), 'y:', _findSpecialCoord('max', 'y'));
    function __init__() {
        _createElem();
    }

    function _findSpecialCoord(meth, axis) {
        return Math[meth](...object.points.map(e => e[axis]))
    }

    function _createElem() {
        let surface = document.createElement('svg'),
            polygon = document.createElement('polygon');
        surface.id = 'surface',
            polygon.id = 'polygon';

        surface.setAttribute('viewBox', `${minX} ${minY} ${Math.abs(minX) + object.maxW} ${Math.abs(minY) + object.maxW}`);
        surface.style.cssText = `
            position: absolute;
            transform: rotateZ(${object.insDegree / 2}deg);
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