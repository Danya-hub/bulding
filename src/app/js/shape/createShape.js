class Shape {
    constructor(numberOfSides, size, parts) {
        this.numberOfSides = numberOfSides;
        this._setParts(...parts);
        this.__init__(...size);
    }

    __init__(width = 0, height = 0) {
        this.maxW = width,
            this.hasSides ? this.maxH = height : null;

        this._setComputation();

        this.parent = document.createElement('div'),
            this.parent.className = 'baseSide';
        this._setSize(this.parent, null, this.maxW);

        this.hasSurface ? (this._createSurface(), this.parent.prepend(this.surface)) : null;
        if (this.hasSides) {
            this._createSides();
            this._appendChildIntoParent();

            for (let i = 0; i < this.numberOfSides; i++) {
                const oldTrans = this.sides[i].style.transform;
                (i % 2) == 0 ? this.sides[i].style.transformOrigin = 'right' : this.sides[i].style.transformOrigin = 'left';
                this.sides[i].style.transform = `${oldTrans} rotateY(${this.dataOfComputations.insDegree}deg)`;
            }
        };
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
        this.dataOfComputations = {};

        this.dataOfComputations.insDegree = (180 * (this.numberOfSides - 2)) / this.numberOfSides,
            this.dataOfComputations.centDegree = 360 / this.numberOfSides;
        this.dataOfComputations.w = this.maxW * (this.dataOfComputations.insDegree > 90 ? Math.sin((this.dataOfComputations.centDegree / 2) * (Math.PI / 180)) : 1);
        this.dataOfComputations.r = this.dataOfComputations.w / (2 * Math.tan((this.dataOfComputations.centDegree / 2) * (Math.PI / 180))),
            this.dataOfComputations.R = this.dataOfComputations.w / (2 * Math.sin((this.dataOfComputations.centDegree / 2) * (Math.PI / 180)));
        this.dataOfComputations.diameter = this.dataOfComputations.R * 2;
        this._setPoints();
    }

    _appendChildIntoParent() {
        let empty = true;
        for (let i = 0, j = 1; j < this.numberOfSides; i++, j++) {
            if (empty) {
                this.sides[i].style.cssText += `
                    transform: translate3d(-${50 + (Math.round(this.dataOfComputations.w) != Math.round(this.dataOfComputations.diagonal) ? this.dataOfComputations.spaceX : 0)}%, ${this.maxH > this.maxW ? ((-(this.maxH / 2) - (this.dataOfComputations.spaceY / (this.maxH / this.maxW)) + this.maxW) * 100) / this.maxH : this.maxH < this.maxW ? -this.dataOfComputations.spaceY + (((this.maxW / this.maxH) * this.dataOfComputations.spaceY) - this.dataOfComputations.spaceY) * this.dataOfComputations.spaceY : -this.dataOfComputations.spaceY}%, -${this.maxH / 2}px) rotateX(90deg);
                    top: ${this.maxH > this.maxW ? 0 : 50}%;
                    left: 50%;
                `;
                this.parent.append(this.sides[i]);
                // console.log('centX:', -this.dataOfComputations.spaceY + (((this.maxW / this.maxH) * this.dataOfComputations.spaceY) - this.dataOfComputations.spaceY) * this.dataOfComputations.spaceY);
                // console.log('centY:', ((-(this.maxH / 2) - (this.dataOfComputations.spaceY / (this.maxH / this.maxW)) + this.maxW) * 100) / this.maxH);

                // console.log(-this.dataOfComputations.spaceY + (((this.maxW / this.maxH) * this.dataOfComputations.spaceY) - this.dataOfComputations.spaceY) * this.dataOfComputations.spaceY);
                // console.log((this.maxH / this.maxW) * this.dataOfComputations.spaceX);
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
            this._setSize(DOMElem, this.dataOfComputations.w);
        }
    }

    _setPoints() {
        this.dataOfCoord = {},
            this.dataOfCoord.points = [];
        this.dataOfCoord.coordForShape = '';

        let _degree = 0;
        for (let i = 0; i < this.numberOfSides; i++)
            this.dataOfCoord.points.push({
                x: this.dataOfComputations.R * Math.cos((_degree + this.dataOfComputations.insDegree / 2) * (Math.PI / 180)),
                y: this.dataOfComputations.R * Math.sin((_degree + this.dataOfComputations.insDegree / 2) * (Math.PI / 180)),
            }),
            _degree += this.dataOfComputations.centDegree;

        this.dataOfCoord.points.forEach((dataOfCoord, i) => this.dataOfCoord.coordForShape += `${dataOfCoord.x} ${dataOfCoord.y}` + (this.numberOfSides - 1 > i ? ',' : ''));

        this.dataOfCoord.minX = this._findSpecialCoord('min', 'x'),
            this.dataOfCoord.minY = this._findSpecialCoord('min', 'y');
        this.dataOfCoord.maxX = this._findSpecialCoord('max', 'x'),
            this.dataOfCoord.maxY = this._findSpecialCoord('max', 'y');

        this.dataOfComputations.diagonal = Math.abs(this.dataOfCoord.minX) + this.dataOfCoord.maxX;
        this.dataOfComputations.spaceX = ((this.dataOfComputations.diameter - this.dataOfComputations.diagonal) * 100) / this.maxW;
        this.dataOfComputations.spaceY = Math.abs((
                (this.maxW - (Math.abs(this.dataOfCoord.minY) + this.dataOfCoord.maxY)) * 100) /
            this.maxW) / 2;
    }

    _createSurface() {
        let polygon = document.createElement('polygon');
        this.surface = document.createElement('svg');
        this.surface.className = 'surface',
            polygon.className = 'polygon';

        this.surface.setAttribute('viewBox', `${this.dataOfCoord.minX} ${this.dataOfCoord.minY} ${this.maxW} ${this.maxW}`);
        this.surface.style.position = 'absolute';
        this._setSize(this.surface, null, this.maxW);
        polygon.style.transform = `translate3d(0%, ${this.dataOfComputations.spaceY}%, 0)`;

        polygon.setAttribute('points', this.dataOfCoord.coordForShape);
        this.surface.append(polygon);
    }
}

export default Shape;