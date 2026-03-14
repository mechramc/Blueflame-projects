// Core game mechanics for the snake game

class SnakeGame {
    private snake: { x: number, y: number }[];
    private food: { x: number, y: number };
    private direction: string;
    private gameWidth: number;
    private gameHeight: number;

    constructor(gameWidth: number, gameHeight: number) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.snake = [{ x: Math.floor(gameWidth / 2), y: Math.floor(gameHeight / 2) }];
        this.direction = 'RIGHT';
        this.placeFood();
    }

    private placeFood(): void {
        this.food = {
            x: Math.floor(Math.random() * this.gameWidth),
            y: Math.floor(Math.random() * this.gameHeight)
        };
    }

    public changeDirection(newDirection: string): void {
        this.direction = newDirection;
    }

    public move(): void {
        const head = { ...this.snake[0] };

        switch (this.direction) {
            case 'UP':
                head.y -= 1;
                break;
            case 'DOWN':
                head.y += 1;
                break;
            case 'LEFT':
                head.x -= 1;
                break;
            case 'RIGHT':
                head.x += 1;
                break;
        }

        this.snake.unshift(head);

        if (this.checkCollision(head)) {
            this.endGame();
        } else if (this.checkFoodCollision(head)) {
            this.placeFood();
        } else {
            this.snake.pop();
        }
    }

    private checkCollision(head: { x: number, y: number }): boolean {
        return head.x < 0 || head.x >= this.gameWidth || head.y < 0 || head.y >= this.gameHeight;
    }

    private checkFoodCollision(head: { x: number, y: number }): boolean {
        return head.x === this.food.x && head.y === this.food.y;
    }

    private endGame(): void {
        console.log('Game Over!');
        // Additional game over logic can be implemented here
    }
}

export default SnakeGame;
