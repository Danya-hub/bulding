export default class Class {
    constructor(obj) {
        this.obj = obj;
        this.__init__();
    }

    __init__() {
        this.keys = Object.keys(this.obj),
            this.values = Object.values(this.obj);
        this._createElem();
        this._setContent();
    }

    _isArr(value) {
        return !!value.length;
    }

    _isObj(value) {
        return !value.length && !!Object.keys(value).length;
    }

    _createElem() {
        this.list = document.createElement('ul'),
            this.button = document.createElement('button');
        this.button.className = 'closeInfo';
        this.button.innerHTML = '<img src="./assets/svg/close.svg" alt="closeInfo">';
    }

    _setContent() {
        this.keys.forEach((key, i) => this.list.innerHTML += `<li>
            <span class="name">${key}</span>: <span class="value">${this._isArr(this.values[i]) ? 'a, b, c' : this._isObj(this.values[i]) ? 'list' : this.values[i]}</span>
        </li>`);

        document.querySelector('#info').innerHTML = `${this.button.outerHTML} ${this.list.outerHTML}`;
    }
}