var dog, dogImg, happyDog, foodS, database, foodStock;
var feedTime, lastFed, foodObj, feedButton, addFoodButton;
//var lastFed = hour(); // why creating 2 same variables, computer will get confused
function preload(){
//error - images folder is not there
  dogImg = loadImage("images/dogImg.png")
	happyDog = loadImage("images/dogImg1.png")
}

function setup() {
  database = firebase.database()
  createCanvas(800, 650);

  foodObj = new Food();
  //it should be Food(), not Food, this will not create the object
  
  dog = createSprite(650,350,20,20)
  dog.addImage(dogImg)
  dog.scale = 0.25

  feedButton = createButton("Feed the Dog")
  feedButton.position(500,95)
  feedButton.mousePressed(feedDog)

  addFoodButton = createButton("Add Food")
  addFoodButton.position(600,95)
  addFoodButton.mousePressed(addFood)
}


function draw() {  
  background('#0678BE') ;

  foodObj.display();

  feedTime = database.ref('feedTime')
  feedTime.on("value", function(data){
    lastFed = data.val()
  })

  console.log(lastFed)
  drawSprites();
  
  fill("red")
  textSize(30)
  if(lastFed >= 12){
    text("Last Fed: " + lastFed%12 + "PM", 60,550)
  } else if(lastFed == 0){
    text("Last Fed: 12 AM", 60, 550)
  } else{
    text("Last Fed: " + lastFed + "AM", 60,550)
  }
  //text("Last Fed: " + feedTime, 60,550)
}

function feedDog(){
   dog.addImage(happyDog);

   foodObj.updateStock(foodObj.getStock() - 1);
   database.ref('/').update({
     food:getStock(),
     feedTime : Hour()
   })
}

function addFood(){
  foodStock++
  database.ref('/').update({
    food:foodStock
  })
}

function checkTime(){
  database.ref('/').update({
    feedtime: lastFed
  })
}