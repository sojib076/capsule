// Three JS Template
var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
}
var camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 1, 500 );
var scene = new THREE.Scene();
var capsula = new THREE.Object3D();

let setColorBg = 0x000000;
scene.fog = new THREE.Fog(setColorBg, 8, 12);
scene.background = new THREE.Color(setColorBg);
//--------------------------------------------------------------
//shading:THREE.FlatShading;
function createCapsula(scl = 1) {
  var capsuleItem = new THREE.Object3D();
  var geometry1 = new THREE.CylinderGeometry( 1, 1, scl, 25 );
  var geometry2 = new THREE.CylinderGeometry( 1, 1, scl, 25 );
  var circle1 = new THREE.IcosahedronGeometry(1, 3);
  var circle2 = new THREE.IcosahedronGeometry(1, 3);

  var material1 = new THREE.MeshPhysicalMaterial({color:0x404040  + mathRandom(10000)});
  var material2 = new THREE.MeshLambertMaterial({color:0xFFFFFF});
  var cylind1 = new THREE.Mesh(geometry1, material1);
  var cylind2 = new THREE.Mesh(geometry2, material2);
  var circle1 = new THREE.Mesh(circle1, material1);
  var circle2 = new THREE.Mesh(circle2, material2);

  let posy = cylind1.scale.y/2;

  circle1.position.y = posy+0.05;
  cylind1.add(circle1);
  circle2.position.y = -posy-0.05;
  cylind2.add(circle2);

  cylind1.position.y = cylind1.scale.y/2;
  cylind2.position.y = -cylind2.scale.y/2;

  capsuleItem.add(cylind1);
  capsuleItem.add(cylind2);
  
  return capsuleItem;
  
}
//---
function mathRandom(num = 3, angle = false) {
  if (angle) {
    var randomvalue = Math.random() * num * Math.PI / 180;
  } else {
    var randomvalue = -Math.random() * num + Math.random() * num;
  }
  return randomvalue;
}
//---
function init(num = 10000) {
  for (let i = 0; i<num; i++) {
    var myCapsula = new THREE.Object3D();
    myCapsula.add(createCapsula());
    myCapsula.position.set(mathRandom()*-2.5,mathRandom()*3,mathRandom()*4);
    
    myCapsula.rotation.z = mathRandom(190, true);
    myCapsula.rotation.x = mathRandom(180, true);
    
    let capScale = mathRandom(0.8);
    myCapsula.scale.set(capScale, capScale, capScale);
    
    capsula.add(myCapsula);
  }
}
//---
camera.position.set(0, 0, 10);

var ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.6);

var lightFront = new THREE.PointLight(0xFFFFFF, 0.4);
var lightBack = new THREE.PointLight(0xFFFFFF, 0.1);

lightFront.position.set(20,20,0);
lightBack.position.set(-20,-20,-20);

scene.add(lightFront);
scene.add(lightBack);
scene.add(ambientLight);
scene.add(capsula);

var gridHelper = new THREE.GridHelper( 20, 40);
gridHelper.position.set(0, 0, 0)
//scene.add( gridHelper );


var mouse = new THREE.Vector2();

function onMouseMove(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}
window.addEventListener('mousemove', onMouseMove, false);


function animate() {
  requestAnimationFrame(animate);
  capsula.rotation.x += 0.01;
  capsula.rotation.y += 0.015;
  capsula.rotation.z += 0.03;
  renderer.render( scene, camera );  
}
init(20);
animate();