## Intro to WebVR with A-Frame

A hands-on workshop on how to create WebVR applications using [A-Frame]() (an easy to use and open source virtual reality web framework). Participants will work on a live coding project using A-Frame to learn the basics.

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
  <script src="https://aframe.io/releases/0.9.1/aframe.min.js"></script>
</head>
<body>
  <!-- HTML goes here -->
</body>
</html>
```

In the `public/index.html` file, start by creating a simple HTML document with basic head and body tags.

#### Create a Scene

In A-Frame, scenes are enclosed in `<a-scene></a-scene>` tags. It's what creates the stage for you to place 3D objects in, initializes the camera, the WebGL renderer and handles other boilerplate. It should be the outermost element wrapping everything else inside it.

Let's create an empty scene by adding an `<a-scene>` element inside the `<body>` element:

```html
<body>
    <a-scene></a-scene>
</body>
```

#### Add a Background

Every scene needs a background which can be a color or 360° image. In A-Frame, it’s represented by the `<a-sky>` primitive. A background with a simple color looks like the following:

```html
<body>
    <a-scene>
	<a-sky color="#A6CFE2"></a-sky>
    </a-scene>
</body>
```

Background images should be equirectangular and can be found in abundance on Flickr:

```html
 <a-scene>
    <a-assets>
     <img id="city" src="https://cdn.aframe.io/360-image-gallery-boilerplate/img/city.jpg">
    </a-assets>
    <a-sky src="#city"></a-sky>
</a-scene>
```

Take note of A-Frame’s asset management system, `<a-assets>` used to preload images, videos, sound and 3D models.

#### Populate the Environment

For characters in the game, we are going to use a 3D model created in SketchFab. A-Frame uses the glTF format. We can load a glTF model by pointing to an asset that specifies the src for the file:

```html
<a-scene>
  <a-assets>
    <a-asset-item id="ghost" src="/path/to/ghost.gltf"></a-asset-item>
  </a-assets>

  <a-entity gltf-model="#ghost"></a-entity>
</a-scene>
```

#### Automatically Populate the Environment

Let's automate the process of creating avocados.

###### Creating a new avocado 

###### Choosing a random position for each avocado

###### Generate a random number