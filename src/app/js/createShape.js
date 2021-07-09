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

    _setSize(elem, commonWidth = this.maxW) {
        elem.style.width = `${commonWidth}px`;
        elem.style.height = `${this.maxH}px`;
    }

    _appendChildIntoParent() { //! <---------
        let empty = true;
        for (let i = 0, j = 1; j < this.numberOfSides; i++, j++) {
            if (empty) {
                this.sides[i].style.cssText += `
                    transform: translate3d(-50%, -${this.movCentY}%, -${this.maxH / 2}px) rotateX(90deg);
                    left: 50%;
                    top: 50%;
                `;
                empty = false;
                this.parent.append(this.sides[i]);
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

        let parentElem = document.createElement('div');
        parentElem.className = 'baseSide';
        this.parent = parentElem;
        this._setSize(this.parent);

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
        this.movCentY = Math.abs((
                (this.maxW - (Math.abs(this.dataOfCoord.minY) + this.dataOfCoord.maxY)) * 100) /
            this.maxW) / 2;
    }

    _setStrCoord() {
        this.dataOfCoord.coordForShape = '';
        this.dataOfCoord.points.forEach((dataOfCoord, i) => this.dataOfCoord.coordForShape += `${dataOfCoord.x} ${dataOfCoord.y}` + (this.numberOfSides - 1 > i ? ',' : ''));
    }

    _createSurface() {
        this.dataOfCoord = {};
        this._setPoints();
        this._setStrCoord();

        let surface = document.createElement('svg'),
            polygon = document.createElement('polygon');
        surface.className = 'surface',
            polygon.className = 'polygon';

        surface.setAttribute('viewBox', `${this.dataOfCoord.minX} ${this.dataOfCoord.minY} ${this.maxW} ${this.maxW}`);
        polygon.style.transform = `translate3d(0%, ${this.movCentY}%, 0)`;
        //? console.log(Math.abs(data.maxW + data.minX + data.minY));
        surface.style.cssText = `
            position: absolute;
            width: ${this.maxW}px;
            height: ${this.maxW}px;
        `;

        polygon.setAttribute('points', this.dataOfCoord.coordForShape);
        surface.append(polygon);
        this.surface = surface;
    }
}

export default Shape;