import GameObject from '../engine/gameobject.js';
import Animation from '../engine/Animation.js';
import Renderer from '../engine/renderer.js';
import Animator from '../engine/Animator.js';
import Physics from '../engine/physics.js';
import Input from "../engine/input.js";
import { Images, AudioFiles } from '../engine/resources.js';
import Platform from './platform.js';
import { RunImages } from '../engine/resources.js';

class Player extends GameObject {
    constructor(x, y, w, h) {
        super(x, y);
        this.addComponent(new Physics({ x: 0, y: 0 }, { x: 0, y: 0 }));
        this.addComponent(new Input());
        this.animator = new Animator('red', w, h);
        this.addComponent(this.animator);

        // Add animations
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
        this.speed = this.defaultSpeed;
        this.isOnPlatform = false;
        this.isJumping = false;
        this.jumpForce = 300;
        this.jumpTime = 1.0;
        this.jumpTimer = 0;
        this.startPoint = { x: x, y: y };

       
        this.isDashing = false;
        this.dashSpeed = 300; 
        this.dashDuration = 0.2; 
        this.dashTimer = 0;
        this.dashCooldown = 1.0; 
        this.cooldownTimer = 0;
    }

    update(deltaTime) {
        const physics = this.getComponent(Physics);
        const input = this.getComponent(Input);

        
        if (input.isKeyDown("ShiftLeft") && !this.isDashing && this.cooldownTimer <= 0) {
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

        if (this.isJumping) {
            this.updateJump(deltaTime);
        }

        
        if (!this.isJumping && physics.velocity.y === 0) {
            if (physics.velocity.x !== 0) {
                this.animator.setAnimation("run"); 
            } else {
                this.animator.setAnimation("idle"); 
            }
        }

        const platforms = this.game.gameObjects.filter((obj) => obj instanceof Platform);
        for (const platform of platforms) {
            if (physics.isColliding(platform.getComponent(Physics))) {
                if (!this.isJumping) {
                    physics.acceleration.y = 0;
                    physics.velocity.y = 0;
                    this.y = platform.y - this.getComponent(Renderer).height;
                    this.isOnPlatform = true;
                }
            }
        }

        if (this.y > this.game.canvas.height) {
            this.x = this.startPoint.x;
            this.y = this.startPoint.y;
        }

        
        if (this.cooldownTimer > 0) {
            this.cooldownTimer -= deltaTime;
        }

        super.update(deltaTime);
    }

    startDash() {
        this.isDashing = true;
        this.dashTimer = this.dashDuration;
        this.speed = this.dashSpeed; 
    }

    updateDash(deltaTime) {
        this.dashTimer -= deltaTime;
        if (this.dashTimer <= 0) {
            this.isDashing = false;
            this.speed = this.defaultSpeed; 
            this.cooldownTimer = this.dashCooldown; 
        }
    }

    startJump() {
        if (this.isOnPlatform) {
            this.isJumping = true;
            this.jumpTimer = this.jumpTime;
            this.getComponent(Physics).velocity.y = -this.jumpForce;
            this.isOnPlatform = false;
            this.animator.setAnimation("jump");
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
}

export default Player;