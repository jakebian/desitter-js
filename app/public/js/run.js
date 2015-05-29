
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

    var mesh = marchingCubes([64,64,64], function(x,y,z) {
      return x*x + y*y + z*z - 100
    })


    var sceneElements = drawScene([
        sceneObjectFactory.getCircleMesh(),
        sceneObjectFactory.getSurfaceMesh(mesh),
        sceneObjectFactory.getAmbientLight()
    ], CONFIG);

    animate();

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        sceneElements.cameraControls.update();
        sceneElements.renderer.render(
            sceneElements.scene,
            sceneElements.camera
        );
    }

    console.log(mesh)

})();