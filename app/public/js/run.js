
(function () {

    /**
     * Main loop
     */

    var CONFIG = {
        size: {
            x: 800,
            y: 400,
        },
        cameraConfig: {
            viewAngle: 45,
            aspect: 4/3,
            near: 0.1,
            far: 10000
        }
    }

    var adsMesh = marchingCubes([64,64,64], function(t, z, x) {
        return - t*t - x*x + z*z - 100
    }, [[-151,-151,-151], [151,151,151]]);

    var dsMesh = marchingCubes([64,64,64], function(t, z, x) {
        return - t*t + x*x + z*z - 100
    }, [[-151,-151,-151], [151,151,151]])


    var dsScene = initScene('#ads-container', [
        sceneObjectFactory.getSurfaceMesh(adsMesh),
        sceneObjectFactory.getAmbientLight()
    ], CONFIG);

    var adsScene = initScene('#ds-container', [
        sceneObjectFactory.getSurfaceMesh(dsMesh),
        sceneObjectFactory.getAmbientLight()
    ], CONFIG);

    animate(adsScene);
    animate(dsScene);

    function animate(scene) {
        requestAnimationFrame(function () {
            animate(scene);
        });
        render(scene);
    }

    function render(scene) {
        scene.cameraControls.update();
        scene.renderer.render(
            scene.scene,
            scene.camera
        );
    }

})();