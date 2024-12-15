import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import { Images } from '../engine/resources.js';

class FinishPoint extends GameObject {
    constructor(x, y, width, height, color = 'gold') {
        // Call the parent class's constructor (GameObject) with the initial position (x, y)
        super(x, y);

        // Add a Renderer component to handle rendering the finish point
        // The finish point is rendered with the specified color, width, and height
        this.addComponent(new Renderer(color, width, height));

        // Add a Physics component to handle collision detection
        // The Physics component is initialized with zero velocity, acceleration, and gravity
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));

        // Set a tag for the finish point to identify it in the game
        this.tag = "finishPoint";
    }
}
export default FinishPoint;