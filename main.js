console.log('HELLO WORLD!')

//scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, window.innerWidth / innerHeight, 0.1, 1000);

//var cameraControllsFirstPerson.lookSpeed = 0.05;
//var cameraControllsFirstPerson.movementSpeed = 10;

var renderer = new THREE.WebGLRenderer();

var controls = new OrbitControls(camera, renderer.domElement);

//color pallete
var black = "rgb(0,0,0)";
var green = "rgb(10, 200, 10)";
var red = "rgb(255, 0, 0)";
var white = "rgb(255,255,255)";
var blue = "rgb(110, 197, 233)";
var yellow = "rgb(252,244,163)";

var fogEffect = 1;


renderer.setClearColor(white);

//access the window height and width attribute, entire window
renderer.setSize(window.innerWidth, window.innerHeight);

//X, Y, Z lines in three different colors (X - red, Y - green, Z - blue)
var axes = new THREE.AxesHelper(30);
scene.add(axes);

//plane
//Mesh is the term for the 3D object
var planeGeometry = new THREE.PlaneGeometry(70, 30, 1, 1);
var planeMaterial = new THREE.MeshBasicMaterial({ color: green });
var plane = new THREE.Mesh(planeGeometry);
//var plane = new THREE.Mesh( 
//    new THREE.PlaneGeometry(70, 30, 1, 1)
//);
plane.rotation.x = -0.5 * Math.PI;
scene.add(plane);

//cube
var cubeGeometry = new THREE.CubeGeometry(6, 6, 6);
var cubeMaterial = new THREE.MeshLambertMaterial({ color: red });
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
//cube.rotation.x = -0.5 * Math.PI;
cube.position.x = -10;
cube.position.y = 3;
scene.add(cube);

//sphere
var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
var sphereMaterial = new THREE.MeshLambertMaterial({ color: red, wireframe: false });
var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.x = 10;
sphere.position.y = 4;
scene.add(sphere);

//cylinder
var cylinderGeometry = new THREE.CylinderGeometry(2, 2, 20);
var cylinderMaterial = new THREE.MeshLambertMaterial({ wireframe: false });
var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
cylinder.position.x = 0;
cylinder.position.y = 10;
scene.add(cylinder);

//pyramide
var pyramidGeometry = new THREE.CylinderGeometry(2, 6, 20);
var pyramidMaterial = new THREE.MeshLambertMaterial({ wireframe: false });
var pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
pyramid.position.x = 25;
pyramid.position.y = 10;
scene.add(pyramid);

//donut
var donutGeometry = new THREE.TorusGeometry(3, 2);
var donutMaterial = new THREE.MeshLambertMaterial({ wireframe: false });
var donut = new THREE.Mesh(donutGeometry, donutMaterial);
donut.position.x = -25;
donut.position.y = 3;
scene.add(donut);

if (fogEffect)
{
    //1000 - no fog
    scene.fog = new THREE.Fog(0xffffff, 5, 120)
}

//spot light
var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40, 60, 40);
scene.add(spotLight);


//set the camera bcs axes are in the center, but camera does not
camera.position.x = 50;
camera.position.y = 50;
camera.position.z = 50;
camera.lookAt(scene.position);

var step = 0;
function renderScene() {
    //make updates to position, rotation of objects in the scene
    step += 0.01;

    donut.rotation.y += 0.05;
    cube.rotation.y -= 0.1;
    pyramid.rotation.y += 0.08;

    camera.position.x = 60 * Math.cos(step);
    camera.position.z = 60 * Math.sin(step);
    camera.lookAt(scene.position);

    requestAnimationFrame(renderScene);
    renderer.render(scene, camera);

}

//controls.update() must be called after any manual changes to the camera's transform
//camera.position.set(0, 20, 100);
//controls.update();

//function animate() {

//    requestAnimationFrame(animate);

//    // required if controls.enableDamping or controls.autoRotate are set to true
//    controls.update();

//    renderer.render(scene, camera);

//}

//function render() {
//    renderer.render(scene, camera);
//}

$("#our_threejs_animation").append(renderer.domElement);
//renderer.render(scene, camera);
renderScene()