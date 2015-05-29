(function () {

    window.sceneObjectFactory = {
        getCircleMesh: getCircleMesh,
        getPointLight: getPointLight
    }

    /**
     * Objects in scene
     */

    function getCircleMesh() {

        return new THREE.Mesh(

            new THREE.SphereGeometry(
                50,
                16,
                16
            ),

            new THREE.MeshLambertMaterial({
               color: 0xCC0000
            })
        );
    }

    function getPointLight() {

        var pointLight = new THREE.PointLight(0xFFFFFF);

        // set its position
        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 130;

        return pointLight;

    }

})();