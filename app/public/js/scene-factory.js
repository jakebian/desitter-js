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

        /**
         * Geometry initialization
         */

        var geometry = new THREE.Geometry();

        addSurfaceToGeometry(geometry, surface);

        geometry.verticesNeedUpdate = true;
        geometry.elementsNeedUpdate = true;
        geometry.normalsNeedUpdate = true;

        /**
         * Mesh initialization
         */

        var surfaceMesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({transparent: true, opacity: 0.8 }));
        surfaceMesh.doubleSided = true;

        return surfaceMesh;
    }

    function addSurfaceToGeometry(geometry, surface) {

        surface.positions.forEach(addVertexToGeometry);
        surface.cells.forEach(addFaceToGeometry);
        geometry.faces.forEach(setFaceNormal);


        function addVertexToGeometry(vertexPos) {
            geometry.vertices.push(
                new THREE.Vector3(vertexPos[0], vertexPos[1], vertexPos[2])
            );
        }

        function addFaceToGeometry(faceCell) {
            geometry.faces.push(
                new THREE.Face3(faceCell[0], faceCell[1], faceCell[2])
            );
        }

        function setFaceNormal(face) {

            var vertices = {
                A: geometry.vertices[face.a],
                B: geometry.vertices[face.b],
                C: geometry.vertices[face.c]
            }

            var edgeCB = new THREE.Vector3();
            edgeCB.subVectors(vertices.C, vertices.B);

            var edgeAB = new THREE.Vector3();
            edgeAB.subVectors(vertices.A, vertices.B);

            var normal = new THREE.Vector3();
            normal.crossVectors(edgeCB, edgeAB);
            normal.normalize();

            face.normal.copy(normal)
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