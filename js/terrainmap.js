require([
    "esri/config",
    "esri/Map",
    "esri/views/SceneView"
], function (esriConfig, Map, SceneView) {

    esriConfig.apiKey = "YOUR_API_KEY";

    const map = new Map({
        ground: "world-elevation",
        basemap: "arcgis-topographic"
    });

    const view = new SceneView({
        container: "viewDiv",
        map: map,
        qualityProfile: "high",
        camera: {
            position: [
                -118.80714018,
                33.96144206,
                1574.65501
            ],
            heading: 0.51,
            tilt: 78.99
        }
    });

});