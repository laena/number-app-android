function normalRandom(mean, deviation) {
	// https://en.wikipedia.org/wiki/Marsaglia_polar_method
    var s, u, v, n;
    do {
        u = Math.random() * 2 - 1;
        v = Math.random() * 2 - 1;
        s = u * u + v * v;
    } while (s >= 1);
    
    n = u * Math.sqrt(-2 * Math.log(s) / s);
    return Math.floor(deviation * n + mean);
}

function randomRange(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}

function randomInt(max) {
    return Math.floor(Math.random() * max);
}

function setElementText(id, text) {
    $('#' + id).html(text);
}