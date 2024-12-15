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
       // Call the parent class's constructor with the canvas ID
       super(canvasId);

       // Create a player object at the specified position and size
       const player = new Player(10, this.canvas.height - 100, 75, 75);

       // Set the camera's confiner to limit the camera's movement within a specific area
       // The confiner is defined by a rectangle with coordinates (0, 0) and a width of 2100 and height equal to the canvas height
       this.camera.confiner = new Confiner(0, 0, 2100, this.canvas.height);

       // Set the camera's target to follow the player
       this.camera.target = player;

       // Add the player to the game's list of game objects
       this.addGameObject(player);

       // Define an array of static platforms
       const platforms = [ 
           new Platform(0, this.canvas.height - 40, 200, 20, Images.Tile), 
           new Platform(300, this.canvas.height - 40, 200, 20, Images.Tile), 
           new Platform(1860, this.canvas.height - 200, 150, 20, Images.Tile), 
       ];

       // Define an array of moving platforms
       const movingPlatforms = [
           new MovingPlatform(1300, this.canvas.height - 100, 100, 20, Images.Tile, 100, 50, 'horizontal'), 
           new MovingPlatform(1400, this.canvas.height - 150, 100, 20, Images.Tile, 100, 50, 'vertical'),
       ];

       // Create a finish point object at the specified position and size
       const finishPoint = new FinishPoint(2000, this.canvas.height - 240, 50, 50);

       // Define an array of conveyor belts
       const conveyorBelts = [
           new ConveyorBelt(550, this.canvas.height - 60, 300, 20, Images.Tile, 'right', 100), 
           new ConveyorBelt(920, this.canvas.height - 40, 250, 20, Images.Tile, 'left', 100), 
           new ConveyorBelt(1540, this.canvas.height - 220, 100, 20, Images.Tile, 'right', 100), 
           new ConveyorBelt(1690, this.canvas.height - 220, 100, 20, Images.Tile, 'left', 100), 
       ];

       // Define an array of spikes
       const spikes = [
           new Spike(450, this.canvas.height - 60, 40, 20, 'black'), 
           new Spike(750, this.canvas.height - 80, 40, 20, 'black'), 
           new Spike(1620, this.canvas.height - 240, 20, 20, 'black'), 
           new Spike(1770, this.canvas.height - 240, 20, 20, 'black'), 
       ];

       // Add all platforms to the game's list of game objects
       for (const platform of platforms) {
           this.addGameObject(platform);
       }

       // Add all moving platforms to the game's list of game objects
       for (const movingPlatform of movingPlatforms) {
           this.addGameObject(movingPlatform);
       }

       // Add all conveyor belts to the game's list of game objects
       for (const conveyorBelt of conveyorBelts) {
           this.addGameObject(conveyorBelt);
       }

       // Add all spikes to the game's list of game objects
       for (const spike of spikes) {
           this.addGameObject(spike);
       }

       // Add the finish point to the game's list of game objects
       this.addGameObject(finishPoint);
   }
}

export default Level;