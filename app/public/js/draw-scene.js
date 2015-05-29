(function () {

    window.drawScene = drawScene;

    function drawScene(objects, config) {

        var camera = getCamera(config.cameraConfig);

        return render('#container',
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

        camera.position.z = 300;

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

        var renderer = new THREE.WebGLRenderer();

        renderer.setSize(sizeConfig.x, sizeConfig.y);
        renderer.render(scene, camera);

        var domElem = $(containerSelector).append(renderer.domElement);

        cameraControls  = new THREE.OrbitControls(camera, domElem[0]);

        return {
            renderer: renderer,
            scene: scene,
            camera: camera,
            domElem: domElem,
            cameraControls: cameraControls
        }

    }




})();