const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// get mouse position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height/150) * (canvas.width/150)
};

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
);

// create particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    // method to draw individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    // check particle position, check mouse position, move the particle, draw the particle
    update() {
        // check if particle is still within canvas
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }
        
        // check collision detection - mouse position / particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < mouse.radius + this.size){
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            this.x += dx/10;
            this.y += dy/10;
        }

        // check distance with all other particles (new logic)
        const minDistance = 30; // You can adjust this value
        const repulsionForce = 20; // You can adjust this value
        for (let i = 0; i < particlesArray.length; i++) {
            const otherParticle = particlesArray[i];
            if (this === otherParticle) continue; // Skip the current particle
            
            const dx = otherParticle.x - this.x;
            const dy = otherParticle.y - this.y;
            const distance = Math.sqrt(dx*dx + dy*dy);
            
            if (distance < minDistance) {
                this.directionX -= dx / distance * repulsionForce;
                this.directionY -= dy / distance * repulsionForce;
            }
        }
        
        // Limit the speed (new logic)
        const maxSpeed = 10; // You can adjust this value
        const speed = Math.sqrt(this.directionX * this.directionX + this.directionY * this.directionY);
        if (speed > maxSpeed) {
            this.directionX = (this.directionX / speed) * maxSpeed;
            this.directionY = (this.directionY / speed) * maxSpeed;
        }

        const targetSpeed = 0.5;
        if (speed > targetSpeed) {
            this.directionX = (this.directionX / speed) * 1.5 * targetSpeed;
            this.directionY = (this.directionY / speed) * 1.5 * targetSpeed;
        }

        // move particle
        this.x += this.directionX;
        this.y += this.directionY;
        // draw particle
        this.draw();
    }
}

// create particle array
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles*2; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = 'white';

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

// check if particles are close enough to draw line between them
function connect(){
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = (( particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
            + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width/7) * (canvas.height/7)) {
                opacityValue = 1 - (distance/20000);
                ctx.strokeStyle='rgba(255,255,255,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

/*
function connect() {
    let opacityValue = 1;
    const proximityThreshold = 100; // Adjust as needed

    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2 +
                            (particlesArray[a].y - particlesArray[b].y) ** 2) ** 0.5;
            if (distance < proximityThreshold) {
                // Draw line between particles a and b
                ctx.strokeStyle = 'rgba(255,255,255,0.1)'; // Adjust as needed
                ctx.lineWidth = 1; // Adjust as needed
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
                ctx.closePath();

                for (let c = b; c < particlesArray.length; c++) {
                    let distance1 = ((particlesArray[b].x - particlesArray[c].x) ** 2 +
                                    (particlesArray[b].y - particlesArray[c].y) ** 2) ** 0.5;
                    let distance2 = ((particlesArray[a].x - particlesArray[c].x) ** 2 +
                                    (particlesArray[a].y - particlesArray[c].y) ** 2) ** 0.5;
                    if (distance1 < proximityThreshold && distance2 < proximityThreshold) {
                        // Draw shadow area between particles a, b, and c
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.lineTo(particlesArray[c].x, particlesArray[c].y);
                        ctx.lineTo(particlesArray[a].x, particlesArray[a].y);
                        
                        // Calculate opacity based on distances
                        let maxDistance = Math.max(distance, distance1, distance2);
                        opacityValue = 1 - (maxDistance / proximityThreshold);
                        
                        // Use getRandomColor to set a random fill color
                        ctx.fillStyle = getRandomColor(opacityValue);
                        
                        ctx.fill();
                    }
                }
            }
        }
    }
}

function getRandomColor(opacity) {
    const r = Math.floor(Math.random() * 256); // Random between 0 and 255
    const g = Math.floor(Math.random() * 256); // Random between 0 and 255
    const b = Math.floor(Math.random() * 256); // Random between 0 and 255
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
*/



function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);

    // Draw and update particles
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();

    // Find the closest particle to the mouse
    let closestParticleIndex = -1;
    let closestDistance = mouse.radius;
    for (let i = 0; i < particlesArray.length; i++) {
        let dx = mouse.x - particlesArray[i].x;
        let dy = mouse.y - particlesArray[i].y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if (distance < closestDistance) {
            closestDistance = distance;
            closestParticleIndex = i;
        }
    }

    // Attract the closest particle
    if (closestParticleIndex !== -1) {
        let dx = mouse.x - particlesArray[closestParticleIndex].x;
        let dy = mouse.y - particlesArray[closestParticleIndex].y;
        particlesArray[closestParticleIndex].x += dx/5;
        particlesArray[closestParticleIndex].y += dy/5;
        particlesArray[closestParticleIndex].speedX = 0;
        particlesArray[closestParticleIndex].speedY = 0;
    }
}



// resize event
window.addEventListener('resize',
    function(){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        mouse.radius = ((canvas.height/80) * (canvas.height/80));
        init();
    }
);

// mouse out event
window.addEventListener('mouseout',
    function(){
        mouse.x = undefined;
        mouse.y = undefined;
    }
);

init();
animate();
console.log("script.js is loaded");