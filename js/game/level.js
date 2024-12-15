import Game from '../engine/game.js';
import Renderer from '../engine/renderer.js';
import Confiner from '../engine/confiner.js';
import Platform from './platform.js';
import Player from './player.js';
import { Images } from '../engine/resources.js';
import MovingPlatform from './movingPlatform.js';
import FinishPoint from './finishPoint.js';
import ConveyorBelt from './conveyorBelt.js';
import Spike from './spike.js';

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
            new Platform(2000, this.canvas.height - 200, 150, 20, Images.Tile), 
            
        ];

        const movingPlatforms = [
            new MovingPlatform(1300, this.canvas.height - 100, 100, 20, Images.Tile, 100, 50, 'horizontal'), 
            new MovingPlatform(1400, this.canvas.height - 150, 100, 20, Images.Tile, 100, 50, 'vertical'),
        ];
        const finishPoint = new FinishPoint(2040, this.canvas.height - 240, 50, 50);
        this.addGameObject(finishPoint);
        const conveyorBelts = [
            new ConveyorBelt(550, this.canvas.height - 60, 300, 20, Images.Tile, 'right', 100), 
            new ConveyorBelt(920, this.canvas.height - 40, 250, 20, Images.Tile, 'left', 100), 
        ];
        const spikes = [
            new Spike(450, this.canvas.height - 60, 40, 20, 'black'), 
            new Spike(750, this.canvas.height - 80, 40, 20, 'black'), 
        ];

        for (const platform of platforms) {
            this.addGameObject(platform);
        }
        for (const movingPlatform of movingPlatforms) {
            this.addGameObject(movingPlatform);
        }
        for (const conveyorBelt of conveyorBelts) {
            this.addGameObject(conveyorBelt);
        }
        for (const spike of spikes) {
            this.addGameObject(spike);
        }
    
    }
}

export default Level;