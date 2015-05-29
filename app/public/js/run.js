(function () {

    /**
     * Main loop
     */

    var CONFIG = {
        size: {
            x: 400,
            y: 300,
        },
        cameraConfig: {
            viewAngle: 45,
            aspect: 4/3,
            near: 0.1,
            far: 10000
        }
    }

    drawScene([
        sceneObjectFactory.getCircleMesh(),
        sceneObjectFactory.getPointLight()
    ], CONFIG);

})();