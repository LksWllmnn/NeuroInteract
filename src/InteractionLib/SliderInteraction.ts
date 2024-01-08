import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import { InteractionHandler } from "./InteractionHandler";
import { NeuralNetwork } from "../main";
import { SyntheticNeuron } from "../NetworkStuff/SyntheticNeuron";

export class SliderInteraction extends InteractionHandler {
    weightPresenter: HTMLDivElement| null = null;
    slider: HTMLInputElement| null = null;
    selectedWeight: HTMLDivElement | null = null;
    neuralNetwork: NeuralNetwork;
    

    constructor(_camera: THREE.PerspectiveCamera, _renderer: THREE.Renderer, _labelRenderer: CSS2DRenderer, _neuralNetwork: NeuralNetwork) {
        super(_camera, _renderer, _labelRenderer);
        let weightsContainer = this.createContainer();
        let weightMatrixContainer1 = this.weightMatrixContainer(weightsContainer);
        let weightMatrixContainer2 = this.weightMatrixContainer(weightsContainer);
        this.neuralNetwork = _neuralNetwork;
        this.createDivsForArray(weightMatrixContainer1, this.neuralNetwork.weight1, 0);
        this.createDivsForArray(weightMatrixContainer2, this.neuralNetwork.weight2, 1);
    }

    createContainer(): HTMLDivElement {
        let container: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        container.style.position = "absolute";
        container.style.bottom = "0px";
        container.style.right = "0px";
        container.style.width ="300px";
        container.id = "weightsContainer";
        container.style.backgroundColor = "red";
        document.body.appendChild(container);

        let header: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        header.style.display = "flex";
        this.weightPresenter = <HTMLDivElement>document.createElement("div");
        this.weightPresenter.innerText = "???"
        this.weightPresenter.style.width = "30px";
        header.appendChild(this.weightPresenter);
        this.slider = <HTMLInputElement>document.createElement("input");
        this.slider.type = "range";
        this.slider.min = "0";
        this.slider.max = "5";
        this.slider.step = "0.01";
        this.slider.addEventListener("input", (event: Event) => this.changeWeight(event as InputEvent))
        header.appendChild(this.slider);
        container.appendChild(header);

        return container;
    }

    weightMatrixContainer(weightsContainer: HTMLDivElement): HTMLDivElement {
        let weightMatrixContainer: HTMLDivElement = <HTMLDivElement>document.createElement("div");
        weightMatrixContainer.style.width ="290px";
        weightMatrixContainer.style.height = "80px";
        weightMatrixContainer.style.margin = "5px";
        weightMatrixContainer.style.backgroundColor = "blue";
        weightMatrixContainer.style.display = "flex";
        weightMatrixContainer.style.justifyContent = "space-between";
        weightMatrixContainer.style.alignItems = "center";
        weightsContainer.appendChild(weightMatrixContainer);
        return weightMatrixContainer;
    }

    createDivsForArray(container: HTMLElement, array: number[][], arrayIndex: number): void {
        for (let i = 0; i < array.length; i++) {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
            for (let j = 0; j < array[i].length; j++) {
                const numberDiv = document.createElement('div');
                numberDiv.textContent = "" + parseFloat(array[i][j].toFixed(2));;
                numberDiv.classList.add('number');
                numberDiv.style.margin = "2px";
                numberDiv.id = `${arrayIndex}|${i}|${j}`;
                numberDiv.style.backgroundColor = "gray";
                numberDiv.addEventListener("mouseenter", this.hoverWeight.bind(this));
                numberDiv.addEventListener("mouseleave", this.exitWeight.bind(this));
                numberDiv.addEventListener("click", this.selectWeight.bind(this));
                rowDiv.appendChild(numberDiv);
            }
            container.appendChild(rowDiv);
        }
    }

    hoverWeight(event: MouseEvent): void {
        let target = <HTMLDivElement>event.target;
        if(target != this.selectedWeight) target.style.backgroundColor = "yellow";
    }

    exitWeight(event: MouseEvent): void {
        let target = <HTMLDivElement>event.target;
        if(target != this.selectedWeight) target.style.backgroundColor = "gray";
    }

    selectWeight(event: MouseEvent): void {
        if (this.selectedWeight != event.target && this.selectedWeight != null) this.selectedWeight.style.backgroundColor = "gray";
        this.selectedWeight = <HTMLDivElement>event.target;
        this.selectedWeight.style.backgroundColor = "orange";
        if(this.slider != null && this.selectedWeight.textContent != null)this.slider.value = this.selectedWeight.textContent;
        if(this.weightPresenter != null) this.weightPresenter.textContent = this.selectedWeight.textContent;
        this.hideAllLines();
        let parts: string[] = this.selectedWeight.id.split("|");
        this.showLines(this.getNeuron(+parts[0], +parts[1]));
    }

    getNeuron(_layerID: number, _neuronID: number): SyntheticNeuron {
        switch(_layerID) {
            case 0: return this.neuralNetwork.inputLayerNeurons[_neuronID];
            case 1: return this.neuralNetwork.hiddenLayerNeurons[_neuronID];
            default: return this.neuralNetwork.inputLayerNeurons[_neuronID];
        }
    }
    
    changeWeight(event: InputEvent): void {
        let target: HTMLInputElement = <HTMLInputElement>event.target;
        if(this.selectedWeight)this.selectedWeight.textContent = target.value;
        if(this.weightPresenter)this.weightPresenter.textContent = target.value;

        let parts: string[] = target.id.split("|");
        switch(parts[0]) {
            case "0": this.neuralNetwork.weight1[+parts[1]][+parts[2]] = +target.value;
                break;
            case "1": this.neuralNetwork.weight2[+parts[1]][+parts[2]] = +target.value;
            break;
        }
    }

    hideAllLines() {
        this.neuralNetwork.allLines.map(line=>{line.visible=false});
    }

    showAllLines() {
        this.neuralNetwork.allLines.map(line=>{line.visible=true});
        this.neuralNetwork.allLines.map(line=>{line.visible=true});
    }

    showLines(neuron: SyntheticNeuron) {
        neuron.weightLines.map(x=>{x.visible=true});
    }
}