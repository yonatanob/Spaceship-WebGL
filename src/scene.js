import { OrbitControls } from "./OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function degrees_to_radians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}

let materials = [];
let Colors = {
  white: 0xffffff,
  darkRed: 0xd25138,
  lightRed: 0xbf5139,
  grey: 0xd9d1b9,
  battleShipGrey: 0x313131,
  babyBlueish: 0x1fceff,
};
/**************************  cylinder ***********************/
const cylinderRadiusTop = 4;
const cylinderRadiusBottom = 4;
const cylinderHeight = 12;
const cylinderRadialSegments = 12;
const cylinderGeometry = new THREE.CylinderGeometry(
  cylinderRadiusTop,
  cylinderRadiusBottom,
  cylinderHeight,
  cylinderRadialSegments
);
const cylinderMaterial = new THREE.MeshPhongMaterial({
  color: Colors.battleShipGrey,
});

const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

const cylinderTranslate = new THREE.Matrix4();
cylinderTranslate.makeTranslation(50, 0, 0);
cylinder.applyMatrix4(cylinderTranslate);
/**************************  cylinder ***********************/

/**************************  cone ***********************/
const coneRadius = 4;
const coneHeight = 12;
const coneRadialSegments = 12;
const coneGeometry = new THREE.ConeGeometry(
  coneRadius,
  coneHeight,
  coneRadialSegments
);
const coneMaterial = new THREE.MeshPhongMaterial({
  color: Colors.darkRed,
});
const cone = new THREE.Mesh(coneGeometry, coneMaterial);
const coneTranslate = new THREE.Matrix4();
coneTranslate.makeTranslation(50, 12, 0);
cone.applyMatrix4(coneTranslate);

/**************************  cone ***********************/

/**************************  lights ***********************/

scene.add(new THREE.AmbientLight(Colors.white, 0.1));
scene.add(new THREE.DirectionalLight(Colors.white, 0.8));
var light = new THREE.PointLight(Colors.white, 1);
camera.add(light);
scene.add(camera);

/**************************  lights ***********************/

/**************************  fring ***********************/
const fringInnerRadius = 1.5;
const fringOuterRadius = 2;
const fringThetaSegments = 18;
const fringGeometry = new THREE.RingGeometry(
  fringInnerRadius,
  fringOuterRadius,
  fringThetaSegments
);

const fringMaterial = new THREE.MeshPhongMaterial({
  color: Colors.babyBlueish,
  side: THREE.DoubleSide,
});

const fring = new THREE.Mesh(fringGeometry, fringMaterial);

const fringTranslate = new THREE.Matrix4();
fringTranslate.makeTranslation(0, 3, 4);
fring.applyMatrix4(fringTranslate);

/**************************  fring ***********************/
/**************************  sring ***********************/
const sringInnerRadius = 1.5;
const sringOuterRadius = 2;
const sringThetaSegments = 18;
const sringGeometry = new THREE.RingGeometry(
  sringInnerRadius,
  sringOuterRadius,
  sringThetaSegments
);

const sringMaterial = new THREE.MeshPhongMaterial({
  color: Colors.babyBlueish,
  side: THREE.DoubleSide,
});

const sring = new THREE.Mesh(sringGeometry, sringMaterial);
const sringTranslate = new THREE.Matrix4();
sringTranslate.makeTranslation(0, -3, 4);
sring.applyMatrix4(sringTranslate);
/**************************  sring ***********************/

/**************************  wings ***********************/
let geowingShape = new THREE.Shape();
let x = 0,
  y = 0;

geowingShape.moveTo(x, y);
geowingShape.lineTo(x, y + 100);
geowingShape.lineTo(x + 20, y + 10);
geowingShape.lineTo(x + 20, y - 10);
geowingShape.lineTo(x, y);

let finExtrudeSettings = {
  amount: 8,
  bevelEnabled: true,
  bevelSegments: 2,
  steps: 2,
  bevelSize: 1,
  bevelThickness: 1,
};

let geoWing = new THREE.ExtrudeGeometry(geowingShape, finExtrudeSettings);

let wingMaterial = new THREE.MeshPhongMaterial({
  color: Colors.lightRed,
});

let scale = 0.1;

let wing1 = new THREE.Mesh(geoWing, wingMaterial);
let wing2 = new THREE.Mesh(geoWing, wingMaterial);
let wing3 = new THREE.Mesh(geoWing, wingMaterial);

const wingsTranslate = new THREE.Matrix4();
wingsTranslate.makeTranslation(4, -8, 0);
wing1.applyMatrix4(wingsTranslate);
wing2.applyMatrix4(wingsTranslate);
wing3.applyMatrix4(wingsTranslate);

wing1.scale.set(scale, scale, scale);
wing2.scale.set(scale, scale, scale);
wing3.scale.set(scale, scale, scale);

let wing2Rotate = new THREE.Matrix4();
wing2Rotate.makeRotationY(degrees_to_radians(120));
wing2.applyMatrix4(wing2Rotate);

let wing3Rotate = new THREE.Matrix4();
wing3Rotate.makeRotationY(degrees_to_radians(200));
wing3.applyMatrix4(wing3Rotate);

/**************************  wings ***********************/

/*********  sphere ********/

const sphereRadius = coneRadius * 5;
const sphereHeight = (coneHeight + cylinderHeight) * 5;
const sphereRadialSegment = coneRadialSegments * 5;
const sphereGeometry = new THREE.SphereGeometry(
  sphereRadius,
  sphereHeight,
  sphereRadialSegment
);
const sphereMaterial = new THREE.MeshPhongMaterial({
  color: Colors.grey,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

const sphereTranslate = new THREE.Matrix4();
sphereTranslate.makeTranslation(-20, 0, 0);
sphere.applyMatrix4(sphereTranslate);
/*********  sphere ********/

/**************************  add to scene ***********************/
materials.push(cylinderMaterial);
materials.push(coneMaterial);
materials.push(fringMaterial);
materials.push(sringMaterial);
materials.push(sphereMaterial);
materials.push(wingMaterial);

const spaceship = new THREE.Group();
cylinder.add(fring);
cylinder.add(sring);
cylinder.add(wing1);
cylinder.add(wing2);
cylinder.add(wing3);

spaceship.add(cylinder);
spaceship.add(cone);

sphere.add(spaceship);
scene.add(sphere);

/**************************  add to scene ***********************/

const cameraTranslate = new THREE.Matrix4();
cameraTranslate.makeTranslation(50, 0, 50); // sets the camera origin
camera.applyMatrix4(cameraTranslate);

renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);

let isOrbitEnabled = true;

const toggleOrbit = (e) => {
  if (e.key == "o") {
    isOrbitEnabled = !isOrbitEnabled;
  }
};
const toggleWireframe = (e) => {
  s;
  if (e.key == "w") {
    if (materials[0].wireframe === false) {
      materials.forEach((element) => {
        element.wireframe = true;
      });
    } else {
      materials.forEach((element) => {
        element.wireframe = false;
      });
    }
  }
};

/***************** animation **********/

const rot = new THREE.Matrix4().makeRotationAxis(
  new THREE.Vector3(0, 1, 0),
  Math.PI / 2
);

let state1 = false;
const moveZ = (e) => {
  if (e.key == "1") {
    state1 = !state1;
  }
};

let state2 = false;
const moveY = (e) => {
  if (e.key == "2") {
    state2 = !state2;
  }
};

let state3 = false;
const moveYExtandRadius = (e) => {
  if (e.key == "3") {
    state3 = !state3;
  }
};

/***************** animation **********/

document.addEventListener("keydown", toggleOrbit);
document.addEventListener("keydown", toggleWireframe);
document.addEventListener("keydown", moveZ);
document.addEventListener("keydown", moveY);
document.addEventListener("keydown", moveYExtandRadius);

//controls.update() must be called after any manual changes to the camera's transform
controls.update();

function animate() {
  requestAnimationFrame(animate);
  if (state1) {
    spaceship.applyMatrix4(rot.makeRotationZ(degrees_to_radians(1)));
  }

  if (state2) {
    spaceship.applyMatrix4(rot.makeRotationY(degrees_to_radians(1)));
  }
  if (state3) {
    const xAbs = Math.abs(spaceship.position.x);
    const yAbs = Math.abs(spaceship.position.y);
    const zAbs = Math.abs(spaceship.position.z);
    const currMax = Math.max(xAbs, yAbs, zAbs);
    let trans;
    function isEqualsCurrToMax(dimVal) {
      return dimVal === currMax;
    }

    const xArr = [0.5, 0, 0];
    const yArr = [0, 0.5, 0];
    const zArr = [0, 0, 0.5];

    if (isEqualsCurrToMax(xAbs)) {
      if (spaceship.position.x < 0) {
        trans = xArr.map((e) => -e);
      } else {
        trans = xArr;
      }
    } else if (isEqualsCurrToMax(yAbs)) {
      if (spaceship.position.y < 0) {
        trans = yArr.map((e) => -e);
      } else {
        trans = yArr;
      }
    } else {
      if (spaceship.position.z < 0) {
        trans = zArr.map((e) => -e);
      } else {
        trans = zArr;
      }
    }
    const incOrbitRadius = new THREE.Matrix4();
    incOrbitRadius.makeTranslation(...trans);
    spaceship.applyMatrix4(incOrbitRadius);
  }

  controls.enabled = isOrbitEnabled;
  controls.update();

  renderer.render(scene, camera);
}
animate();
