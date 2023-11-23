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
ctx.lineWidth = 0.05;

// The below code creates a circle on the canvas to visualize the
// number of points or divisions (p)
let radius = 200;
let p = 10;
let maxIterations = 10;


/**
 * Draws a set of points on the outline of a circle
 * with the circle positioned in the center of the canvas
 * @param  {Object} ctx Canvas Context
 * @param  {Object} cv Canvas Object
 * @param  {Number} radius Radius of the circle
 * @param  {Number} p Number of divisions on the circle
 */
function drawPoints(ctx, cv, radius, p) {

    // Clear the canvas
    ctx.clearRect(0, 0, cv.width, cv.height);
    // console.log(cv.width, cv.height)
    // console.log("Drawing points");

    // Draw the points as per the number of divisions needed
    for (let theta = 0; theta < 2 * Math.PI; theta += Math.PI / p) {

        const x = radius * Math.cos(theta) + cv.width / 2;
        const y = radius * Math.sin(theta) + cv.height / 2;

        // console.log(x,y)
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
}

/**
 * Simple mathematical function
 * @param  {Number} x Input to the function
 * @returns {Number} Output of the function
 */
function getXPrime(x) {
    return 2*x;
}

/**
 * Runs the modular arithmetic and connects the point
 * as per the following construct connect x and x' where
 * x' = f(x) mod p where p is the number of divisions 
 * @param  {Object} ctx Canvas Context
 * @param  {Object} cv Canvas Object
 * @param  {Number} radius Radius of the circle
 * @param  {Number} p Number of divisions on the circle
 */
function connectPoints(ctx, cv, radius, p) {

    ctx.beginPath();

    for(let i = 0; i <= maxIterations; i++){
        let iPrime = getXPrime(i)%(p);
        // console.log(i,iPrime);
        
        // console.log(radius * Math.cos(i  * Math.PI / p) + cv.width/2, radius * Math.sin(i * Math.PI / p) + cv.height/2);
        // console.log(radius * Math.cos(iPrime  * Math.PI / p) + cv.width/2, radius * Math.sin(iPrime * Math.PI / p)  + cv.height/2);

        ctx.moveTo(
            radius * Math.cos(i  * Math.PI / p) + cv.width/2,
            radius * Math.sin(i * Math.PI / p) + cv.height/2
        );
        ctx.lineTo(
            radius * Math.cos(iPrime * Math.PI / p) + cv.width/2,
            radius * Math.sin(iPrime * Math.PI / p) + cv.height/2
        );
        ctx.stroke();

    }
}

/**
 * Runs the modular arithmetic and connects the point
 * as per the following construct connect x and x' where
 * x' = f(x) mod p where p is the number of divisions 
 * @param  {Number} i Number of divisions on the circle
 */
function connectSinglePoint() {

    if (iteration>100){
        console.log('Animation halted.');
        return 0;
    }

    ctx.beginPath();
    let iPrime = getXPrime(iteration)%(p);

    ctx.moveTo(
        radius * Math.cos(iteration  * Math.PI / p) + canvas.width/2,
        radius * Math.sin(iteration * Math.PI / p) + canvas.height/2
    );
    ctx.lineTo(
        radius * Math.cos(iPrime * Math.PI / p) + canvas.width/2,
        radius * Math.sin(iPrime * Math.PI / p) + canvas.height/2
    );
    ctx.stroke();
    
    requestAnimationFrame(connectSinglePoint);
    iteration += 1;
}

drawPoints(ctx, canvas, radius, p);
// connectPoints(ctx, canvas, radius, p);
let iteration = 1;
connectSinglePoint();