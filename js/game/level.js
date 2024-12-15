import Game from '../engine/game.js';
import Renderer from '../engine/renderer.js';
import Confiner from '../engine/confiner.js';
import Platform from './platform.js';
import Player from './player.js';
import { Images } from '../engine/resources.js';
import MovingPlatform from './movingPlatform.js';

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
            new Platform(600, this.canvas.height - 80, 200, 60, Images.Tile), 
            new Platform(900, this.canvas.height - 40, 200, 20, Images.Tile),
           
        ];

        const movingPlatforms = [
            new MovingPlatform(400, this.canvas.height - 100, 150, 20, Images.Tile, 100, 50, 'horizontal'), 
            new MovingPlatform(800, this.canvas.height - 150, 150, 20, Images.Tile, 100, 50, 'vertical'),
        ];
       

        for (const platform of platforms) {
            this.addGameObject(platform);
        }
        for (const movingPlatform of movingPlatforms) {
            this.addGameObject(movingPlatform);
        }
    
    }
}

export default Level;