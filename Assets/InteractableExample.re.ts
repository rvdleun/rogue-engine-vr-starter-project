import * as RE from 'rogue-engine';
import XRInputSource from './XRInputSource.re';
import { Color, Mesh, MeshStandardMaterial, Object3D } from 'three';

export default class InteractableExample extends RE.Component {
  gripping: Object3D | null = null;

  /**
   * At the start, this component will go through every available XRInputSource and have it listen to the right events to interact.
   */
  start() {
    XRInputSource.sources.forEach(xrInputSource => {
      xrInputSource?.addEventListener('selectstart', (e) => this.onSelectStart(e));
      xrInputSource?.addEventListener('squeezeend', (e) => this.onSqueezeEnd(e));
      xrInputSource?.addEventListener('squeezestart', (e) => this.onSqueezeStart(e));
    });
  }

  /**
   * The private gripping variable contains which controller is holding the object and will copy its position and rotation.
   */
  update() {
    if (!this.gripping) {
      return;
    }

    this.object3d.position.copy(this.gripping.position);
    this.object3d.rotation.copy(this.gripping.rotation);
  }

  /**
   * When the user presses the select button on his controller, it will fire off this event. If the user is close enough to interact, the color of the material will be changed.
   */
  onSelectStart({ target }) {
    if(!this.canInteract(target)) {
      return;
    }

    const color = `#${100000 + Math.floor(899999 * Math.random())}`;
    ((this.object3d as Mesh).material as MeshStandardMaterial).color = new Color(color);
  }

  /**
   * When the user releases the grip button, we check if this one was holding the object. If it was, we release it.
   */
  onSqueezeEnd({ target }) {
    if (target !== this.gripping) {
      return;
    }

    this.gripping = null;
  }

  /**
   * When the user presses the grip button, we check if the controller is close enough to the object. If so, we store
   * the target locally, so that the update function can copy its transform.
   * @param target
   */
  onSqueezeStart({ target }) {
    if(!this.canInteract(target) || this.gripping) {
      return;
    }

    this.gripping = target;
  }

  /**
   * This function will determine if the controller can interact with the object by calculating the distance between it
   * and this object. If it's below 0.25, the user is allowed to interact.
   */
  private canInteract(target: Object3D) {
    return target.position.distanceTo(this.object3d.position) < .25;
  }
}

RE.registerComponent(InteractableExample);
