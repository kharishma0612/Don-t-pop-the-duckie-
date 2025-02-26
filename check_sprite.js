// const canvas = document.querySelector('#canvas_container');
// const ctx = canvas.getContext('2d');

// const spriteWidth = 471; // Updated frame width
// const spriteHeight = 471; // Updated frame height

// const CANVAS_WIDTH = canvas.width = 400;
// const CANVAS_HEIGHT = canvas.height = 400;

// const playerImg = new Image();
// playerImg.src = 'sprite_sheet.png';

// let frameX = 0;
// let frameY = 0;
// let initFrame = 0;
// const staggerFrame = 40; // Adjusted for smoother animation

// function animate() {
//     ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

//     let position = Math.floor(initFrame / staggerFrame) % 4; // 4 frames total (2x2 grid)
//     frameX = position % 2; // Columns
//     frameY = Math.floor(position / 2); // Rows

//     ctx.drawImage(
//         playerImg,
//         frameX * spriteWidth, frameY * spriteHeight, // Source position
//         spriteWidth, spriteHeight, // Source dimensions
//         0, 0, // Destination position
//         spriteWidth, spriteHeight // Destination dimensions
//     );

//     initFrame++;
//     requestAnimationFrame(animate);
// }

// animate();
const canvas = document.querySelector('#canvas_container');
const ctx = canvas.getContext('2d');

const spriteWidth = 166; // Frame width (1 frame from sprite sheet)
const spriteHeight = 166; // Frame height (1 frame from sprite sheet)

const CANVAS_WIDTH = canvas.width = spriteWidth; // Match canvas to frame dimensions
const CANVAS_HEIGHT = canvas.height = spriteHeight;

const playerImg = new Image();
playerImg.src = 'dance_sprite.png'; // Use the correct file name

let frameX = 0;
let frameY = 0;
let initFrame = 0;
const totalFrames = 9; // Total frames in sprite sheet
const staggerFrame = 30; // Adjust for desired animation speed

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    let position = Math.floor(initFrame / staggerFrame) % totalFrames; // Cycle through all 9 frames
    frameX = position % 3; // 3 columns in the sprite sheet
    frameY = Math.floor(position / 3); // Corrected to 3, since we have 3 rows

    ctx.drawImage(
        playerImg,
        frameX * spriteWidth, frameY * spriteHeight, // Source position
        spriteWidth, spriteHeight, // Source dimensions
        0, 0, // Destination position
        spriteWidth, spriteHeight // Destination dimensions
    );

    initFrame++;
    requestAnimationFrame(animate);
}

animate();
