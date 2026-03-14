// Educational feature for collecting letters or numbers in the snake game

class EducationalFeature {
    private letters: string[];
    private collectedLetters: string[];

    constructor() {
        this.letters = this.generateLetters();
        this.collectedLetters = [];
    }

    private generateLetters(): string[] {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return alphabet.split('').sort(() => 0.5 - Math.random()).slice(0, 5); // Randomly select 5 letters
    }

    public collectLetter(letter: string): void {
        if (this.letters.includes(letter)) {
            this.collectedLetters.push(letter);
            this.letters = this.letters.filter(l => l !== letter);
        }
    }

    public getCollectedLetters(): string[] {
        return this.collectedLetters;
    }

    public getAvailableLetters(): string[] {
        return this.letters;
    }
}

export default EducationalFeature;
