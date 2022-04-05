window.onload = () => {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (currentLocation) {
            //var data = {
            //    latitude: currentLocation.coords.latitude,
            //    longitude: currentLocation.coords.longitude
            //};

            var data = { latitude: 53.3014227, longitude: -6.1777447 };

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
        scale: '25 25 25',
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

    else if (config.gestureConfig) {
        element.setAttribute('gesture-handler', config.gestureConfig);
        element.classList.add('clickable');
    }

    return element;
}

