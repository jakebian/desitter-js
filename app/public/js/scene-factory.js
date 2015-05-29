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

        var surfaceMesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({transparent: true, opacity: 0.8 }));
        surfaceMesh.doubleSided = true;
        return surfaceMesh;
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
            if(faceCell.length === 3) {
                geometry.faces.push(new THREE.Face3(faceCell[0], faceCell[1], faceCell[2]));
            } else if(faceCell.length === 4) {
                geometry.faces.push(new THREE.Face4(faceCell[0], faceCell[1], faceCell[2], faceCell[3]));
            }
        }

        /**
         * Normals
         */
        var cb = new THREE.Vector3(), ab = new THREE.Vector3();
        for (var i=0; i < geometry.faces.length; ++i) {
          var f = geometry.faces[i];
          var vA = geometry.vertices[f.a];
          var vB = geometry.vertices[f.b];
          var vC = geometry.vertices[f.c];
          cb.subVectors(vC, vB);
          ab.subVectors(vA, vB);
          cb.cross(ab);
          cb.normalize();
          if (surface.cells[i].length == 3) {
            f.normal.copy(cb)
            continue;
          }

          // quad
          if (cb.isZero()) {
            // broken normal in the first triangle, let's use the second triangle
            var vA = geometry.vertices[f.a];
            var vB = geometry.vertices[f.c];
            var vC = geometry.vertices[f.d];
            cb.subVectors(vC, vB);
            ab.subVectors(vA, vB);
            cb.cross(ab);
            cb.normalize();
          }
          f.normal.copy(cb);
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