import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
export class IOLables {
    constructor(_camera, _renderer, _scene, _tfModel) {
        this.out1 = 0;
        this.out2 = 0;
        this.scene = _scene;
        this.tfModel = _tfModel;
        this.selectVillageElement = document.getElementById("villageSelect");
        if (this.selectVillageElement)
            this.selectVillageElement.addEventListener("change", this.changeVillage.bind(this));
        this.selectPriceElement = document.getElementById("priceInput");
        if (this.selectPriceElement)
            this.selectPriceElement.addEventListener("change", this.changePrice.bind(this));
        this.selectRoomsElement = document.getElementById("roomsInput");
        if (this.selectRoomsElement)
            this.selectRoomsElement.addEventListener("change", this.changeRooms.bind(this));
        this.outputLabel(0);
        this.outputLabel(1);
        this.inputVillageShower = this.inputLable(0);
        this.inputRoomsShower = this.inputLable(1);
        this.inputPriceShower = this.inputLable(2);
    }
    changeVillage(event) {
        let select = event.target;
        if (this.inputVillageShower) {
            this.inputVillageShower.innerText = "Ort: " + select.value;
        }
    }
    changePrice(event) {
        let input = event.target;
        if (this.inputPriceShower) {
            this.inputPriceShower.innerText = "Price: " + input.value + "€";
        }
    }
    changeRooms(event) {
        let input = event.target;
        if (this.inputRoomsShower) {
            this.inputRoomsShower.innerText = "Rooms: " + input.value;
        }
    }
    inputLable(pos) {
        let html = document.createElement("div");
        html.style.backgroundColor = 'white';
        html.style.color = "black";
        html.className = 'outLable';
        if (pos == 0)
            html.textContent = "Ort: " + this.selectVillageElement.value;
        if (pos == 1)
            html.textContent = "Zimmer: " + this.selectRoomsElement.placeholder;
        if (pos == 2)
            html.textContent = "Preis: " + this.selectPriceElement.placeholder + "€";
        const neuronLabel = new CSS2DObject(html);
        var midpoint = new THREE.Vector3();
        if (pos == 0)
            neuronLabel.position.set(-5, 3, 0);
        if (pos == 1)
            neuronLabel.position.set(-5, 0, 0);
        if (pos == 2)
            neuronLabel.position.set(-5, -3, 0);
        neuronLabel.scale.set(1, 1, 0);
        neuronLabel.layers.enable(1);
        neuronLabel.visible = true;
        this.scene.add(neuronLabel);
        return html;
    }
    outputLabel(pos) {
        let html = document.createElement('div');
        html.style.backgroundColor = 'white';
        html.style.color = "black";
        html.className = 'outLable';
        if (pos == 0)
            html.textContent = "Wahr: " + 0;
        else
            html.textContent = "Falsch: " + 1;
        const neuronLabel = new CSS2DObject(html);
        var midpoint = new THREE.Vector3();
        if (pos == 0)
            neuronLabel.position.set(5, -1, 0);
        else
            neuronLabel.position.set(5, 1, 0);
        neuronLabel.scale.set(1, 1, 0);
        neuronLabel.layers.enable(1);
        neuronLabel.visible = true;
        this.scene.add(neuronLabel);
    }
}
//# sourceMappingURL=InputOutputLables.js.map