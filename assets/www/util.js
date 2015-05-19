function randomRange(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function setElementText(id, text) {
    $('#' + id).html(text);
}