// Getting the Canvas Element and dimensions
const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Creating a canvas context which is an object with properties and methods that you can 
// use to render graphics inside the canvas element. 
// The context can be 2d or webgl (3d). Each canvas element can only have one context. 
// If we use the getContext() method multiple times, it will return a reference to the 
// same context object [HTML5 Canvas Element Tutorial]
const ctx = canvas.getContext('2d');

// Setting Context configurations for drawing
ctx.fillStyle = 'white';
ctx.strokeStyle = 'white';
ctx.lineWidth = 0.005;

// The below code creates a circle on the canvas to visualize the
// number of points or divisions (p)
let radius = 100;





let p = 1;

function connectPoints() {

    if (p>200){
        console.log('Animation halted.');
        return 0;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    let index = 0;
    // console.log("-----------------"+p);
    for(let m = 2; m < 6; m++){
        for(let i = 1; i < p; i++){
            // ctx.lineWidth = 0.01/(p-i+1);
            let iPrime = (m*i)%(p);

            ctx.moveTo(
                radius * Math.cos(i * (2 * Math.PI)/ p) + canvas.width*((index+1)/5),
                radius * Math.sin(i * (2 * Math.PI)/ p) + canvas.height/2
            );
            ctx.lineTo(
                radius * Math.cos(iPrime * (2 * Math.PI)/ p) + canvas.width*((index+1)/5),
                radius * Math.sin(iPrime * (2 * Math.PI)/ p) + canvas.height/2
            );
            ctx.stroke();
        }
    index += 1;   
    }

    p += 1;
    requestAnimationFrame(connectPoints);
}

connectPoints();