// advanced MatrixRain.js
export var MatrixRain = (function() {
  var canvas, ctx, w, h, p, drops = [];

  function init(config) {
    canvas = document.createElement('canvas');
    ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    // Configuration
    canvas.width = w = window.innerWidth;
    canvas.height = h = window.innerHeight;
    p = config.spacing || 20 || 5; // Spacing between the columns of rain, also determines font size
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      z-index: 5;
      opacity: ${config.opacity || 0.7};  // Set transparency
    `;

    // Setting up the drops
    for(var x = 0; x < w; x += p) {
      drops[x] = Math.random() * h;  // Randomize the starting point of drops
    }

    // Setting up the font
    ctx.font = `${p}px ${config.fontFamily || 'monospace'}`;
    ctx.fillStyle = config.color || '#0F0';

    // Handle window resize
    window.addEventListener('resize', function() {
      canvas.width = w = window.innerWidth;
      canvas.height = h = window.innerHeight;
      p = config.spacing || 20 || 5; // Update the spacing
      ctx.font = `${p}px ${config.fontFamily || 'monospace'}`;  // Reset font size if needed

      // Recalculate drops for new width
      drops = [];
      for(var x = 0; x < w; x += p) {
        drops[x] = Math.random() * h;
      }
    });

    // Speed of the effect
    var speed = config.speed || 0.66;

    // Track mouse position
    var mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', function(event) {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    function draw() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';  // Adjust for fade effect
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = config.color || '#0F0';

      for(var i = 0; i < drops.length; i++) {
        var text = String.fromCharCode(33 + Math.random() * 93);  // More varied characters
        ctx.fillText(text, i * p, drops[i] * p);

        // Alter drops based on mouse position
        var dx = (i * p - mouseX) * 0.001; // Calculate the horizontal difference
        var dy = (drops[i] * p - mouseY) * 0.001; // Calculate the vertical difference

        // Adjust the fall of the drops based on the mouse position
        drops[i] += Math.sin(dx + dy);
        
        if(drops[i] * p > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(draw, 55 * speed);
  }

  return { init };
})();