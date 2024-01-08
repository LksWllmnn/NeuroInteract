import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";

export class InteractionHandler {
   public _camera: THREE.PerspectiveCamera;
   
   private _renderer: THREE.Renderer;

   private _lablerenderer: CSS2DRenderer;
   
   public get camera(): THREE.PerspectiveCamera {
      return this._camera;
   }
   public get renderer(): THREE.Renderer {
      return this._renderer;
   }
   public get lablerenderer(): CSS2DRenderer {
    return this._lablerenderer;
    }

   constructor(_camera: THREE.PerspectiveCamera, _renderer: THREE.Renderer, _lablerenderer: CSS2DRenderer) {
      this._camera = _camera;
      this._renderer = _renderer;
      this._lablerenderer = _lablerenderer;
      window.addEventListener('resize', this.onWindowResize.bind(this), false);
   }
    
   onWindowResize(): void {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this._lablerenderer.setSize(window.innerWidth, window.innerHeight);
   }
}