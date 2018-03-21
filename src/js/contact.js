/**
 * ecpuk.org - Contact Page JavaScript
 * ============================================================ */
(function () {
    "use strict";

    var map = L.map('map', {
        center: mapOptions.coords,
        zoom: mapOptions.zoom,
        minZoom: mapOptions.minZoom,
        trackResize: true,
        dragging: false,
        zoomControl: false,
        doubleClickZoom: 'center',
        scrollWheelZoom: 'center'
    });

    var zoom = L.control.zoom({
        position: 'bottomleft'
    });

    map.addControl(zoom);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + mapOptions.token, {
        maxZoom: 18,
        attribution: 'Data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(map);

    var icon = L.icon({
        iconUrl: mapOptions.icon,
        iconSize: mapOptions.iconSize,
        iconAnchor: mapOptions.iconAnchor
    });

    L.marker(mapOptions.coords, {icon: icon}).addTo(map);

})();