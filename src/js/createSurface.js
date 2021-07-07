const createSurface = (object) => {
    let coordForShape = '';
    const minX = _findSpecialCoord('min', 'x'),
        minY = _findSpecialCoord('min', 'y'),
        maxX = _findSpecialCoord('max', 'x'), //?
        maxY = _findSpecialCoord('max', 'y'); //?
    
    function __init__() {
        object.points.forEach((coord, i) => coordForShape += `${coord.x} ${coord.y}` + (object.numberOfSides - 1 > i ? ',' : ''));

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
console.log(maxX);
console.log(minX);
        surface.setAttribute('viewBox', `${minX} ${minY} ${object.maxW} ${object.maxW}`);
        polygon.style.transform = `translate3d(0, ${object.maxW - (Math.abs(minY) + maxY)}px, 0)`;
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