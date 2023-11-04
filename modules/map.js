var map;

function init() {
    map = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 8
    });
}

ymaps.ready(init);