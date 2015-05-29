(function () {

    window.sceneObjectFactory = {
        getSurfaceMesh: getSurfaceMesh,
        getCircleMesh: getCircleMesh,
        getAmbientLight: getAmbientLight
    }


    /**
     * Surface is object:
     *
     * {
     *     positions: array
     *     cells: array
     * }
     *
     */

    function getSurfaceMesh(surface) {

        var geometry = new THREE.Geometry();

        updateGeometry(geometry, surface);
        geometry.verticesNeedUpdate = true;
        geometry.elementsNeedUpdate = true;
        geometry.normalsNeedUpdate = true;

        return new THREE.Mesh(geometry, new THREE.MeshNormalMaterial());

    }

    function updateGeometry(geometry, surface) {
        /**
         * Add vertices
         */

        for (var vertexIdx = 0; vertexIdx < surface.positions.length; vertexIdx++) {

            var vertexPos = surface.positions[vertexIdx];
            geometry.vertices.push(
                new THREE.Vector3(vertexPos[0], vertexPos[1], vertexPos[2])
            );

        }

        /**
         * Add faces
         */

        for(var faceIdx = 0; faceIdx < surface.cells.length; faceIdx++) {
            var faceCell = surface.cells[faceIdx];
            geometry.faces.push(
                new THREE.Face3(faceCell[0], faceCell[1], faceCell[2])
            );
        }
    }

    function getCircleMesh() {

        return new THREE.Mesh(

            new THREE.SphereGeometry(
                50,
                16,
                16.1
            ),

            new THREE.MeshNormalMaterial()
        );
    }

    function getAmbientLight() {

        return new THREE.AmbientLight(0xffffff);

    }

})();