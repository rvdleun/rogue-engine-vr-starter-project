# Rogue Engine VR Starter Project
This repository aims to give a developer a quick start on developing WebXR experiences, using [Rogue Engine](rogueengine.io). It contains a scene with you can grab the sphere by gripping your controller, and changing its color by selecting it.

# To start
* Download [Rogue Engine](https://rogueengine.io/download/).
* Clone this repository or download it as a ZIP.
* Run `npm install` to get all the dependencies.
* Start Rogue Engine, open this project and navigate to `Example.rogueScene`.

# Tips
* Use a browser while developing your experience. You won't be able to try out VR in the editor.
* Install the [WebXR Emulator extension](https://github.com/MozillaReality/WebXR-emulator-extension) to test before wearing your headset.
* Attach the camera and controllers as children to an Object3D. This will allow you to move the player around.
* Make sure that `https://` is enabled in Rogue Engine(in the upper-right, next to the IP) to allow the WebXR API to work when testing on a headset.


# Components

## EnterVRButton
This component adds an "Enter VR" button to your document to start the XR Experience. It will use the default camera that's active in the scene. More information can be found [here](https://threejs.org/docs/#manual/en/introduction/How-to-create-VR-content).

## XRInputSource
This component will copy the position and rotation from one of the controllers.

### Properties
| Name  | Type | Default | Description |
|-------|------|---------|-------------|
| hand  | 'left' 'right' | 'left' | Which controller to imitate |
| showControllerModel  | boolean | true  | Whether to add a 3D model of the controller via [webxr-input-profiles](https://github.com/immersive-web/webxr-input-profiles) |

### Usage
* Attach this component to an Object3D that will represent the user's left or right hand.
* You can listen to events from this controller by using the `addEventListener` function within the component. A number of available events can be found [here](https://developer.mozilla.org/en-US/docs/Web/API/XRSession#events).
* A public static array named `XRInputSource.sources` will contain all available inputs in the scene. You can use this to listen to events on all the controllers. See the [InteractableExample](./Assets/InteractableExample.re.ts) component for one way of doing this.
