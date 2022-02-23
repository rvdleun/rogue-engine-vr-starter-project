import * as RE from 'rogue-engine';
import XRInputSource from './XRInputSource.re';
import { Color, Mesh, MeshStandardMaterial, Object3D } from 'three';

export default class InteractableExample extends RE.Component {
  gripping: Object3D | null = null;

  start() {
    XRInputSource.sources.forEach(xrInputSource => {
      xrInputSource?.addEventListener('selectstart', (e) => this.onSelectStart(e));
      xrInputSource?.addEventListener('squeezeend', (e) => this.onSqueezeEnd(e));
      xrInputSource?.addEventListener('squeezestart', (e) => this.onSqueezeStart(e));
    });
  }

  update() {
    if (!this.gripping) {
      return;
    }

    this.object3d.position.copy(this.gripping.position);
    this.object3d.rotation.copy(this.gripping.rotation);
  }

  onSelectStart({ target }) {
    if(!this.canInteract(target)) {
      return;
    }

    const color = `#${100000 + Math.floor(899999 * Math.random())}`;
    ((this.object3d as Mesh).material as MeshStandardMaterial).color = new Color(color);
  }

  onSqueezeEnd({ target }) {
    if (target !== this.gripping) {
      return;
    }

    this.gripping = null;
  }

  onSqueezeStart({ target }) {
    if(!this.canInteract(target) || this.gripping) {
      return;
    }

    this.gripping = target;
  }

  private canInteract(target: Object3D) {
    console.log(target.position.distanceTo(this.object3d.position), target);
    return target.position.distanceTo(this.object3d.position) < .25;
  }
}

RE.registerComponent(InteractableExample);
