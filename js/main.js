
let mylocale = {
    "Total Length: ": "L: ",
    "Max Elevation: ": "E Max: ",
    "Min Elevation: ": "E Min: ",
    "Avg Elevation: ": "E Avg: ",
    "Total Ascent: ": "A: ",
    "Total Descent: ": "D: ",
    "Min Slope: ": "S Min: ",
    "Max Slope: ": "S Max: ",
    "Avg Slope: ": "S Avg: ",
};

L.registerLocale('it', mylocale);
L.setLocale('it');

let opts = {
    map: {
        center: [41.4583, 12.7059],
        zoom: 5,
        fullscreenControl: false,
        resizerControl: false,
        minimapControl: false,
        gestureHandling: false,
        preferCanvas: true,
        rotate: true,
        // bearing: 45,
        rotateControl: {
            closeOnZeroBearing: true
        },
    },
    elevationControl: {
        tracks: {
            track_1: {
                url: "data/elevation.geojson",
                color: "#3490dc"
            },
            track_2: {
                url: "data/highway_20.geojson",
                color: "#f6993f"
            },
            track_3: {
                url: "data/highway_75.geojson",
                color: "#f6993f"
            },
            track_4: {
                url: "data/highway_80.geojson",
                color: "#f6993f"
            },
        },
        options: {
            position: "bottomleft",
            collapsed: false,
            detached: true,
            slope: true,
            edgeScale: true
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
let controlLayer = L.control.layers(null, null, opts.layersControl.options).addTo(map);

let tracks = opts.elevationControl.tracks;
let i = 0;

let layers = L.layerGroup();

for (let track in tracks) {
    loadTrace(tracks[track].url, i++);
}

layers.on('tracks_loaded', () => console.dir("Tracks Loaded: ", layers.getLayers()));

function loadTrace(url, i) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            let layer = L.geoJson(data);
            layers.addLayer(layer);
            controlLayer.addBaseLayer(layer, data.name || url.split('/').pop());
            if (i == 0) initHooks(layer._leaflet_id);
            else if (i == Object.values(tracks).length - 1) layers.fire('tracks_loaded');
        });
}

function setElevationTrace(id) {
    let layer = layers.getLayer(id);
    let data = layer.toGeoJSON();
    data.features = data.features.filter(f => f.geometry.type != "Point");
    if (!map.hasLayer(layer)) layer.addTo(map);
    controlElevation.clear();
    controlElevation.addData(data, layer);
    map.fitBounds(layer.getBounds());
}

function initHooks(id) {
    setElevationTrace(id);
    map.on("baselayerchange", function(e) {
        let layer = layers.getLayer(e.layer._leaflet_id);
        if (layer) setElevationTrace(layer._leaflet_id);
    });
}

