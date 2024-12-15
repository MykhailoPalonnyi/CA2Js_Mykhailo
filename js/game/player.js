import GameObject from '../engine/gameobject.js';
import Animation from '../engine/Animation.js';
import Renderer from '../engine/renderer.js';
import Animator from '../engine/Animator.js';
import Physics from '../engine/physics.js';
import Input from "../engine/input.js";
import { Images, AudioFiles } from '../engine/resources.js';
import Platform from './platform.js';
import MovingPlatform from './movingPlatform.js';
import FinishPoint from './finishPoint.js';
import UI from '../engine/ui.js';
import ConveyorBelt from './conveyorBelt.js';
import Spike from './spike.js';

class Player extends GameObject {
    constructor(x, y, w, h) {
        super(x, y);
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }));
        this.addComponent(new Input());
        this.animator = new Animator('red', w, h);
        this.addComponent(this.animator);

        let run = new Animation('red', w, h, this.getImages("./resources/images/player/Run", "Run", 6), 10);
        let idle = new Animation('red', w, h, this.getImages("./resources/images/player/Idle", "Idle", 4), 10);
        let jump = new Animation('red', w, h, this.getImages("./resources/images/player/Jump", "Jump", 2), 10);

        this.animator.addAnimation("run", run);
        this.animator.addAnimation("idle", idle);
        this.animator.addAnimation("jump", jump);
        this.animator.setAnimation("idle");

        this.tag = "player";
        this.isOnPlatform = false;
        this.direction = 1;
        this.defaultSpeed = 100;
        this.speed = 120;
        this.isOnPlatform = false;
        this.isJumping = false;
        this.jumpForce = 250;
        this.jumpTime = 1.0;
        this.jumpTimer = 0;
        this.startPoint = { x: x, y: y };
        this.jumpCooldown = 2; 
        this.jumpCooldownTimer = 0; 

        this.dashSpeed = 400;
        this.dashDuration = 0.2;
        this.dashTimer = 0;
        this.isDashing = false;
    }

    update(deltaTime) {
        const physics = this.getComponent(Physics);
        const input = this.getComponent(Input);

        
        if (input.isKeyDown("ShiftLeft") && !this.isDashing) {
            this.startDash();
        }

        
        if (this.isDashing) {
            this.updateDash(deltaTime);
        } else {
            if (input.isKeyDown("ArrowRight")) {
                physics.velocity.x = this.speed;
                this.direction = 1;
                this.animator.setAnimation("run");
                AudioFiles.walk.play();
            } else if (input.isKeyDown("ArrowLeft")) {
                physics.velocity.x = -this.speed;
                this.direction = -1;
                this.animator.setAnimation("run");
                AudioFiles.walk.play();
            } else {
                physics.velocity.x = 0;
                this.animator.setAnimation("idle");
                AudioFiles.walk.pause();
            }
        }

        if (input.isKeyDown("KeyP")) {
            this.game.setPause();
        }

        if (input.isKeyDown("ArrowUp") && this.isOnPlatform) {
            this.startJump();
        }

        
        if (this.jumpCooldownTimer > 0) {
            this.jumpCooldownTimer -= deltaTime;
        }

        if (this.isJumping) {
            this.updateJump(deltaTime);
        }

        
        const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform || obj instanceof MovingPlatform || obj instanceof ConveyorBelt);
        for (const platform of platforms) {
            if (physics.isColliding(platform.getComponent(Physics))) {
                if (!this.isJumping) {
                    physics.acceleration.y = 0;
                    physics.velocity.y = 0;
                    this.y = platform.y - this.getComponent(Renderer).height;
                    this.isOnPlatform = true;

                   
                    if (platform instanceof MovingPlatform) {
                        this.x += platform.getComponent(Physics).velocity.x * deltaTime;
                        this.y += platform.getComponent(Physics).velocity.y * deltaTime;
                    }

                   
                    if (platform instanceof ConveyorBelt) {
                        if (platform.direction === 'right') {
                            physics.velocity.x += platform.speed;
                        } else if (platform.direction === 'left') {
                            physics.velocity.x -= platform.speed;
                        }
                    }
                }
            }
        }

        if (this.y > this.game.canvas.height) {
            this.x = this.startPoint.x;
            this.y = this.startPoint.y;
        }

        const finishPoint = this.game.gameObjects.find((obj) => obj instanceof FinishPoint);
        if (finishPoint && physics.isColliding(finishPoint.getComponent(Physics))) {
            this.game.setPause();
            this.showCompletionLabel();
        }

        const spikes = this.game.gameObjects.filter((obj) => obj instanceof Spike);
        for (const spike of spikes) {
            if (physics.isColliding(spike.getComponent(Physics))) {
                this.resetPlayer();
            }
        }

        super.update(deltaTime);
    }

    startJump() {
        if (this.isOnPlatform && this.jumpCooldownTimer <= 0) {
            this.isJumping = true;
            this.jumpTimer = this.jumpTime;
            this.getComponent(Physics).velocity.y = -this.jumpForce;
            this.isOnPlatform = false;
            this.animator.setAnimation("jump");
            this.jumpCooldownTimer = this.jumpCooldown; 
        }
    }

    updateJump(deltaTime) {
        this.jumpTimer -= deltaTime;
        if (this.jumpTimer <= 0 || this.getComponent(Physics).velocity.y > 0) {
            this.isJumping = false;
        }
    }


    getImages(path, baseName, numImages) {
        let images = [];
        for (let i = 1; i <= numImages; i++) {
            let img = new Image();
            img.src = path + "/" + baseName + " (" + i + ").png";
            images.push(img);
        }
        return images;
    }

    showCompletionLabel() {
        const uiObject = new GameObject(0, 0);
        const ui = new UI('You beat the game! GOIDA', this.game.canvas.width / 2, this.game.canvas.height / 2, '30px Arial', 'white', 'center', 'middle');
        uiObject.addComponent(ui);
        this.game.addGameObject(uiObject);
    }

    resetPlayer() {
        this.x = this.startPoint.x;
        this.y = this.startPoint.y;
        this.getComponent(Physics).velocity.x = 0;
        this.getComponent(Physics).velocity.y = 0;
    }
}

export default Player;