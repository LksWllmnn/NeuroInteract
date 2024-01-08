import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
import { InterType } from "../enums/InterType";
import { NeuralNetwork } from "../NetworkStuff/Model"
import { InteractionHandler } from "./InteractionHandler";
import { SliderInteraction } from "./SliderInteraction";
import { WheelInteraction } from "./WheelInteraction";

export class InteractionFactory {
    private _interactionHandler: InteractionHandler;
    public get interactionHandler(): InteractionHandler {
        return this._interactionHandler;
    }


    constructor(_interactionType: InterType, _renderer: THREE.Renderer, _camera: THREE.PerspectiveCamera, _neuralNetwork: NeuralNetwork, _raycaster: THREE.Raycaster, _scene:THREE.Scene, _lablerenderer: CSS2DRenderer) {
        this._interactionHandler = this.buildInteractionHandler(_interactionType, _renderer, _camera, _neuralNetwork, _raycaster, _scene, _lablerenderer)
    }

    buildInteractionHandler(
        _interactionType: InterType, 
        _renderer: THREE.Renderer,
        _camera: THREE.PerspectiveCamera, 
        _neuralNetwork: NeuralNetwork,
        _raycaster: THREE.Raycaster,
        _scene: THREE.Scene,
        _lablerenderer: CSS2DRenderer): InteractionHandler
         
    {
        switch (_interactionType) {
            case InterType.Slider:
                return new SliderInteraction(_camera, _renderer, _lablerenderer, _neuralNetwork);
            case InterType.Wheel:
                return new WheelInteraction(_camera, _renderer, _raycaster, _scene, _neuralNetwork, _lablerenderer);
            default:
                return new SliderInteraction(_camera, _renderer, _lablerenderer, _neuralNetwork);
        }
    }
}