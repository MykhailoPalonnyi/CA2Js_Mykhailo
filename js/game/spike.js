import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import { Images } from '../engine/resources.js';

class Spike extends GameObject {
    constructor(x, y, width, height) {
        super(x, y);
        this.addComponent(new Renderer('black', width, height, Images.spike));
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
        this.tag = "spike";
    }
}

export default Spike;