import { InterType } from "../enums/InterType";
import { SliderInteraction } from "./SliderInteraction";
import { WheelInteraction } from "./WheelInteraction";
export class InteractionFactory {
    constructor(_interactionType, _renderer, _camera, _neuralNetwork, _raycaster, _scene, _lablerenderer) {
        this._interactionHandler = this.buildInteractionHandler(_interactionType, _renderer, _camera, _neuralNetwork, _raycaster, _scene, _lablerenderer);
    }
    get interactionHandler() {
        return this._interactionHandler;
    }
    buildInteractionHandler(_interactionType, _renderer, _camera, _neuralNetwork, _raycaster, _scene, _lablerenderer) {
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
//# sourceMappingURL=InteractionFactory.js.map