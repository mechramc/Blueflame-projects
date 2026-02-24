// menu.ts
import MusicController from '../audio/music-controller';

const musicController = new MusicController('../audio/background-music.mp3');

function transitionToMenu() {
    musicController.fadeOut().then(() => {
        // Logic to transition to the menu page
        console.log('Transitioned to menu');
    });
}

// Call this function when transitioning to the menu
transitionToMenu();
