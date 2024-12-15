import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import { Images } from '../engine/resources.js';

class MovingPlatform extends GameObject {
    constructor(x, y, width, height, image, moveRange, moveSpeed, moveDirection = 'horizontal') {
        // Call the parent class's constructor (GameObject) with the initial position (x, y)
        super(x, y);

        // Add a Renderer component to handle rendering the moving platform
        // The platform is rendered with a gray color, specified width and height, and an image
        this.addComponent(new Renderer('gray', width, height, image));

        // Add a Physics component to handle collision detection
        // The Physics component is initialized with zero velocity, acceleration, and gravity
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));

        // Store the movement range, speed, and direction of the platform
        this.moveRange = moveRange; 
        this.moveSpeed = moveSpeed; 
        this.moveDirection = moveDirection;

        // Store the starting position of the platform for reference
        this.startPosition = { x: x, y: y }; 

        // Initialize the movement direction (1 for forward, -1 for backward)
        this.direction = 1;
    }

    update(deltaTime) {
        // Check the movement direction and update the platform's position accordingly
        if (this.moveDirection === 'horizontal') {
            // Move the platform horizontally based on its speed, direction, and deltaTime
            this.x += this.moveSpeed * this.direction * deltaTime;

            // Reverse the direction if the platform has moved beyond its range
            if (Math.abs(this.x - this.startPosition.x) >= this.moveRange) {
                this.direction *= -1;
            }
        } else if (this.moveDirection === 'vertical') {
            // Move the platform vertically based on its speed, direction, and deltaTime
            this.y += this.moveSpeed * this.direction * deltaTime;

            // Reverse the direction if the platform has moved beyond its range
            if (Math.abs(this.y - this.startPosition.y) >= this.moveRange) {
                this.direction *= -1;
            }
        }

        // Call the parent class's update method to ensure all components are updated
        super.update(deltaTime);
    }
}

export default MovingPlatform;