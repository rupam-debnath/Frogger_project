//player change function
$('.avatar').click(function() {

        player.sprite=$(this).attr('src');
        var name=$(this).attr('alt');
        $('#player')[0].innerText="Selected Player: "+name;
        //console.log(player.sprite);
        player.x= 202;
        player.y= 400;
});

// Enemies our player must avoid
var Enemy = function(x,y,speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started
        this.x=x;
        this.y=y;
        this.speed=speed;
        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player= function(x,y) {
    this.x=x;
    this.y=y;
    this.sprite= 'images/char-boy.png';
}

Player.prototype.update = function() {


};

var Score=0;
//console.log("Score: "+Score);
// Now instantiate your objects.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.y > 400 ) {
        this.y = 400;
    }
    if (this.x > 404) {
        this.x = 5;
    }
    if (this.x < 5) {
        this.x = 404;
    }
    if (this.y < 72) {
        //this.x = 202;
        console.log(this.y);
        this.y = 400;
        Score++;
        $('#score')[0].innerText="Score: "+Score;
        //console.log("Score: "+Score);
    };
};
// Place the player object in a variable called player
var player= new Player(202, 404);

// Place all enemy objects in an array called allEnemies
var allEnemies=[new Enemy(0,60,150), new Enemy(100,150,250), new Enemy(200,230,100)];

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt*(this.speed);
    if (this.x >= 505) {
        this.x = 0;
    }
};

// This listens for key presses and sends the keys to your
// check for collision between enemy and player
var checkCollisions = function() {

        allEnemies.forEach(function(Enemy) {
        xdiff=  Math.abs(player.x - Enemy.x);
        ydiff=  Math.abs(player.y - Enemy.y);
        if(xdiff<=70 && ydiff<=50) {
            console.log(player.y);
            player.x = 202;
            player.y = 400;
            console.log("Collision Occur");
        }
    });
}
// Player.handleInput() method. You don't need to modify this.
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        player.x -= 101;
    }
    if (keyPress == 'up') {
        player.y -= 82 ;
        //console.log(this.y);
    }
    if (keyPress == 'right') {
        player.x += 101;
    }
    if (keyPress == 'down' && player.y!=400) {
        player.y += 82;
    }
   // console.log('keyPress is: ' + keyPress);
};

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


