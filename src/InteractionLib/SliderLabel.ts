// import { SliderInteraction } from "./SliderInteraction";

// export class SliderLabel {
//     weight2DIndex: number; //index whitch weight matrix is the paren
//     layerIndex: number; //index which layer is selected
//     neuronIndex: number; //index to which neuron the weight is going

//     htmlElement: HTMLDivElement | null = null;

//     sliderInteraction: SliderInteraction;

//     constructor(_weight2Dindex: number, _layerIndex: number, _neuronIndex: number, _htmlElement: HTMLDivElement, _sliderInteraction: SliderInteraction) {
//         this.weight2DIndex = _weight2Dindex;
//         this.layerIndex = _layerIndex;
//         this.neuronIndex = _neuronIndex;
//         this.htmlElement = _htmlElement;
//         this.sliderInteraction = _sliderInteraction;
//     }

//     hoverWeight(event: MouseEvent): void {
//         let target = <HTMLDivElement>event.target;
//         if(target != this.sliderInteraction.selectedWeight) target.style.backgroundColor = "yellow";
//     }

//     exitWeight(event: MouseEvent): void {
//         let target = <HTMLDivElement>event.target;
//         if(target != this.sliderInteraction.selectedWeight) target.style.backgroundColor = "gray";
//     }

//     selectWeight(event: MouseEvent): void {
//         console.log(this.sliderInteraction.selectedWeight);
//         if (this.sliderInteraction.selectedWeight != event.target && this.sliderInteraction.selectedWeight != null) this.sliderInteraction.selectedWeight.style.backgroundColor = "gray";
//         this.sliderInteraction.selectedWeight = <HTMLDivElement>event.target;
//         this.sliderInteraction.selectedWeight.style.backgroundColor = "orange";
//         if(this.sliderInteraction.slider != null && this.sliderInteraction.selectedWeight.textContent != null)this.sliderInteraction.slider.value = this.sliderInteraction.selectedWeight.textContent;
//         if(this.sliderInteraction.weightPresenter != null) this.sliderInteraction.weightPresenter.textContent = this.sliderInteraction.selectedWeight.textContent;
//     }
// }