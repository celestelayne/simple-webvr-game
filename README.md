## Intro to WebVR with A-Frame

A hands-on workshop on how to how to build a simple WebVR game application using [A-Frame](https://aframe.io/docs/0.9.0/introduction/) (an easy to use and open source virtual reality web framework). In the interest of time, this workshop will focus on setting up a basic interaction.

#### What is A-Frame?

WebVR is a JavaScript API that allows VR experiences to run in a web browser on VR headsets, mobile phones and tablets, and regular computers. 

Technically, A-Frame is an abstraction of three.js, a JavaScript library that uses the WebGL API to render 3D graphics in the browser.

A-Frame is a web framework for building virtual reality (VR) experiences for the web. At its simplest, It is an HTML web page that includes the A-Frame library, making it simple to get started.

#### Getting Started

First, create a new directory called `aframe-tutorial`

```bash
$ mkdir aframe-tutorial
```

Change into the directory and run git init and npm init, respectively.

```bash
$ cd aframe-tutorial

$ git init
$ npm init --yes
```

> Note: The first command initializes an empty Git repository and the second walks you through creating a package.json file.

#### Create an HTML Structure

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>A-Frame Demo</title>
  <!-- aframe CDN -->
  <script src="https://aframe.io/releases/0.9.2/aframe.min.js"></script>
</head>
<body>
  <!-- HTML goes here -->
</body>
</html>
```

In the `public/index.html` file, start by creating a simple HTML document with basic head and body tags. Then, include the CDN `<script>` in the `<head>` tag.

#### Create a Scene

In A-Frame, scenes are enclosed in `<a-scene></a-scene>` tags. It's what creates the stage for you to place 3D objects in, initializes the camera, the WebGL renderer and handles other boilerplate. It should be the outermost element wrapping everything else inside it.

Let's create an empty scene by adding an `<a-scene>` element inside the `<body>` element:

```html
<body>
    <a-scene></a-scene>
</body>
```

#### Add a Background

###### Using Color 

Every scene needs a background which can be a color or 360° image. In A-Frame, it’s represented by the `<a-sky>` primitive. A background with a simple color looks like the following:

```html
<body>
    <a-scene>
	<a-sky color="#A6CFE2"></a-sky>
    </a-scene>
</body>
```

The floor is represented by the `<a-plane>` primitive. You can give it a few attributes like color, width, and rotation. In order to make the plane parallel to the ground or make a plane the ground itself, it must be rotated around the X-axis.

```
<a-plane
  rotation="-90 0 0"
  color="#52430e"
  height="20"
  width="100">
</a-plane>
```

###### Using 360° Images

Background images should be equirectangular and can be found in abundance on [Flickr](https://www.flickr.com/groups/equirectangular/):

```html
 <a-scene>
    <a-assets>
     <img id="city" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg">
    </a-assets>
    <a-sky src="#city"></a-sky>
</a-scene>
```

> Take note of A-Frame’s [asset management system](https://aframe.io/docs/0.9.0/core/asset-management-system.html), `<a-assets>` used to preload images, videos, sound and 3D models.

#### Populate the Environment

###### Geometries

```
<a-entity
  id='ball'
  position="0.05 1 -5"
  animation="property: position; to: 0.25 1.5 0.5; dur: 5000; easing: linear"
  position="0 1 -4"
  material="color:green;"
  geometry="primitive:sphere; radius: 0.05;">
</a-entity>
```


###### 3D Models

For characters in the game, we are going to use a 3D model created in [SketchFab](https://sketchfab.com/search?q=pacman&sort_by=-pertinence&type=models). A-Frame uses the [glTF format](https://aframe.io/docs/0.9.0/components/gltf-model.html). We can load a glTF model by pointing to an asset that specifies the src for the file:

```html
<a-scene>
  <a-assets>
    <a-asset-item id="model-name" src="/path/to/model-name.gltf"></a-asset-item>
  </a-assets>

  <a-entity gltf-model="#model-name"></a-entity>
</a-scene>
```
First, let’s download the model from [Google Poly](https://poly.google.com/). Create an `assets/models` folder and add the downloaded models into it. For this exercise, I've chosen avocado.

Preload the models using the `<a-asset-item>` tag and then add it to the assets section of your code base: 

```html
<a-scene>
  <a-assets>
    <a-asset-item id="avocado" src="./assets/models/Avocado/Avocado.gltf"></a-asset-item>
  </a-assets>

  <a-entity gltf-model="#avocado"></a-entity>
</a-scene>
```
Outside the a-assets section, create several entities to load the avocado model:

```html
<a-entity 
  class="item" 
  cursor-listener 
  gltf-model="#avocado" 
  position="0.05 1 -1" 
  scale="2 2 2">
</a-entity>
```
The additional attributes available on our entity -- position, which sets x, y, and z coordinates on each entity; scale, which sets blah; and the gltf-model, which loads the model into the frame -- allow us to customize the placement etc of each extity/avocado.

#### Add Interactivity

We can make the avocado respond to clicks by creating a custom component. The cursor component provides hover and click states for interaction.

###### Cursor Listener

Create a folder `assets/components` and add a new file, `cursor-listener.js`, with the following code:

```
AFRAME.registerComponent('cursor-listener', {
  init: function () {
    let el = this.el;
    el.addEventListener('click', evt => {
      if (el.parentNode.hasChildNodes()){
        console.log('I was clicked', el);
        el.parentNode.removeChild(el);
      }
    })
  }
});
```
We're going to be using a JavaScript method called [hasChildNodes()](https://developer.mozilla.org/en-US/docs/Web/API/Node/hasChildNodes). It's a method that returns a Boolean value indicating whether the given Node has child nodes or not.

When you click on the parentNode, the [removeChild()](https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild) method removes the avocado from the DOM. We're setting up the functionality of the Component so that, when the cursor is placed over the avocado and clicked, it is removed form the DOM.

###### Raycaster

This feature casts a 'ray' between the origin (cursor) and the object you're trying to interact with for N distance. And every entity that falls along this 'ray' get removed from the DOM. 

The cursor component depends on the raycaster and adds events/states to act like a cursor.

By default with autoRefresh set to true, the raycaster component will automatically refresh this list when it detects entities or components are added and removed from the DOM.

```
AFRAME.registerComponent('raycaster-autorefresh', {
    init: function () {
        const el = this.el;
        this.el.addEventListener('model-loaded', function () {
          console.log('the raycaster')
            const cursorEl = el.querySelector('[raycaster]');
            cursorEl.components.raycaster.refreshObjects();
        });
    }
});
```
A-Frame will call `.refreshObjects()` automatically when an entity is appended or detached from the scene, but it will not get called during normal DOM mutations (e.g., some entity changes its class).

In order to use these two components, we have to include them in the head section of the index.html:

```html
<script src="assets/components/cursor-listener.js"></script>
<script src="assets/components/raycaster-autorefresh.js"></script>
```
THen add it to the `<a-scene>` tag:

```
<a-scene raycaster-autorefresh >
```

#### Specify a Camera

Add a camera to the scene with default origin at `0 1.6 0` in desktop mode and `0 0 0` in VR mode. This roughly corresponds to the average eye height of most humans.  

```
<a-camera position="0 1.6 0">
  <a-cursor></a-cursor>
</a-camera>
```

> Notice the `<a-cursor>` inside of the camera. This will draw a little circular cursor, which is important for displays that don’t have controllers, such as [Google cardboard](https://vr.google.com/cardboard/).

#### Animation

We can animate an entity by placing the animation attribute on the entity you want to animate and passing it several properties -- [duration](https://aframe.io/docs/0.9.0/components/animation.html#api_dur), [easing](https://aframe.io/docs/0.9.0/components/animation.html#easings), and position.

###### Translate the Avocado

```
<a-entity
  ...
  position="0.05 1 -5"
  animation="property: position; to: 0.25 1.5 0.5; dur: 5000; easing: linear">
</a-entity>
```
- Duration -- indicates how long (in milliseconds) each cycle of the animation is.
- Easing -- defines how you want the entity to move/or what pattern do you want your animation to follow. In this case the easing is “linear”, which makes the animation constant in its movement.
- Loop -- defines how many times the animation should repeat. If the value is true, the animation will repeat infinitely.

###### Rotate the Avocado

In this animation, we want the avocado to rotate at 360° in the y axis, so we define the `to` attribute to that value.

```
<a-entity
  ...
  rotation="0 0 0" 
  animation="property: rotation; to: 0 360 0; loop: true; dur: 10000">
</a-entity>
```
- Loop -- indicates how many times the animation should repeat. If the value is true, the animation will repeat infinitely.
- Property -- identifies the property to animate. It can be a component name, or a plain attribute.

#### Adding Audio _(Optional)_

To add sound to the scene, a good resource is [freesound.org](https://freesound.org/browse/) or from a CDN. When adding sound, like images you musy preload and cache the audio tag within the asset management system: 

```
<audio id="crickets" src="https://cdn.aframe.io/basic-guide/audio/backgroundnoise.wav" autoplay preload></audio>
```
Then, add the sound component to one of the entities in the scene:

```
<a-entity sound="src: #crickets"></a-entity>
```