
let opts = {
    map: {
        center: [38.0655, -97.9202],
        zoom: 5,
        fullscreenControl: false,
        resizerControl: true,
        preferCanvas: true,
        rotate: true,
        // bearing: 45,
        rotateControl: {
            closeOnZeroBearing: true
        },
    },
    elevationControl: {
        url: "data/elevation.geojson",
        options: {
            theme: "lightblue-theme",
            collapsed: false,
            autohide: false,
            autofitBounds: true,
            position: "bottomleft",
            detached: true,
            summary: "inline",
            imperial: false,
            // altitude: "disabled",
            slope: "disabled",
            speed: false,
            acceleration: false,
            time: "summary",
            legend: true,
            followMarker: true,
            almostOver: true,
            distanceMarkers: false,
            hotline: false,
        },
    },
    layersControl: {
        options: {
            collapsed: false,
        },
    },
};

let map = L.map('map', opts.map);

let controlElevation = L.control.elevation(opts.elevationControl.options).addTo(map);
let controlLayer = L.control.layers(null, null, opts.layersControl.options);


controlElevation.load(opts.elevationControl.url);

controlElevation.on('eledata_loaded', ({layer, name}) => controlLayer.addTo(map) && layer.eachLayer((trkseg) => trkseg.feature.geometry.type != "Point" && controlLayer.addOverlay(trkseg, trkseg.feature && trkseg.feature.properties && trkseg.feature.properties.name || name)));

//controlElevation.load(opts.elevationControl.url);