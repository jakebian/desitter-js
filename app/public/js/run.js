
(function () {

    /**
     * Main loop
     */

    var CONFIG = {

        size: {
            x: window.innerWidth,
            y: window.innerHeight,
        },

        cameraConfig: {
            viewAngle: 45,
            aspect: 4/3,
            near: 0.1,
            far: 10000
        }
    }


    var mousePointGeometry = new THREE.SphereGeometry( 5, 32, 32 );
    mousePointGeometry.dynamic = true;
    var material = new THREE.MeshBasicMaterial( {color: 0x555555} );
    var mousePoint = new THREE.Mesh(mousePointGeometry, material );
    mousePoint.position.z = 0;

    var adsMesh = marchingCubes([64,64,64], function(t, z, x) {
        return - t*t - x*x + z*z - 100
    }, [[-151,-151,-151], [151,151,151]]);

    var dsMesh = marchingCubes([64,64,64], function(t, z, x) {
        return - t*t + x*x + z*z - 100
    }, [[-151,-151,-151], [151,151,151]])

    var adsMesh = sceneObjectFactory.getSurfaceMesh(adsMesh);

    var dsScene = initScene('#ads-container', [
        adsMesh,
        mousePoint,
        sceneObjectFactory.getAmbientLight()
    ], CONFIG);

    var adsScene = initScene('#ds-container', [
        sceneObjectFactory.getSurfaceMesh(dsMesh),
        sceneObjectFactory.getAmbientLight()
    ], CONFIG);

    var raycaster = new THREE.Raycaster();
    var mousePos = new THREE.Vector2();

    animate(adsScene);
    animate(dsScene);

    window.addEventListener( 'mousemove', setMousePosFromEvt, false );

    function animate(scene) {
        requestAnimationFrame(function () {
            animate(scene);
        });
        render(scene);
    }

    function render(sceneObj) {

        raycaster.setFromCamera( mousePos, sceneObj.camera );
        var intersects = raycaster.intersectObjects([adsMesh]);

        if (intersects[0]) {
            var intersectionPoint = intersects[0].point;
            mousePoint.position.x = intersectionPoint.x;
            mousePoint.position.y = intersectionPoint.y;
        }

        for ( var i = 0; i < intersects.length; i++ ) {
            // intersects[i].object.material.visible = false;
        }

        sceneObj.cameraControls.update();
        sceneObj.renderer.render(
            sceneObj.scene,
            sceneObj.camera
        );
    }

    function setMousePosFromEvt(event) {
        mousePos.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mousePos.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }


})();