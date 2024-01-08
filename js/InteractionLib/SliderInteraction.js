import { InteractionHandler } from "./InteractionHandler";
export class SliderInteraction extends InteractionHandler {
    constructor(_camera, _renderer, _labelRenderer, _neuralNetwork) {
        super(_camera, _renderer, _labelRenderer);
        this.weightPresenter = null;
        this.slider = null;
        this.selectedWeight = null;
        let weightsContainer = this.createContainer();
        let weightMatrixContainer1 = this.weightMatrixContainer(weightsContainer);
        let weightMatrixContainer2 = this.weightMatrixContainer(weightsContainer);
        this.neuralNetwork = _neuralNetwork;
        this.createDivsForArray(weightMatrixContainer1, this.neuralNetwork.weight1, 0);
        this.createDivsForArray(weightMatrixContainer2, this.neuralNetwork.weight2, 1);
    }
    createContainer() {
        let container = document.createElement("div");
        container.style.position = "absolute";
        container.style.bottom = "0px";
        container.style.right = "0px";
        container.style.width = "300px";
        container.id = "weightsContainer";
        container.style.backgroundColor = "red";
        document.body.appendChild(container);
        let header = document.createElement("div");
        header.style.display = "flex";
        this.weightPresenter = document.createElement("div");
        this.weightPresenter.innerText = "???";
        this.weightPresenter.style.width = "30px";
        header.appendChild(this.weightPresenter);
        this.slider = document.createElement("input");
        this.slider.type = "range";
        this.slider.min = "0";
        this.slider.max = "5";
        this.slider.step = "0.01";
        this.slider.addEventListener("input", (event) => this.changeWeight(event));
        header.appendChild(this.slider);
        container.appendChild(header);
        return container;
    }
    weightMatrixContainer(weightsContainer) {
        let weightMatrixContainer = document.createElement("div");
        weightMatrixContainer.style.width = "290px";
        weightMatrixContainer.style.height = "80px";
        weightMatrixContainer.style.margin = "5px";
        weightMatrixContainer.style.backgroundColor = "blue";
        weightMatrixContainer.style.display = "flex";
        weightMatrixContainer.style.justifyContent = "space-between";
        weightMatrixContainer.style.alignItems = "center";
        weightsContainer.appendChild(weightMatrixContainer);
        return weightMatrixContainer;
    }
    createDivsForArray(container, array, arrayIndex) {
        for (let i = 0; i < array.length; i++) {
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
            for (let j = 0; j < array[i].length; j++) {
                const numberDiv = document.createElement('div');
                numberDiv.textContent = "" + parseFloat(array[i][j].toFixed(2));
                ;
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
    hoverWeight(event) {
        let target = event.target;
        if (target != this.selectedWeight)
            target.style.backgroundColor = "yellow";
    }
    exitWeight(event) {
        let target = event.target;
        if (target != this.selectedWeight)
            target.style.backgroundColor = "gray";
    }
    selectWeight(event) {
        if (this.selectedWeight != event.target && this.selectedWeight != null)
            this.selectedWeight.style.backgroundColor = "gray";
        this.selectedWeight = event.target;
        this.selectedWeight.style.backgroundColor = "orange";
        if (this.slider != null && this.selectedWeight.textContent != null)
            this.slider.value = this.selectedWeight.textContent;
        if (this.weightPresenter != null)
            this.weightPresenter.textContent = this.selectedWeight.textContent;
        this.hideAllLines();
        let parts = this.selectedWeight.id.split("|");
        this.showLines(this.getNeuron(+parts[0], +parts[1]));
    }
    getNeuron(_layerID, _neuronID) {
        switch (_layerID) {
            case 0: return this.neuralNetwork.inputLayerNeurons[_neuronID];
            case 1: return this.neuralNetwork.hiddenLayerNeurons[_neuronID];
            default: return this.neuralNetwork.inputLayerNeurons[_neuronID];
        }
    }
    changeWeight(event) {
        let target = event.target;
        if (this.selectedWeight)
            this.selectedWeight.textContent = target.value;
        if (this.weightPresenter)
            this.weightPresenter.textContent = target.value;
        let parts = target.id.split("|");
        switch (parts[0]) {
            case "0":
                this.neuralNetwork.weight1[+parts[1]][+parts[2]] = +target.value;
                break;
            case "1":
                this.neuralNetwork.weight2[+parts[1]][+parts[2]] = +target.value;
                break;
        }
    }
    hideAllLines() {
        this.neuralNetwork.allLines.map(line => { line.visible = false; });
    }
    showAllLines() {
        this.neuralNetwork.allLines.map(line => { line.visible = true; });
        this.neuralNetwork.allLines.map(line => { line.visible = true; });
    }
    showLines(neuron) {
        neuron.weightLines.map(x => { x.visible = true; });
    }
}
//# sourceMappingURL=SliderInteraction.js.map