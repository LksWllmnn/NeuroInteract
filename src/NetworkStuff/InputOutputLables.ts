import * as THREE from "three";
import { CSS2DObject} from "three/examples/jsm/renderers/CSS2DRenderer";
import { TFModel } from "./tfModel";


export class IOLables {
    public out1: number = 0;
    public out2: number = 0;
    private scene: THREE.Scene;

    public selectVillageElement: HTMLSelectElement;
    public selectRoomsElement: HTMLInputElement;
    public selectPriceElement: HTMLInputElement;

    private inputVillageShower: HTMLDivElement|undefined;
    private inputPriceShower: HTMLDivElement|undefined;
    private inputRoomsShower: HTMLDivElement|undefined;

    private tfModel: TFModel;

    constructor(_camera: THREE.PerspectiveCamera, _renderer: THREE.Renderer, _scene: THREE.Scene, _tfModel: TFModel) {
        this.scene = _scene;
        this.tfModel = _tfModel;

        this.selectVillageElement = <HTMLSelectElement>document.getElementById("villageSelect");
        if(this.selectVillageElement)this.selectVillageElement.addEventListener("change", this.changeVillage.bind(this))
        this.selectPriceElement = <HTMLInputElement>document.getElementById("priceInput");
        if(this.selectPriceElement)this.selectPriceElement.addEventListener("change", this.changePrice.bind(this))
        this.selectRoomsElement = <HTMLInputElement>document.getElementById("roomsInput");
        if(this.selectRoomsElement)this.selectRoomsElement.addEventListener("change", this.changeRooms.bind(this))

        this.outputLabel(0);
        this.outputLabel(1);

        this.inputVillageShower = this.inputLable(0);
        this.inputRoomsShower = this.inputLable(1);
        this.inputPriceShower = this.inputLable(2);
    }

    changeVillage(event: Event) {
        let select: HTMLSelectElement = <HTMLSelectElement>event.target
        if(this.inputVillageShower){
            this.inputVillageShower.innerText = "Ort: " + select.value;
        } 
    }
    changePrice(event: Event) {
        let input: HTMLInputElement = <HTMLInputElement>event.target
        if(this.inputPriceShower){
            this.inputPriceShower.innerText = "Price: " + input.value + "€";
        }
    }
    changeRooms(event: Event) {
        let input: HTMLInputElement = <HTMLInputElement>event.target
        if(this.inputRoomsShower){
            this.inputRoomsShower.innerText = "Rooms: " + input.value;
        }
    }

    inputLable(pos: number): HTMLDivElement {
        let html = document.createElement("div");
        html.style.backgroundColor = 'white';
        html.style.color = "black";
		html.className = 'outLable';

        if(pos == 0)html.textContent = "Ort: " + this.selectVillageElement.value;
        if(pos == 1)html.textContent = "Zimmer: " + this.selectRoomsElement.placeholder;
        if(pos == 2)html.textContent = "Preis: " + this.selectPriceElement.placeholder + "€";

        const neuronLabel = new CSS2DObject( html );
        var midpoint = new THREE.Vector3();
        if(pos == 0)neuronLabel.position.set(-5, 3, 0);
        if(pos == 1)neuronLabel.position.set(-5, 0, 0);
        if(pos == 2)neuronLabel.position.set(-5, -3, 0);
        neuronLabel.scale.set(1, 1, 0);
        neuronLabel.layers.enable(1);
        neuronLabel.visible = true;
        this.scene.add(neuronLabel);
        return html;
    }

    outputLabel(pos: number) {
        let html = document.createElement( 'div' );
        html.style.backgroundColor = 'white';
        html.style.color = "black";
		html.className = 'outLable';

        if(pos == 0)html.textContent = "Wahr: " + 0;
        else html.textContent = "Falsch: " + 1;

        const neuronLabel = new CSS2DObject( html );
        var midpoint = new THREE.Vector3();
        if(pos == 0)neuronLabel.position.set(5, -1, 0);
        else neuronLabel.position.set(5, 1, 0);
        neuronLabel.scale.set(1, 1, 0);
        neuronLabel.layers.enable(1);
        neuronLabel.visible = true;
        this.scene.add(neuronLabel);
    }
}