import * as THREE from "three";
import { InteractionHandler } from "./InteractionHandler";
import { WeigthLabel } from "./WeightLable";
export class WheelInteraction extends InteractionHandler {
    constructor(_camera, _renderer, _raycaster, _scene, _neuralNetwork, _lablerenderer) {
        super(_camera, _renderer, _lablerenderer);
        this.mouse = new THREE.Vector2;
        this.selectedObjectsParent = null;
        this.raycaster = _raycaster;
        this.scene = _scene;
        this.neuralNetwork = _neuralNetwork;
        this.lablerenderer.domElement.addEventListener('click', this.onClick.bind(this));
        let counter = 0;
        counter = counter + this.includeLablesOnLayer(this.neuralNetwork.weight1, counter);
        this.includeLablesOnLayer(this.neuralNetwork.weight2, counter);
    }
    //TODO: Check Neurons and change states of them
    onClick(event) {
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouse, this.camera);
        var intersects = this.raycaster.intersectObject(this.scene, true);
        if (intersects.length > 0) {
            if (this.selectedObjectsParent != null) {
                this.selectedObjectsParent.children[0].material.color.set(this.selectedObjectsParent.layerType.valueOf());
            }
            this.selectedObjectsParent = intersects[0].object.parent;
            intersects[0].object.material.color.set(0x00ff00);
            this.hideAllLines();
            this.showLines(this.selectedObjectsParent);
        }
        else {
            if (this.selectedObjectsParent != null) {
                this.selectedObjectsParent.children[0].material.color.set(this.selectedObjectsParent.layerType.valueOf());
            }
            this.selectedObjectsParent = null;
            this.showAllLines();
        }
    }
    includeLablesOnLayer(weight, _counter) {
        let counter = _counter;
        for (let index1 = 0; index1 < weight.length; index1++) {
            for (let index2 = 0; index2 < weight[index1].length; index2++) {
                this.includeLableOnLine(this.neuralNetwork.allLines[counter], weight[index1][index2]);
                counter++;
            }
        }
        return counter;
    }
    includeLableOnLine(line, weight) {
        line.geometry.computeBoundingSphere();
        let center = line.geometry.boundingSphere?.center;
        if (center != undefined) {
            let lable = new WeigthLabel(center, weight);
            line.add(lable.createCSS2DObj());
        }
    }
    hideAllLines() {
        this.neuralNetwork.allLines.map(line => { line.visible = false; line.children[0].visible = false; });
    }
    showAllLines() {
        this.neuralNetwork.allLines.map(line => { line.visible = true; line.children[0].visible = false; });
        this.neuralNetwork.allLines.map(line => { line.visible = true; line.children[0].visible = false; });
    }
    showLines(neuron) {
        neuron.weightLines.map(x => { x.visible = true, x.children[0].visible = true; });
    }
}
//# sourceMappingURL=WheelInteraction.js.map