/**
 * MemeForge - Client-Side Meme Generator
 * 
 * All image processing happens client-side using HTML5 Canvas.
 * No images are stored on the server.
 */

let canvas = null;
let ctx = null;
let currentImage = null;

// Initialize canvas when page loads
window.addEventListener('DOMContentLoaded', function() {
    canvas = document.getElementById('memeCanvas');
    ctx = canvas.getContext('2d');
    
    // Set default canvas size
    canvas.width = 600;
    canvas.height = 400;
    
    // Draw placeholder
    drawPlaceholder();
});

/**
 * Draw a placeholder message on the canvas
 */
function drawPlaceholder() {
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#999';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Upload an image to get started', canvas.width / 2, canvas.height / 2);
}

/**
 * Load image from file input and draw to canvas
 */
function loadImageFromFile(file) {
    if (!file || !file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
    }
    
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            currentImage = img;
            // Resize canvas to match image dimensions
            canvas.width = img.width;
            canvas.height = img.height;
            // Draw image
            ctx.drawImage(img, 0, 0);
            // Redraw text if already entered
            const topText = document.getElementById('topText').value;
            const bottomText = document.getElementById('bottomText').value;
            if (topText || bottomText) {
                drawText(topText, bottomText);
            }
        };
        img.src = e.target.result;
    };
    
    reader.readAsDataURL(file);
}

/**
 * Draw text overlay on canvas (classic meme style)
 */
function drawText(topText, bottomText) {
    if (!currentImage) {
        alert('Please upload an image first');
        return;
    }
    
    // Redraw the original image
    ctx.drawImage(currentImage, 0, 0);
    
    // Text styling - classic meme style
    const fontSize = Math.max(32, canvas.width / 15);
    ctx.font = `bold ${fontSize}px Impact, Arial Black, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    // Text stroke and fill colors
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'white';
    ctx.lineWidth = Math.max(2, fontSize / 20);
    ctx.lineJoin = 'round';
    ctx.miterLimit = 2;
    
    // Draw top text
    if (topText) {
        const topY = 20;
        ctx.strokeText(topText, canvas.width / 2, topY);
        ctx.fillText(topText, canvas.width / 2, topY);
    }
    
    // Draw bottom text
    if (bottomText) {
        const bottomY = canvas.height - fontSize - 20;
        ctx.strokeText(bottomText, canvas.width / 2, bottomY);
        ctx.fillText(bottomText, canvas.width / 2, bottomY);
    }
}

/**
 * Generate meme with current text inputs
 */
function generateMeme() {
    const topText = document.getElementById('topText').value;
    const bottomText = document.getElementById('bottomText').value;
    
    if (!currentImage) {
        alert('Please upload an image first');
        return;
    }
    
    drawText(topText, bottomText);
}

/**
 * Download canvas as PNG image
 */
function downloadCanvas() {
    if (!currentImage) {
        alert('Please generate a meme first');
        return;
    }
    
    // Create download link
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = dataURL;
    link.click();
}

/**
 * Alias for downloadCanvas (for button onclick)
 */
function downloadMeme() {
    downloadCanvas();
}

// Handle file input change
document.getElementById('imageInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        loadImageFromFile(file);
    }
});

// Allow Enter key to generate meme
document.getElementById('topText').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        generateMeme();
    }
});

document.getElementById('bottomText').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        generateMeme();
    }
});

