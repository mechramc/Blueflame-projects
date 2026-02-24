// MusicController.ts

class MusicController {
    private audio: HTMLAudioElement;
    private fadeOutDuration: number;

    constructor(audioSrc: string, fadeOutDuration: number = 1000) {
        this.audio = new Audio(audioSrc);
        this.fadeOutDuration = fadeOutDuration;
        this.audio.loop = true;
    }

    public play(): void {
        this.audio.play();
    }

    public fadeOut(): Promise<void> {
        return new Promise((resolve) => {
            const initialVolume = this.audio.volume;
            const fadeOutStep = initialVolume / (this.fadeOutDuration / 50);
            const fadeOutInterval = setInterval(() => {
                if (this.audio.volume > 0) {
                    this.audio.volume -= fadeOutStep;
                } else {
                    clearInterval(fadeOutInterval);
                    this.audio.pause();
                    this.audio.volume = initialVolume; // Reset volume for next play
                    resolve();
                }
            }, 50);
        });
    }
}

export default MusicController;
