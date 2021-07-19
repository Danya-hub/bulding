class Shape {
    constructor(numberOfSides, size, parts) {
        this.numberOfSides = numberOfSides;
        this._setParts(...parts);
        this.__init__(...size);
    }

    __init__(width, height) {
        this.maxW = width,
            this.hasSides ? this.maxH = height : null;
        this._setComputation();

        this.parent = document.createElement('div');
        this.parent.className = 'baseSide';
        this._setSize(this.parent, null, this.maxW);

        if (this.hasSides) {
            this._createSides();
            this._appendChildIntoParent();

            for (let i = 0; i < this.numberOfSides; i++) {
                const oldTrans = this.sides[i].style.transform;
                (i % 2) == 0 ? this.sides[i].style.transformOrigin = 'right' : this.sides[i].style.transformOrigin = 'left';
                this.sides[i].style.transform = `${oldTrans} rotateY(${this.insDegree}deg)`;
            }
        };
        this.hasSurface ? (this._createSurface(), this.parent.prepend(this.surface)) : null;

        console.log(this);
    }

    _setParts(sides = true, surface = true) {
        this.hasSides = sides,
            this.hasSurface = surface;
    }

    _setSize(elem, _width, _height) {
        elem.style.width = `${!_width ? _width = this.maxW : _width}px`,
            elem.style.height = `${!_height ? _height = this.maxH : _height}px`;
    }

    _setComputation() {
        this.dataOfCoord = {};

        this.insDegree = (180 * (this.numberOfSides - 2)) / this.numberOfSides,
            this.centDegree = 360 / this.numberOfSides;
        this.w = this.maxW * (this.insDegree > 90 ? Math.sin((this.centDegree / 2) * (Math.PI / 180)) : 1);
        this.r = this.w / (2 * Math.tan((this.centDegree / 2) * (Math.PI / 180))),
            this.R = this.w / (2 * Math.sin((this.centDegree / 2) * (Math.PI / 180)));
        this.diameter = this.R * 2;

        this._setPoints();
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

    _createSides() {
        this.sides = [];
        for (let i = 0; i < this.numberOfSides; i++) {
            let DOMElem = document.createElement('div');
            DOMElem.className = 'sideShape';
            this.sides.push(DOMElem);
            this._setSize(DOMElem, this.w);
        }
    }

    _setPoints() {
        this.dataOfCoord.points = [];
        this.dataOfCoord.coordForShape = '';

        let _degree = 0;
        for (let i = 0; i < this.numberOfSides; i++) {
            this.dataOfCoord.points.push({
                x: this.R * Math.cos((_degree + this.insDegree / 2) * (Math.PI / 180)),
                y: this.R * Math.sin((_degree + this.insDegree / 2) * (Math.PI / 180)),
            });
            _degree += this.centDegree;
        }
        this.dataOfCoord.points.forEach((dataOfCoord, i) => this.dataOfCoord.coordForShape += `${dataOfCoord.x} ${dataOfCoord.y}` + (this.numberOfSides - 1 > i ? ',' : ''));

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

    _createSurface() {
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