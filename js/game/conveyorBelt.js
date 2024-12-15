import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import { Images } from '../engine/resources.js';

class ConveyorBelt extends GameObject {
    constructor(x, y, width, height, image, direction = 'right', speed = 100) {
        // Call the parent class's constructor (GameObject) with the initial position (x, y)
        super(x, y);

        // Determine the color of the conveyor belt based on its direction
        // Green for 'right' direction, red for 'left' direction
        let colour = direction === 'right' ? 'green' : 'red';

        // Add a Renderer component to handle rendering the conveyor belt
        // The conveyor belt is rendered with the determined color, specified width and height, and a color
        this.addComponent(new Renderer(colour, width, height));

        // Add a Physics component to handle collision detection
        // The Physics component is initialized with zero velocity, acceleration, and gravity
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));

        // Store the direction and speed of the conveyor belt
        this.direction = direction; 
        this.speed = speed;

        // Set a tag for the conveyor belt to identify it in the game
        this.tag = "conveyorBelt";
    }

    // Update method, called every frame
    update(deltaTime) {
        // Call the parent class's update method to ensure all components are updated
        super.update(deltaTime);
    }
}

// Export the ConveyorBelt class for use in other parts of the game
export default ConveyorBelt;