namespace SpriteKind {
    export const ammo = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.ammo, function (sprite, otherSprite) {
    playerammo.value += 5
    otherSprite.destroy(effects.rings, 100)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (atkstatus == 1) {
        rocketLauncher = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . 5 5 . . . . . . . 
            . . . . . . . 5 5 . . . . . . . 
            . . . . . . 5 7 7 5 . . . . . . 
            . . . . . . 5 7 7 5 . . . . . . 
            . . . . . . 5 7 7 5 . . . . . . 
            . . . . . . 5 7 7 5 . . . . . . 
            . . . . . . 5 7 7 5 . . . . . . 
            . . . . . 2 5 7 7 5 2 . . . . . 
            . . . . 2 2 5 7 7 5 2 2 . . . . 
            . . . 2 2 2 5 5 5 5 2 2 2 . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, Player1, 0, -100)
        rocketLauncher.startEffect(effects.fire, 500)
        music.play(music.createSoundEffect(WaveShape.Sine, 29, 2589, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
        playerammo.value += -10
        pause(100)
    } else {
        Player1.sayText("Ammmoo!!!!!!!")
        pause(500)
        Player1.sayText("")
    }
})
function player1_ammo () {
    playerammo = statusbars.create(4, 60, StatusBarKind.Energy)
    playerammo.setColor(7, 2)
    playerammo.positionDirection(CollisionDirection.Left)
    playerammo.setBarBorder(1, 5)
    playerammo.setLabel("ammo")
    playerammo.setStatusBarFlag(StatusBarFlag.SmoothTransition, true)
    playerammo.value = 100
}
statusbars.onStatusReached(StatusBarKind.Energy, statusbars.StatusComparison.LTE, statusbars.ComparisonType.Percentage, 30, function (status) {
    Player1.sayText("low ammo!! we need it more!!")
    pause(2000)
    Player1.sayText("")
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    otherSprite.destroy(effects.hearts, 100)
})
statusbars.onZero(StatusBarKind.Energy, function (status) {
    atkstatus = 0
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    sprites.destroy(otherSprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.UntilDone)
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite)
    scene.cameraShake(4, 500)
})
let item02: Sprite = null
let item01: Sprite = null
let myEnemy1: Sprite = null
let myEnemy2: Sprite = null
let rocketLauncher: Sprite = null
let atkstatus = 0
let playerammo: StatusBarSprite = null
let Player1: Sprite = null
effects.starField.startScreenEffect(5000)
Player1 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . 9 . . . . . . . . 
    . . . . . . . 9 . . . . . . . . 
    . . . . . . 9 9 9 . . . . . . . 
    . . . . . . 9 9 9 . . . . . . . 
    . . . . . 9 9 9 9 9 . . . . . . 
    . . . . . 9 9 9 9 9 . . . . . . 
    . . . . 9 9 9 9 9 9 9 . . . . . 
    . . . . 9 . . . 9 9 9 . . . . . 
    . . . 9 9 . 9 9 . 9 9 9 . . . . 
    . . . 9 9 . 9 9 . 9 9 9 . . . . 
    . . 9 9 9 . . . 9 . . 9 9 . . . 
    . . 9 9 9 . 9 9 9 9 . 9 9 . . . 
    . 9 9 9 9 . 9 9 9 9 . 9 9 9 . . 
    9 9 9 9 9 9 9 9 9 9 9 9 9 9 9 . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(Player1)
Player1.setStayInScreen(true)
player1_ammo()
game.onUpdateInterval(randint(1000, 2000), function () {
    myEnemy2 = sprites.createProjectileFromSide(assets.image`PurpleRocket`, randint(-10, 10), 100)
    myEnemy2.x = randint(5, 155)
    myEnemy2.setKind(SpriteKind.Enemy)
})
game.onUpdate(function () {
    if (playerammo.value > 10) {
        atkstatus = 1
    }
})
game.onUpdateInterval(1000, function () {
    myEnemy1 = sprites.createProjectileFromSide(assets.image`UFO`, randint(-5, 5), 50)
    myEnemy1.x = randint(5, 155)
    myEnemy1.setKind(SpriteKind.Enemy)
})
game.onUpdateInterval(randint(4000, 2000), function () {
    item01 = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
        . . 7 . . . . . . . . . . 7 . . 
        . . 7 . . . . . . . . . . 7 . . 
        . . 7 . . . . 2 2 . . . . 7 . . 
        . . 7 . . . . 2 2 . . . . 7 . . 
        . . 7 . . 2 2 2 2 2 2 . . 7 . . 
        . . 7 . . 2 2 2 2 2 2 . . 7 . . 
        . . 7 . . . . 2 2 . . . . 7 . . 
        . . 7 . . . . 2 2 . . . . 7 . . 
        . . 7 . . . . . . . . . . 7 . . 
        . . 7 . . . . . . . . . . 7 . . 
        . . 7 7 7 7 7 7 7 7 7 7 7 7 . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, 0, 100)
    item01.x = randint(5, 155)
    item01.setKind(SpriteKind.Food)
})
game.onUpdateInterval(randint(4000, 2000), function () {
    item02 = sprites.createProjectileFromSide(assets.image`PurpleRocket0`, 0, 100)
    item02.x = randint(5, 155)
    item02.setKind(SpriteKind.ammo)
})
