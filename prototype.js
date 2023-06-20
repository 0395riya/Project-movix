// let arr =   [ 2,3,5,76,7]

// Array.prototype.myFun = function() {
    
// }



let obj = {
     name:"aku",
      showFun:() =>{
        console.log("name>>" , this.name);
      },
      myShowFun:function () {
        console.log("name>>" , this.name);
         
      }
}


obj.showFun()
obj.myShowFun()