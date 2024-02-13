let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  currentPaperX = 0;
  currentPaperY = 0;
  
  init(paper) {
    paper.addEventListener('touchstart', (e) => this.handleTouchStart(e));
    paper.addEventListener('touchmove', (e) => this.handleTouchMove(e));
    paper.addEventListener('touchend', () => this.handleTouchEnd());
    
    paper.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    window.addEventListener('mouseup', () => this.handleMouseUp());
  }

  handleTouchStart(e) {
    this.holdingPaper = true;
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
    this.currentPaperX = parseFloat(e.target.style.left || 0);
    this.currentPaperY = parseFloat(e.target.style.top || 0);
    e.target.style.zIndex = highestZ++;
  }

  handleTouchMove(e) {
    if (!this.holdingPaper) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - this.touchStartX;
    const deltaY = touch.clientY - this.touchStartY;
    this.currentPaperX += deltaX;
    this.currentPaperY += deltaY;
    e.target.style.left = this.currentPaperX + 'px';
    e.target.style.top = this.currentPaperY + 'px';
    e.preventDefault();
  }

  handleTouchEnd() {
    this.holdingPaper = false;
  }

  handleMouseDown(e) {
    if (this.holdingPaper) return;
    this.holdingPaper = true;
    this.touchStartX = e.clientX;
    this.touchStartY = e.clientY;
    this.currentPaperX = parseFloat(e.target.style.left || 0);
    this.currentPaperY = parseFloat(e.target.style.top || 0);
    e.target.style.zIndex = highestZ++;
  }

  handleMouseMove(e) {
    if (!this.holdingPaper) return;
    const deltaX = e.clientX - this.touchStartX;
    const deltaY = e.clientY - this.touchStartY;
    e.target.style.left = this.currentPaperX + deltaX + 'px';
    e.target.style.top = this.currentPaperY + deltaY + 'px';
  }

  handleMouseUp() {
    this.holdingPaper = false;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const papers = Array.from(document.querySelectorAll('.paper'));
  papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
  });
});
