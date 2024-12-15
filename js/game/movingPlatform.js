import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import { Images } from '../engine/resources.js';

class MovingPlatform extends GameObject {
    constructor(x, y, width, height, image, moveRange, moveSpeed, moveDirection = 'horizontal') {
        super(x, y);
        this.addComponent(new Renderer('gray', width, height, image));
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));

        this.moveRange = moveRange; 
        this.moveSpeed = moveSpeed; 
        this.moveDirection = moveDirection;
        this.startPosition = { x: x, y: y }; 
        this.direction = 1;
    }

    update(deltaTime) {
        if (this.moveDirection === 'horizontal') {
           
            this.x += this.moveSpeed * this.direction * deltaTime;

            if (Math.abs(this.x - this.startPosition.x) >= this.moveRange) {
                this.direction *= -1;
            }
        } else if (this.moveDirection === 'vertical') {
          
            this.y += this.moveSpeed * this.direction * deltaTime;

           
            if (Math.abs(this.y - this.startPosition.y) >= this.moveRange) {
                this.direction *= -1;
            }
        }

        super.update(deltaTime);
    }
}

export default MovingPlatform;