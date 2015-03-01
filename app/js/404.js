$(function(){
	'use strict';


  //--- Create Canvas ---//

  var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    W, H;

  function resizeCanvas() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  }
  resizeCanvas();
  $(window).resize(resizeCanvas);

  $('.container').append(canvas);



  //--- Global variables ---//

  var objects = [],
    MAX_T = 2000, // Max object time in ms
    MAX_SIZE = 35, // Max object size
    aX = 0, // horizontal acceleration
    aY = 0, // vertical acceleration
    INIT_VELOCITY = 5; // Initial velocity

  var tGrow = 1/3, // proportion of time spent growing
    tFade = 1/2; // proportion of time spent fading

  var oldT = 0,
    dt = 0;



  //--- Make stuff happen ---//


  function resetCanvas() {
      ctx.clearRect(0, 0, W, H);
  }

  function createObject(){
      objects.push({
          origin: {
            // Random initial positions:
            x: (Math.random()-0.5) * W * 2,
            y: (Math.random()-0.5) * H * 2
          },
          // Random initial velocities prior to gravity:
          velocity: {
            x: (Math.random()-0.5) * INIT_VELOCITY,
            y: (Math.random()-0.5) * INIT_VELOCITY
          },
          size: MAX_SIZE/3, // initial size
          alpha: 1, //opacity
          t: 0 // time since birth
      });
  }

  function drawImage(x,y,r,a) {
    // img = img || ghost;  
    ctx.save();
    ctx.globalAlpha = a;
    ctx.font = r+'px Chunkfive,ChunkFiveRegular,Arial Black,sans-serif';
    ctx.fillStyle = '#302a22';
    ctx.fillText('404', x, y);
    ctx.restore();
  }

  function animateDV(max, t){
    var thisT = MAX_T * t;
    var thisDT = thisT / dt;
    return max / thisDT;
  }

  function updateTimer(now){
    // Update time diff
    if (oldT === 0) {
      oldT = now;
    }
    dt = now - oldT;
    oldT = now;
  }

  //--- NBED: Test code ---//

  // var $values = $('<div>',{id:'values'})
  //   .appendTo('body')
  //   .css({
  //     'margin': 0,
  //     'position': 'fixed',
  //     'top': '10px',
  //     'right': '10px',
  //     'z-index': 9999,
  //     'color': 'white'
  //   });

  // var repeat = 0,
  //   frameReadings = [];

  // function fpsMeter(){
  //   repeat += dt;
  //   if (dt !== 0) {
  //     frameReadings.push(1000 / dt);
  //   }
  //   if (repeat > 400) {
  //     var fps = 0;
  //     var frames = frameReadings.length;
  //     frameReadings.forEach(function(d){
  //       fps += d;
  //     });
  //     fps = Math.round(fps/frames);
  //     $values.text(Math.round(fps) + ' fps');
  //     frameReadings = [];
  //     repeat = 0;
  //   }
  // }


  function run(now){

    resetCanvas();

    updateTimer(now);

    createObject();

    var vGrow = animateDV(MAX_SIZE, tGrow);
    var vFade = animateDV(1, tFade);

    var objLen = objects.length;
    for (var i=0; i < objLen; i++) {
        var o = objects[i];

        // Gravity acceleration constant (?)
        o.velocity.x += aX;
        o.velocity.y += aY;

        // Get previous velocity
        o.origin.x += o.velocity.x;
        o.origin.y += o.velocity.y;

        // Apply drag force coefficient to decellerate the object over time
        // o.velocity.x *= 0.98;
        // o.velocity.y *= 0.98;

        // Bounding box: 
        // Prevent the balls escaping vertically
        if (o.origin.y < 0 || o.origin.y > H) {
          o.velocity.y = -o.velocity.y;
        }
        // Prevent the balls escaping horizontally
        if (o.origin.x < 0 || o.origin.x > W) {
          o.velocity.x = -o.velocity.x;
        }

        // Increase object timer
        o.t += dt;

        if (dt !== 0) {
          if (o.size < MAX_SIZE) {
            o.size += vGrow;
          } else if (o.t > MAX_T - MAX_T * tFade) {
            o.alpha -= vFade;
            o.alpha = Math.max(o.alpha, 0);
          }
        }

        if (o.t < MAX_T) {
          var x = o.origin.x - o.size / 2;
          var y = o.origin.y - o.size / 2;
          // (Re)draw the circles
          drawImage(x, y, o.size, o.alpha);
        } else {
          // Kill it
          o.dead = true;
        }

    }

    objects = objects.filter(function(d){
      return !d.dead;
    });

    // fpsMeter();
    // $values.text(objects.length);

    requestAnimationFrame(run);
  }


  //--- Init ---//
  
  requestAnimationFrame(run);




  //--- Gyro detection ---//

  // var delay = 100,
  //   gamma = 0,
  //   orientationInt;

  // window.ondeviceorientation = function(event) {
  //   gamma = Math.round(event.gamma);
  // };

  // if (window.DeviceOrientationEvent!==undefined) {
  //   orientationInt = setInterval(function() {
  //     aX = gamma / 400;
  //     aY = Math.abs(aX/2);
  //   }, delay);
  // }

  // $(window).on('mousemove', function(e){
  //   clearInterval(orientationInt);
  //   // var x = e.pageX - W/2;
  //   // aX = x / 20000;
  //   // aY = Math.abs(aX/2);
  // });


});