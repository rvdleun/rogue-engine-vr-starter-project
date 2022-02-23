import { fetchProfile, MotionController } from '@webxr-input-profiles/motion-controllers';
import * as RE from 'rogue-engine';
import { Prop, Runtime } from 'rogue-engine';
import { Group } from 'three/src/objects/Group';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class XRInputSource extends RE.Component {
  public static sources: XRInputSource[] = [];

  @Prop("Select")
  private hand: string;

  @Prop("Boolean")
  private showControllerModel: boolean = true;

  private assetPath: string = 'https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles';
  private controller: Group;
  private events: { event: string, func: Function }[] = [];
  private grip: Group;

  get handOptions() {
    return ['left', 'right'];
  }

  awake() {
    XRInputSource.sources.push(this);

    const { renderer } = Runtime;
    const controllerId = this.hand === '1' ? 1 : 0;
    renderer.xr.getController(controllerId);
    renderer.xr.getControllerGrip(controllerId);
  }

  update() {
    if (!this.controller) {
      this.detectController();
    }
  }

  async detectController() {
    const { renderer } = Runtime;
    const session = renderer.xr.getSession();

    if (!session) {
      return;
    }

    const { inputSources } = session;
    if (!inputSources) {
      return;
    }

    const handedness = this.hand === '1' ? 'right' : 'left';
    let controllerId: number = -1;
    for (let id in inputSources) {
      if (inputSources[id].handedness === handedness) {
        controllerId = parseInt(id);
      }
    }

    if (controllerId === -1) {
      return;
    }

    const xrInputSource = inputSources[controllerId];
    this.controller = renderer.xr.getController(controllerId);
    this.grip = renderer.xr.getControllerGrip(controllerId);
    this.object3d.parent?.add(this.grip);
    this.grip.add(this.object3d);

    this.events.forEach(({ event, func }) => this.addEventListener(event, func));

    if (!this.showControllerModel) {
      return;
    }

    const { assetPath } = await fetchProfile(xrInputSource, this.assetPath);
    if (!assetPath) {
      return;
    }

    const loader = new GLTFLoader();
    loader.load(assetPath, (gltf) => {
      this.object3d.add( gltf.scene );
    });
  }

  addEventListener(event: string, func) {
    if (!this.controller) {
      this.events.push({ event, func });
      return;
    }

    this.controller.addEventListener(event, func);
  }
}

RE.registerComponent(XRInputSource);
