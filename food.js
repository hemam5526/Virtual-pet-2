class Food{
   constructor(){
       //var lastFed;
       this.lastfed;
       this.foodStock=0; 
       this.image=loadImage("images/Milk.png"); // here you had written images/milk.png, but there is no images folder
   }
   
    display(){
      var x = 100, y = 300;

      imageMode(CENTER);
      image(this.image, 520, 350, 70, 70)

      if(this.foodStock != 0){
        for(var i = 0; i<this.foodStock; i++){
          if(i%10 == 0){
            x = 220;
            y = y+50;
          }
          image(this.image, x, y, 70, 70)
          x = x+30
        }
      }
    }

    getStock(){
      var foodStockref = database.ref('food');
      foodStockref.on("value",(data)=>{
       this.foodStock = data.val();
      })
    }
    
    updateStock(stock){
      database.ref('/').update({
      food: stock
      });
    }   

    //writeStock(x){
    //    if(x <= 0){
    //      x = 0;
    //    } else{
    //      x = x-1;
    //    }
      
    //    database.ref('/').update({
    //      food : x
    //   })
    //  }
}