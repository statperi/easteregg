window.onload = () => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (currentLocation) {
            var data = {
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude
            };

            setCoordinates(data, 100); // set coordinates 100 meters away

            let model = Model();
            model.location = data;
            createEntity(model);
        });
    } else {
        alert("Sorry, your browser does not support HTML5 geolocation.");
    }

};

var Model = () => {
    return {
        code: 'easter egg',
        url: './assets/easter_egg_2019/scene.gltf',
        rotation: '0 0 0',
        scale: '50 50 50',
        position: '0 0 0',
        gestureConfig: 'minScale: 0.5; maxScale: 10',
        info: 'Easter Egg'
    }
}

function createEntity(model, autoscale) {
    let scene = document.querySelector('a-scene');

    let entityEl = createEntityElement(model);
    scene.appendChild(entityEl);
}

function createEntityElement(config) {
    let element = document.createElement('a-entity');
    element.setAttribute('scale', config.scale);
    //element.setAttribute('rotation', config.rotation);
    element.setAttribute('position', config.position);

    element.setAttribute('gltf-model', config.url);
    element.setAttribute('info', config.info);
    element.setAttribute('animation-mixer', config.animation ? config.animation : '');
    element.setAttribute('success', 'false');
    element.setAttribute('gps-entity-place', `latitude: ${config.location.latitude}; longitude: ${config.location.longitude};`);

    if (config.gestureConfig) {
        element.setAttribute('gesture-handler', config.gestureConfig);
        element.classList.add('clickable');
    }

    return element;
}


function setCoordinates(data, offset) {
    let R = 6378137;
    let Pi = 3.14159265;

    var dLat = offset / R;
    var dLon = offset / (R * Math_cos(Pi * data.latitude / 180));

    data.latitude = data.latitude + dLat * 180 / Pi;
    data.longitude = data.longitude + dLon * 180 / Pi;
}
