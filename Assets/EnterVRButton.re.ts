import * as RE from 'rogue-engine';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';

export default class EnterVRButton extends RE.Component {
  awake() {
    const { renderer } = RE.Runtime;

    renderer.xr.enabled = true;
    const button = VRButton.createButton( renderer );

    // In case you want to customise the button, uncomment the following code and add your changes in the setTimeout function.
    //
    // setTimeout(() => {
    //   button.style.backgroundColor = 'red';
    //
    //   // Disable the button's changing styl when hovering over it
    //   button.onmouseenter = function () {  };
    //   button.onmouseleave = function () {  };

    //   // Add your own logic when the user clicks on the button.0
    //   button.addEventListener('click', () => {
    //   });    
    // });

    document.body.appendChild(button);
  }
}

RE.registerComponent(EnterVRButton);
