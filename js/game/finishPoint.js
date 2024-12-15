import GameObject from '../engine/gameobject.js';
import Renderer from '../engine/renderer.js';
import Physics from '../engine/physics.js';
import { Images } from '../engine/resources.js';

class FinishPoint extends GameObject {
    constructor(x, y, width, height, color = 'gold') {
        super(x, y);
        this.addComponent(new Renderer(color, width, height));
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));
        this.tag = "finishPoint";
    }
}

export default FinishPoint;