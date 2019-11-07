//Overall 
var Character = function (sprite, x, y, speed) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.speed = speed;
};

Character.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

function randomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const enemyYaxis = [60, 145, 230];
const enemySpeed = [200, 400, 600, 100, 700, 300];

//2. Enemy 
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = -50;
    this.y = randomValue(enemyYaxis);
    this.speed = randomValue(enemySpeed);
};

Enemy.prototype = new Character();

var numberOfHeart = document.getElementsByClassName("fa fa-heart").length;

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for all computers.
	if (this.x<=505)
    	{this.x += this.speed * dt;}
	else
	    {this.x =-50;}

	// collision player and enemy
	if(player.x >= this.x-30 && player.x<=this.x+30){
		if(player.y>=this.y-10 && player.y<=this.y+10)
		{
            if (document.querySelector("ul").childElementCount === 1){
                document.querySelector('.point').textContent = count;
                document.getElementById('resultModal').classList.add("show");
                addHeart()
                player.reset();
                count = 0;
                document.querySelector('.score').textContent = count;
            } else {
        // player.removeHeart();
            removeHeart();
            player.reset();}}
		}
};



//3. Player
var Player = function(x, y, speed) {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.choices = [
        'images/char-boy.png',
        'images/char-cat-girl.png'
    ]
};

Player.prototype = new Character();

Player.prototype.reset = function (){
    player.x = 200;
    player.y = 400;
    }


Player.prototype.update = function() {
    //up
    if (this.direction === 'up') {
        this.y -= 83;
    //down
    } else if (this.y != 400 && this.direction === 'down') {
        this.y+=83;
    //right
    } else if (this.x != 400 && this.direction === 'right') {
        this.x += 100;
    //left
    } else if (this.x>0 && this.direction ==='left'){
        this.x -= 100;
    //space to change character
    } else if (this.direction ==='space') {
        player.changeGender();
    }
    this.direction=null;  //to stop the players after 1 step

    //Reset when you hit water
    if(this.y<25) {
        // this.addScore();
        this.reset();
        count += 25;
        document.querySelector('.score').textContent = count;
    }
}

Player.prototype.changeGender = function(){
    if (player.sprite === 'images/char-boy.png') {
        player.sprite = player.choices[1];
    } else if (player.sprite === 'images/char-cat-girl.png') {
        player.sprite = player.choices[0];
    }
}

//handleInput() FUNCTION
Player.prototype.handleInput = function(e){
    this.direction = e;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var enemy1 = new Enemy(-50, randomValue(enemyYaxis), randomValue(enemySpeed));
var enemy2 = new Enemy(-80, randomValue(enemyYaxis), randomValue(enemySpeed));
var enemy3 = new Enemy(-130, randomValue(enemyYaxis), randomValue(enemySpeed));
var enemy4 = new Enemy(-50, randomValue(enemyYaxis), randomValue(enemySpeed));
var enemy5 = new Enemy(-20, randomValue(enemyYaxis), randomValue(enemySpeed));


allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
allEnemies.push(enemy4);
allEnemies.push(enemy5);


var player = new Player(200, 600);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var count = 0;

var button1 = document.getElementById("startButton");
button1.onclick = function(){
    document.getElementById('introModal').classList.remove("show");
};

var button2 = document.getElementById("endButton");
button2.onclick = function(){
    document.getElementById('resultModal').classList.remove("show");
    player.reset();
}


function addHeart() {
    for (let h = document.querySelector("ul").childElementCount; h<3; h++ ){
        const listOfHeart = document.querySelectorAll('ul')[0];
        var addHeart = document.createElement("li");
        var addIcon = document.createElement("i");
        addIcon.classList.add("fa", "fa-heart");
        addHeart.appendChild(addIcon);
        listOfHeart.appendChild(addHeart);
    }
}


function removeHeart() {
    document.querySelector("ul").firstElementChild.remove();
}