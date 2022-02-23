import * as RE from 'rogue-engine';
import XRInputSource from './XRInputSource.re';

export default class InteractableExample extends RE.Component {
  start() {
    XRInputSource.sources.forEach(xrInputSource => {
      xrInputSource?.addEventListener('selectstart', (e) => this.onSelectStart(e));
      xrInputSource?.addEventListener('squeezeend', (e) => this.onSqueezeEnd(e));
      xrInputSource?.addEventListener('squeezestart', (e) => this.onSqueezeStart(e));
    })
    this.onSelectStart('test')
  }

  onSelectStart(e) {
    console.log('TEST', e);
  }

  onSqueezeEnd(e) {
    console.log('TEST', e);
  }

  onSqueezeStart(e) {
    console.log('TEST', e);
  }
}

RE.registerComponent(InteractableExample);
