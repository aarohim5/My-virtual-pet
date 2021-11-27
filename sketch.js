var dog,happyDog,foodS,foodStock;
var database,position;
var dogImage,dogImage1;

function preload(){
    dogImage = loadImage("Dog.png");
    dogImage1 = loadImage("happydog.png");
}

function setup(){
    database = firebase.database();

    createCanvas(500,500);
    dog = createSprite(250,300,150,150);
    dog.addImage(dogImage);
    dog.scale = 0.15
 
    foodStock = database.ref("Food");
    foodStock.on("value",readStock);
    textSize(20);
}

function draw(){
    background("black");
    
    if(keyDown(UP_ARROW)){
        writeStock(foodS);
        dog.addImage(dogImage1);
    }
   
    drawSprites();
    fill("white");
    text("Food Remaining:"+foodS,170,200);
    textSize(13);
    text("Note:Press up arrow key to feed",130,10,300,20);
}


function writeStock(x){
    if(x<=0){
       x=0;
    }else{
      x=x-1;
    }
    database.ref('/').update({
        Food:x
    })
}
function readStock(data){
    foodS = data.val()
}
function showError(){
    console.log("error");
}
