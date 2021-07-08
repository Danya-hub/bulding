const createSurface = (data) => {
    let coordForShape = '';

    function __init__() {
        data.points.forEach((coord, i) => coordForShape += `${coord.x} ${coord.y}` + (data.numberOfSides - 1 > i ? ',' : ''));

        _createElem();
    }

    function _createElem() {
        let surface = document.createElement('svg'),
            polygon = document.createElement('polygon');
        surface.className = 'surface',
            polygon.className = 'polygon';

        surface.setAttribute('viewBox', `${data.minX} ${data.minY} ${data.maxW} ${data.maxW}`);
        polygon.style.transform = `translate3d(0%, ${data.movCentY}%, 0)`;
        //? console.log(Math.abs(data.maxW + data.minX + data.minY));
        surface.style.cssText = `
            position: absolute;
            width: ${data.maxW}px;
            height: ${data.maxW}px;
        `;

        polygon.setAttribute('points', coordForShape);
        surface.append(polygon);
        data.surface = surface;
    }

    __init__();
}

export default createSurface;