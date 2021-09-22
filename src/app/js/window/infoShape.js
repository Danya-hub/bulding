export default class Class {
    constructor(obj) {
        this.obj = obj;
        this.__init__();
    }

    __init__() {
        this.button = document.createElement('button'),
            this.button.className = 'closeInfo',
            this.button.innerHTML = '<img src="./assets/svg/close.svg" alt="closeInfo">';
        this.content = '';

        this._setContent(this.obj);

        document.querySelector('#info').innerHTML = `${this.button.outerHTML} ${this.content}`;
    }

    _isArr(value) {
        return Array.isArray(value);
    }

    _isObj(value) {
        return !value.length && !!Object.keys(value).length;
    }

    _createElem(key, value) {
        if (this._getTypeValue(value) != 'singVal') return '';
        return `<div><span class="name">${key}</span>: <span class="value">${value}</span></div>`;
    }

    _getTypeValue(value) {
        return this._isArr(value) ? 'array' : this._isObj(value) ? 'object' : typeof value != 'object' ? 'singVal' : null;
    }

    _isFinalResult(type) {
        return type == 'singVal' || type == null;
    }

    _setContent(obj) {
        let keys = Object.keys(obj),
            values = Object.values(obj);
        let lastType = '';

        keys.forEach((key, i) => {
            let commType = '';

            while (!this._isFinalResult(commType)) {
                !commType.length ? commType = this._getTypeValue(values[i]) : null;
                this.content += this._createElem(key, values[i]);
                if (this._isFinalResult(commType)) continue;

                commType == 'array' ? values[i].forEach(e => commType = this._getTypeValue(e)) :
                    commType == 'object' ? commType = this._setContent(values[i]) : null;
            }

            keys.length - 1 == i ? lastType = commType : null;
        })

        return lastType;
    }
}