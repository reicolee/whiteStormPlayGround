
const world = new WHS.World({
  stats: "fps", // fps, ms, mb or false if not need.

  gravity: { // Physic gravity.
      x: 0,
      y: 0,
      z: 0
  },

  camera: {
    position: [0,30,100]
  },

  rendering: {
    background: {
      color: 0x162129
    },

    renderer: {
      antialias: true
    }
  },

  container: document.body
});

const sphere = new WHS.Sphere({ // Create sphere comonent.
  geometry: {
    radius: 3,
    widthSegments: 32,
    heightSegments: 32
  },

  mass: 10, // Mass of physics object.

  material: {
    color: 0xF2F2F2,
    kind: 'lambert'
  },

  position: {
    x: 0,
    y: 5,
    z: 0
  }
});

const plane = new WHS.Plane({
  geometry: {
    width: 100,
    height: 100
  },

  mass: 0,

  material: {
    color: 0x447F8B,
    kind: 'phong'
  },

  rotation: {
    x: - Math.PI / 2
  }
});



new WHS.PointLight({
  light: {
    intensity: 0.5
  },

  shadowmap: {
    fov: 90
  },

  position: {
    z: 10,
    y: 10
  }
}).addTo(world);

new WHS.AmbientLight({
  light: {
    intensity: 0.5
  }
}).addTo(world);

sphere.addTo(world)
// sphere.setLinearVelocity({x: 10, y: 0, z: 0});
.then((sphere) => {
  const mx = 0,
    mz = 10;
//   // sphere.setAngularVelocity({x: mx, y: 0, z: mz});
  sphere.setLinearVelocity({x: mx, y: 0, z: mz});
});



// const mouse = new WHS.VirtualMouse(world);
// mouse.track(sphere);

// mouse.on('move', () => {
//   sphere.setLinearVelocity(mouse.project().sub(sphere.position));
// });

let line;
let box;
// this is with the box
function timerCall() {

    if (!previousPosition) {
        box = new WHS.Box({
                    geometry: {
                        height: 6,
                        width: 1,
                        depth: 1
                    },

                    mass: 0,

                    material: {
                        color: 0xFFDADA,
                        kind: 'phong',
                        rest: 0
                    },

                    position: {
                        x: 0,
                        y: 5,
                        z: -4
                    }
                })
          box.addTo(world);

    } else {
      if(sphere._native._physijs.linearVelocity.z > 0){
       box = new WHS.Box({
                    geometry: {
                        height: 6,
                        width: 1,
                        depth: 1
                    },

                    mass: 0,

                    material: {
                        color: 0xFFDADA,
                        kind: 'phong',
                        rest: 0
                    },

                    position: {
                        x: sphere._native.position._x,
                        y: sphere._native.position._y,
                        z: sphere._native.position._z - 4
                    }
                })
          box.addTo(world);
        }
        if(sphere._native._physijs.linearVelocity.z < 0){
           box = new WHS.Box({
                    geometry: {
                        height: 6,
                        width: 1,
                        depth: 1
                    },

                    mass: 0,

                    material: {
                        color: 0xFFDADA,
                        kind: 'phong',
                        rest: 0
                    },

                    position: {
                        x: sphere._native.position._x,
                        y: sphere._native.position._y,
                        z: sphere._native.position._z + 4
                    }
                })
          box.addTo(world);
        }
        if(sphere._native._physijs.linearVelocity.x > 0) {
          box = new WHS.Box({
                    geometry: {
                        height: 6,
                        width: 1,
                        depth: 1
                    },

                    mass: 0,

                    material: {
                        color: 0xFFDADA,
                        kind: 'phong',
                        rest: 0
                    },

                    position: {
                        x: sphere._native.position._x - 4,
                        y: sphere._native.position._y,
                        z: sphere._native.position._z
                    }
                })
          box.addTo(world);
        }
        if(sphere._native._physijs.linearVelocity.x < 0) {
          box = new WHS.Box({
                    geometry: {
                        height: 6,
                        width: 1,
                        depth: 1
                    },

                    mass: 0,

                    material: {
                        color: 0xFFDADA,
                        kind: 'phong',
                        rest: 0
                    },

                    position: {
                        x: sphere._native.position._x + 4,
                        y: sphere._native.position._y,
                        z: sphere._native.position._z
                    }
                })
          box.addTo(world);
        }
        if(sphere._native._physijs.linearVelocity.y > 0) {
          box = new WHS.Box({
                    geometry: {
                        height: 6,
                        width: 1,
                        depth: 1
                    },

                    mass: 0,

                    material: {
                        color: 0xFFDADA,
                        kind: 'phong',
                        rest: 0
                    },

                    position: {
                        x: sphere._native.position._x,
                        y: sphere._native.position._y - 4,
                        z: sphere._native.position._z
                    }
                })
          box.addTo(world);
        }
        if(sphere._native._physijs.linearVelocity.y < 0) {
          box = new WHS.Box({
                    geometry: {
                        height: 6,
                        width: 1,
                        depth: 1
                    },

                    mass: 0,

                    material: {
                        color: 0xFFDADA,
                        kind: 'phong',
                        rest: 0
                    },

                    position: {
                        x: sphere._native.position._x,
                        y: sphere._native.position._y + 4,
                        z: sphere._native.position._z
                    }
                })
          box.addTo(world);
        }


    }

    previousPosition = [sphere._native.position._x, sphere._native.position._y, sphere._native.position._z]
}



let previousPosition;
setInterval(timerCall, 50)
const group = new WHS.Group();

// var geometry = new THREE.Geometry();
// var material = new THREE.LineBasicMaterial({color: 0x0000ff});


// function newLine(){

//   let previousPosition = [sphere._native.position._x, sphere._native.position._y, sphere._native.position._z];

//   // new THREE.Vector3(
//   // geometry.vertices.push(previousPosition[0], previousPosition[1], previousPosition[2] ))
//   // geometry.vertices.push(new THREE.Vector3(sphere._native.position._x, sphere._native.position._y, sphere._native.position._z))
//   // var line = new THREE.Line(geometry, material);
//   // line.addTo(world);

//   line = new WHS.Line({
//   geometry: {
//     curve: new THREE.LineCurve3(new THREE.Vector3(previousPosition[0], previousPosition[1], previousPosition[2]), new THREE.Vector3(sphere._native.position._x, sphere._native.position._y, sphere._native.position._z))
//   },
//   softbody: true
// });
//   previousPosition = [sphere._native.position._x, sphere._native.position._y, sphere._native.position._z];
// }

// this is with the LINE
// function timerCall() {

//     if (!previousPosition) {

//       // line = new WHS.Line({
//       //           geometry: {
//       //               curve: new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(sphere._native.position._x, sphere._native.position._y, sphere._native.position._z))
//       //           },
//       //           mass: 10,
//       //           softbody: false
//       //       });
//       //     line.addTo(group);
//       //     line.addTo(world);




//     } else {

//       // line = new WHS.Line({
//       //           geometry: {
//       //               curve: new THREE.LineCurve3(new THREE.Vector3(previousPosition[0], previousPosition[1], previousPosition[2]), new THREE.Vector3(sphere._native.position._x, sphere._native.position._y, sphere._native.position._z))
//       //           },
//       //           mass: 10,
//       //           softbody: false
//       //       });
//       //     line.addTo(group);
//       //     line.addTo(world);
//       //     console.log("LINE", line);
//       //     console.log("GROUP", group);
//     }

//     previousPosition = [sphere._native.position._x, sphere._native.position._y, sphere._native.position._z]

// }


previousDirection = []

document.addEventListener('keydown', keyDownHandler);
function keyDownHandler(event){

  if(event.keyCode == 39) {

        // console.log('right');
        // console.log(sphere._native._physijs.linearVelocity);
        // console.log('sphere', sphere._native.position);

        // line.geometry.attributes.position.array.push(20)
        // line.geometry.attributes.position.array.push(10)
        // line.geometry.attributes.position.array.push(0)

        if(sphere._native._physijs.linearVelocity.z > 0){
          sphere.setLinearVelocity({x: -10, y: 0, z: 0});

          //   line = new WHS.Line({
          //       geometry: {
          //           curve: new THREE.LineCurve3(new THREE.Vector3(previousPosition[0], previousPosition[1], previousPosition[2]), new THREE.Vector3(sphere._native.position._x, sphere._native.position._y, sphere._native.position._z))
          //       },
          //       softbody: true
          //   });
          // line.addTo(world);

        }

        if(sphere._native._physijs.linearVelocity.z < 0){
          sphere.setLinearVelocity({x: 10, y: 0, z: 0});
        }

        if(sphere._native._physijs.linearVelocity.x > 0){
          sphere.setLinearVelocity({x: 0, y: 0, z: 10});
        }

        if(sphere._native._physijs.linearVelocity.x < 0){
          sphere.setLinearVelocity({x: 0, y: 0, z: -10});
        }

        // console.log(sphere._native._physijs.linearVelocity);
        // sphere.setLinearVelocity({x: 10, y: 0, z: 0});
    }
    else if(event.keyCode == 37) {
      console.log('left');

        console.log(sphere._native._physijs.linearVelocity)

        if(sphere._native._physijs.linearVelocity.z > 0){
          sphere.setLinearVelocity({x: 10, y: 0, z: 0});
        }

        if(sphere._native._physijs.linearVelocity.z < 0){
          sphere.setLinearVelocity({x: -10, y: 0, z: 0});
        }

        if(sphere._native._physijs.linearVelocity.x > 0){
          sphere.setLinearVelocity({x: 0, y: 0, z: -10});
        }

        if(sphere._native._physijs.linearVelocity.x < 0){
          sphere.setLinearVelocity({x: 0, y: 0, z: 10});
        }

      // console.log(sphere._native._physijs.linearVelocity);
      //  sphere.setLinearVelocity({x: -10, y: 0, z: 0});
    }
    if(event.keyCode == 40) {
      console.log('down');
      console.log(sphere._native._physijs.linearVelocity);
      previousDirection = sphere._native._physijs.linearVelocity
      sphere.setLinearVelocity({x: 0, y: -10, z: 0});
    }
    // else if(event.keyCode == 38) {
    //   console.log('up');
    //   console.log(sphere._native._physijs.linearVelocity);
    //   previousDirection = sphere._native._physijs.linearVelocity
    //   sphere.setLinearVelocity({x: 0, y: 10, z: 0});
    // }

}


plane.addTo(world);
sphere.native.addEventListener('collision', (event) => {
  console.log("COLLISION YO");
  console.log("SPHERE NATIVE", sphere.native);
 world.scene.remove(sphere.native)
})


world.start(); // Start animations and physics simulation.
// world.setControls(new WHS.OrbitControls());
// world.setControls(new WHS.FirstPersonControls(sphere, {
//   block: document.getElementById('blocker'),
//   speed: 3,
//   ypos: -10
// }));

