export class InteractionHandler {
    constructor(_camera, _renderer, _lablerenderer) {
        this._camera = _camera;
        this._renderer = _renderer;
        this._lablerenderer = _lablerenderer;
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }
    get camera() {
        return this._camera;
    }
    get renderer() {
        return this._renderer;
    }
    get lablerenderer() {
        return this._lablerenderer;
    }
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this._lablerenderer.setSize(window.innerWidth, window.innerHeight);
    }
}
//# sourceMappingURL=InteractionHandler.js.map