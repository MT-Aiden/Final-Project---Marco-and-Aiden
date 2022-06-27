/* global Phaser */

// Copyright (c) 2022 Aiden McLeod All rights reserved
//
// Created by: Aiden McLeod
// Created on: May 2022
// This is the Game Scene

class GameScene extends Phaser.Scene {
  // create an snake
  createSnake() {
    const snakeXLocation = Math.floor(Math.random() * 1920) + 1
    let snakeYVelocity = Math.floor(Math.random() * 400) + 200
    snakeYVelocity *= Math.round(Math.random()) ? 1 : -1
    const anSnake = this.physics.add.sprite(snakeXLocation, -100, "snake")
    anSnake.body.velocity.y = snakeYVelocity
    anSnake.body.velocity.x = 0
    this.snakeGroup.add(anSnake)
  }
  createSnake2() {
    const snakeYLocation = Math.floor(Math.random() * 1080) + 1
    let snakeXVelocity = Math.floor(Math.random() * 400) + 200
    snakeXVelocity *= Math.round(Math.random()) ? 1 : -1
    const anSnake = this.physics.add.sprite(-100, snakeYLocation, "snake2")
    anSnake.body.velocity.x = snakeXVelocity
    anSnake.body.velocity.y = 0
    this.snakeGroup.add(anSnake)
  }

  constructor() {
    super({ key: "gameScene" })

    this.background = null
    this.timer = 0
    this.timeActive = true
    this.gameOverTextStyle = {
      font: "65px Arial",
      fill: "#ff0000",
      align: "center",
    }
  }

  init(data) {
    this.cameras.main.setBackgroundColor("#0x5f6e7a")
  }

  preload() {
    console.log("Game Scene")

    // images
    this.load.image("startBackground", "assets/background.png")
    this.load.image("frog", "assets/Frog.png")
    this.load.image("snake", "assets/snake.png")
    this.load.image("snake2", "assets/snake2.png")
    this.load.image("fly", "assets/fly.png")
  }

  create(data) {
    this.background = this.add.image(0, 0, "startBackground").setScale(2.7)
    this.background.setOrigin(0, 0)

    this.frog = this.physics.add.sprite(1920 / 2, 1080 - 100, "frog")

    // create a group of the snakes
    this.snakeGroup = this.add.group()
    this.createSnake()
    this.createSnake2()

    // Collisions between frog and snakes
    this.physics.add.collider(
      this.frog,
      this.snakeGroup,
      function (frogCollide, snakeCollide) {
        this.physics.pause()
        snakeCollide.destroy()
        frogCollide.destroy()
        this.GameOverText = this.add
          .text(
            1920 / 2,
            1080 / 2,
            "Game Over!\nClick to play again.",
            this.gameOverTextStyle
          )
          .setOrigin(0.5)
        this.GameOverText.setInteractive({ useHandCursor: true })
        this.GameOverText.on("pointerdown", () => this.scene.start("gameScene"))
      }.bind(this)
    )
  }

  update(time, delta) {
    this.timer += delta
    //called 60 times a second, hopefully!

    //Movement
    const keyLeftObj = this.input.keyboard.addKey("LEFT")
    const keyRightObj = this.input.keyboard.addKey("RIGHT")
    const keyUpObj = this.input.keyboard.addKey("UP")
    const keyDownObj = this.input.keyboard.addKey("DOWN")

    if (keyLeftObj.isDown === true) {
      this.frog.x -= 15
      if (this.frog.x < 0) {
        this.frog.x = 0
      }
    }
    if (keyRightObj.isDown === true) {
      this.frog.x += 15
      if (this.frog.x > 1920) {
        this.frog.x = 1920
      }
    }

    if (keyUpObj.isDown === true) {
      this.frog.y -= 15
      if (this.frog.y > 1920) {
        this.frog.y = 1920
      }
    }

    if (keyDownObj.isDown === true) {
      this.frog.y += 15
      if (this.frog.y > 1920) {
        this.frog.y = 1920
      }
    }
    if (this.timer > 1000) {
      this.timer = this.timer -= 1000
      var snakePosition = Math.floor(Math.random() * 2) + 1
      if (this.timeActive == true) {
        if (snakePosition == 1) {
          this.createSnake()
        }
        if (snakePosition == 2) {
          this.createSnake2()
          this.timer = this.timer -= 1000
        }
      }
    }
  }
}
export default GameScene
