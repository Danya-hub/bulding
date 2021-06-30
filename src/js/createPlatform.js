const _createPlatform = (shape, sides) => {
    function __init__() {
        let parentElem = document.createElement('div');
        parentElem.id = 'platform';
        const sizeOfPlatform = sides * shape.maxH;

        _setSize(parentElem, sizeOfPlatform);
        _addElem(parentElem);
    }
    
    function _setSize(elem, size) {
        elem.style.width = `${size}px`;
        elem.style.height = `${size}px`;
    }
    
    function _addElem(elem) {
        for (let i = 0; i < sides * sides; i++)
            elem.innerHTML += shape.parent.outerHTML;
        document.body.append(elem);
    }

    __init__();
}

export default _createPlatform;