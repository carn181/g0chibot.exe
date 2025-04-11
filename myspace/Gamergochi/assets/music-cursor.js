"use strict";

const confettiConfig = {
    count: 10,
    velocity: 5,
    dimension: 5,
    palette: ["white", "blue", "purple", "yellow", "blue", "yellow"]
};

let cursorPosition = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
};

let particleArray = [];
let cursorMoved = false;
const particleInterval = 75;

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function generateParticles(count, isTemporary = false) {
    for (let j = 0; j < count; j++) {
        const particle = document.createElement("div");
        const existingParticle = document.getElementById(`particle${j}`);
        particle.style.position = "absolute";
        particle.style.zIndex = "0";
        let colorIndex = Math.floor(getRandom(0, confettiConfig.palette.length));
        particle.style.backgroundColor = confettiConfig.palette[colorIndex];
        particle.style.userSelect = "none";
        particle.style.width = particle.style.height = `${confettiConfig.dimension}px`;
        particle.style.top = `${cursorPosition.y + 10}px`;
        particle.style.left = `${cursorPosition.x}px`;
        particle.classList.add("confetti-particle");

        const speed = getRandom(2, 7);
        const temporary = isTemporary ?? Math.random() < 0.5;
        const lifespan = temporary ? 400 : speed * getRandom(375, 475);

        document.body.appendChild(particle);
        particleArray.push({
            element: particle,
            dimension: confettiConfig.dimension,
            velocity: speed,
            color: confettiConfig.palette[colorIndex],
            traveled: 0,
            lifetime: 0,
            lastCursorPosition: { ...cursorPosition },
            lifespan: lifespan,
            isTemporary: temporary,
            reducedSize: false
        });
    }
}

let globalTick = 0;
let previousCursorPosition = { x: 0, y: 0 };
let cursorTravelDistance = 0;

document.onmousemove = trackCursor;

function trackCursor(e) {
    e = e || window.event;
    const doc = (e.target && e.target.ownerDocument) || document;
    const docElem = doc.documentElement;
    const body = doc.body;

    if (e.pageX == null && e.clientX != null) {
        e.pageX = e.clientX +
            (docElem && docElem.scrollLeft || body && body.scrollLeft || 0) -
            (docElem && docElem.clientLeft || body && body.clientLeft || 0);
        e.pageY = e.clientY +
            (docElem && docElem.scrollTop || body && body.scrollTop || 0) -
            (docElem && docElem.clientTop || body && body.clientTop || 0);
    }

    cursorPosition = { x: e.pageX, y: e.pageY };
    const delta = {
        x: Math.abs(cursorPosition.x - previousCursorPosition.x),
        y: Math.abs(cursorPosition.y - previousCursorPosition.y)
    };

    cursorTravelDistance = Math.round(Math.sqrt(delta.x ** 2 + delta.y ** 2) * 1000) / 1000;

    if (cursorTravelDistance >= 30) {
        previousCursorPosition = { x: cursorPosition.x, y: cursorPosition.y };
        generateParticles(1);
        console.log("particle-triggered");

        if (particleArray.length > 100) {
            const firstParticle = particleArray.shift();
            firstParticle.element.remove();
        }
    }

    if (!cursorMoved) {
        cursorMoved = true;
    }
}

let accumulatedDelta = 0;
let lastFrameTime = 0;

function updateParticles(currentTime) {
    if (lastFrameTime === undefined) {
        lastFrameTime = currentTime;
    }

    const delta = (currentTime - lastFrameTime > 350) ? 0.35 : (currentTime - lastFrameTime) / 1000;
    accumulatedDelta += delta;
    lastFrameTime = currentTime;

    if (accumulatedDelta >= 1 / 12) {
        accumulatedDelta = 0;

        for (let k = 0; k < particleArray.length; k++) {
            const particleData = particleArray[k];
            const particle = particleData.element;

            particleData.lifetime += particleInterval;
            particleData.traveled += particleData.velocity;
            particleData.lastCursorPosition = { ...cursorPosition };

            if (particleData.lifetime >= particleData.lifespan ||
                (parseFloat(particle.style.top) + confettiConfig.dimension) >= document.documentElement.scrollHeight) {
                particle.remove();
                particleArray.splice(k, 1);
                k--;
            } else {
                particle.style.top = `${parseInt(particle.style.top) + particleData.velocity}px`;
                particle.style.left = `${parseInt(particle.style.left) + getRandom(-particleData.velocity, particleData.velocity)}px`;

                if (particleData.lifetime >= particleData.lifespan / 2 && !particleData.reducedSize) {
                    particleData.dimension /= 2;
                    particle.style.width = particle.style.height = `${particleData.dimension}px`;
                    particleData.reducedSize = true;
                }
            }
        }
    }

    requestAnimationFrame(updateParticles);
}

requestAnimationFrame(updateParticles);
