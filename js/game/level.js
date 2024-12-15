import Game from '../engine/game.js';
import Renderer from '../engine/renderer.js';
import Confiner from '../engine/confiner.js';
import Platform from './platform.js';
import Player from './player.js';
import { Images } from '../engine/resources.js';

class Level extends Game {
    constructor(canvasId) {
        super(canvasId);

        const player = new Player(10, this.canvas.height - 100, 75, 75);

        this.camera.confiner = new Confiner(0, 0, 2000, this.canvas.height);
        this.camera.target = player;
        this.addGameObject(player);

        const platforms = [
            new Platform(0, this.canvas.height - 40, 200, 20, Images.Tile),
            new Platform(300, this.canvas.height - 40, 200, 20, Images.Tile),
            new Platform(600, this.canvas.height - 80, 200, 60, Images.Tile)
        ];

        for (const platform of platforms) {
            this.addGameObject(platform);
        }
    }
}

export default Level;