class Shape {
    constructor(numberOfSides, ...size) {
        this.numberOfSides = numberOfSides;
        this.__init__(...size);
    }

    __init__(width, height) {
        this.maxW = width,
            this.maxH = height;

        this._createElem();
        this._createSurface();
        this._appendChildIntoParent();

        for (let i = 0; i < this.numberOfSides; i++) {
            const oldTrans = this.sides[i].style.transform;
            (i % 2) == 0 ? this.sides[i].style.transformOrigin = 'right' : this.sides[i].style.transformOrigin = 'left';
            this.sides[i].style.transform = `${oldTrans} rotateY(${this.insDegree}deg)`;
        }
        this.parent.prepend(this.surface);
        console.log(this);
    }

    _setSize(elem, _width, _height) {
        elem.style.width = `${!_width ? _width = this.maxW : _width}px`;
        elem.style.height = `${!_height ? _height = this.maxH : _height}px`;
    }

    _appendChildIntoParent() {
        let empty = true;
        for (let i = 0, j = 1; j < this.numberOfSides; i++, j++) {
            if (empty) {
                this.sides[i].style.cssText += `
                    transform: translate3d(-${50 + this.movCentX}%, ${this.maxH > this.maxW ? ((-(this.maxH / 2) - (this.movCentY / (this.maxH / this.maxW)) + this.maxW) * 100) / this.maxH : -this.movCentY}%, -${this.maxH / 2}px) rotateX(90deg);
                    top: ${this.maxH > this.maxW ? 0 : 50}%;
                    left: 50%;
                `;
                this.parent.append(this.sides[i]);
                empty = false;
            }

            this.sides[i].append(this.sides[j]);
        }
    }

    _findSpecialCoord(meth, axis) {
        return Math[meth](...this.dataOfCoord.points.map(e => e[axis]))
    }

    _createElem() {
        this.insDegree = (180 * (this.numberOfSides - 2)) / this.numberOfSides,
            this.centDegree = 360 / this.numberOfSides;
        this.w = this.maxW * (this.insDegree > 90 ? Math.sin((this.centDegree / 2) * (Math.PI / 180)) : 1);
        this.r = this.w / (2 * Math.tan((this.centDegree / 2) * (Math.PI / 180))),
            this.R = this.w / (2 * Math.sin((this.centDegree / 2) * (Math.PI / 180)));
        this.diameter = this.R * 2;

        let parentElem = document.createElement('div');
        parentElem.className = 'baseSide';
        this.parent = parentElem;
        this._setSize(this.parent, null, this.maxW);

        this.sides = [];
        for (let i = 0; i < this.numberOfSides; i++) {
            let DOMElem = document.createElement('div');
            DOMElem.className = 'sideShape';
            this.sides.push(DOMElem);
            this._setSize(DOMElem, this.w);
        }
    }

    _setPoints() {
        let _degree = 0;
        this.dataOfCoord.points = [];
        for (let i = 0; i < this.numberOfSides; i++) {
            this.dataOfCoord.points.push({
                x: this.R * Math.cos((_degree + this.insDegree / 2) * (Math.PI / 180)),
                y: this.R * Math.sin((_degree + this.insDegree / 2) * (Math.PI / 180)),
            });
            _degree += this.centDegree;
        }

        this.dataOfCoord.minX = this._findSpecialCoord('min', 'x'),
            this.dataOfCoord.minY = this._findSpecialCoord('min', 'y');
        this.dataOfCoord.maxX = this._findSpecialCoord('max', 'x'),
            this.dataOfCoord.maxY = this._findSpecialCoord('max', 'y');

        this.diagonal = Math.abs(this.dataOfCoord.minX) + this.dataOfCoord.maxX;
        this.movCentY = Math.abs((
                (this.maxW - (Math.abs(this.dataOfCoord.minY) + this.dataOfCoord.maxY)) * 100) /
            this.maxW) / 2;
        this.movCentX = Math.round(this.w) != Math.round(this.diagonal) ? ((this.diameter - this.diagonal) * 100) / this.maxW : 0;
    }

    _setStrCoord() {
        this.dataOfCoord.coordForShape = '';
        this.dataOfCoord.points.forEach((dataOfCoord, i) => this.dataOfCoord.coordForShape += `${dataOfCoord.x} ${dataOfCoord.y}` + (this.numberOfSides - 1 > i ? ',' : ''));
    }

    _createSurface() {
        this.dataOfCoord = {};
        this._setPoints();
        this._setStrCoord();

        let polygon = document.createElement('polygon');
        this.surface = document.createElement('svg');
        this.surface.className = 'surface',
            polygon.className = 'polygon';

        this.surface.setAttribute('viewBox', `${this.dataOfCoord.minX} ${this.dataOfCoord.minY} ${this.maxW} ${this.maxW}`);
        this.surface.style.position = 'absolute';
        this._setSize(this.surface, null, this.maxW);
        polygon.style.transform = `translate3d(0%, ${this.movCentY}%, 0)`;

        polygon.setAttribute('points', this.dataOfCoord.coordForShape);
        this.surface.append(polygon);
    }
}

export default Shape;