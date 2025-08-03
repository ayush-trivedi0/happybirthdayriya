let highestZ = 1;

class Paper {
    holdingPaper = false;

    prevMouseX = 0;
    prevMouseY = 0;

    MouseX = 0;
    MouseY = 0;

    VelocityX = 0;
    VelocityY = 0;

    currentPaperX = 0;
    currentPaperY = 0;

    init(paper) {
        paper.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;

            this.holdingPaper = true;
            paper.style.zIndex = highestZ++;
            
            this.prevMouseX = e.clientX;
            this.prevMouseY = e.clientY;

            // Read the current transform position
            const transform = getComputedStyle(paper).transform;
            if (transform !== 'none') {
                const match = transform.match(/matrix\((.+)\)/);
                if (match) {
                    const values = match[1].split(', ');
                    this.currentPaperX = parseFloat(values[4]);
                    this.currentPaperY = parseFloat(values[5]);
                }
            }

            console.log('mousedown at', this.prevMouseX, this.prevMouseY);
        });

        document.addEventListener('mousemove', (e) => {
            if (!this.holdingPaper) return;

            this.MouseX = e.clientX;
            this.MouseY = e.clientY;

            this.VelocityX = this.MouseX - this.prevMouseX;
            this.VelocityY = this.MouseY - this.prevMouseY;

            this.currentPaperX += this.VelocityX;
            this.currentPaperY += this.VelocityY;

            this.prevMouseX = this.MouseX;
            this.prevMouseY = this.MouseY;

            paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
        });

        window.addEventListener('mouseup', () => {
            this.holdingPaper = false;
            console.log('mouse button is released');
            this.holdingPaper = false; 
        });
    }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
});
window.addEventListener("load", () => {
    const papers = document.querySelectorAll('.paper:not(.message-paper)');
    
    papers.forEach((paper, i) => {
      const angle = (Math.random() - 0.5) * 5;     // small rotation
      const scale = 1 - i * 0.09;                 // slight shrink for back papers
      const offset = i *3;                        // tiny nudge to prevent exact overlap
  
      paper.style.left = '50%';
      paper.style.top = '50%';
      paper.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scale(${scale}) translateY(-${offset}px)`;
      paper.style.zIndex = i + 1;
    });
  });
  
