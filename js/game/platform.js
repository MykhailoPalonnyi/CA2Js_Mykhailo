import GameObject from '../engine/gameobject.js'
import Renderer from '../engine/renderer.js'
import Physics from '../engine/physics.js'
import HorizontalTileRenderer from '../engine/horizontalTileRenderer.js'

class Platform extends GameObject
{
    constructor(x, y, w, h, img, color="brown")
    {
        // Call the parent class's constructor (GameObject) with the initial position (x, y)
    super(x, y);

    // Add a HorizontalTileRenderer component to handle rendering the platform
    // The platform is rendered with the specified color, width, height, and image
    // The HorizontalTileRenderer tiles the image horizontally across the platform
    this.addComponent(new HorizontalTileRenderer(color, w, h, img));

    // Add a Physics component to handle collision detection
    // The Physics component is initialized with zero velocity, acceleration, and gravity
    this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }));

    // Set a tag for the platform to identify it in the game
    this.tag = "platform";

    }
}

export default Platform

