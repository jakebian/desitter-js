(function () {

    window.initScene = initScene;

    function initScene(containerSelector, objects, config) {

        var camera = getCamera(config.cameraConfig);

        return render(containerSelector,
            getScene(objects.concat([camera])),
            camera,
            config.size
        );
    }

    function getCamera(cameraConfig) {

        var camera = new THREE.PerspectiveCamera(
            cameraConfig.viewAngle,
            cameraConfig.aspect,
            cameraConfig.near,
            cameraConfig.far
        );

        camera.position.z = 200;

        return camera;
    }

    function getScene(objects) {

        var scene = new THREE.Scene();

        objects.forEach(addObjectToScene);

        return scene;

        function addObjectToScene(object) {
            scene.add(object);
        }

    }

    function render(containerSelector, scene, camera, sizeConfig) {

        var renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        renderer.setSize(sizeConfig.x, sizeConfig.y);
        renderer.setClearColor( 0xFFFFFF, 1 );

        renderer.render(scene, camera);

        var domElem = $(containerSelector).append(renderer.domElement);

        cameraControls  = new THREE.TrackballControls(camera, domElem[0]);

        return {
            renderer: renderer,
            scene: scene,
            camera: camera,
            domElem: domElem,
            cameraControls: cameraControls
        }

    }




})();