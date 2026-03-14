// Responsive controls for the snake game

class Controls {
  private keys: Set<string>;

  constructor() {
    this.keys = new Set();
    this.initKeyboardControls();
    this.initTouchControls();
  }

  private initKeyboardControls(): void {
    window.addEventListener('keydown', (event) => {
      this.keys.add(event.key);
    });
    window.addEventListener('keyup', (event) => {
      this.keys.delete(event.key);
    });
  }

  private initTouchControls(): void {
    const touchArea = document.getElementById('touch-area');
    if (touchArea) {
      touchArea.addEventListener('touchstart', (event) => {
        const touch = event.touches[0];
        this.handleTouch(touch);
      });
    }
  }

  private handleTouch(touch: Touch): void {
    // Implement touch control logic here
    // For example, determine direction based on touch position
  }

  public getDirection(): string | null {
    if (this.keys.has('ArrowUp')) return 'up';
    if (this.keys.has('ArrowDown')) return 'down';
    if (this.keys.has('ArrowLeft')) return 'left';
    if (this.keys.has('ArrowRight')) return 'right';
    return null;
  }
}

export default Controls;
