import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import { Images } from '../engine/resources.js';

class ConveyorBelt extends GameObject {
    constructor(x, y, width, height, image, direction = 'right', speed = 100) {
        super(x, y);

        let colour = direction === 'right' ? 'green' : 'red';

        this.addComponent(new Renderer(colour, width, height, colour));
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));

        this.direction = direction; 
        this.speed = speed;
        this.tag = "conveyorBelt";
    }

    update(deltaTime) {
        super.update(deltaTime);
    }
}

export default ConveyorBelt;