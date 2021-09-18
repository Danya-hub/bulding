function _setBoolen(bool) {
    return bool == 'true';
}

export default () => {
    let form = document.querySelector('#settings form'),
        status = document.querySelector('#status');

    document.querySelector('.openPanel').addEventListener('click', () => {
        form.setAttribute('active', !_setBoolen(form.getAttribute('active')));
        _setBoolen(form.getAttribute('active')) ? (form.style.maxHeight = '999px', status.textContent = 'закрыть') : (form.style = '', status.textContent = 'открыть');
    });
}