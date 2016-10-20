(function(){
  'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject=['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
  var toBuy=this;
  toBuy.items = ShoppingListCheckOffService.getToBuyItems();

  toBuy.bought = function(index){
    console.log("index",index);
    ShoppingListCheckOffService.bought(index);
  };
}

AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var alreadyBought=this;
  alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();

}

function ShoppingListCheckOffService(){
  var service=this;
  var toBuyItems = [
    {
      name: "Cookie",
      quantity: 20
    },
    {
      name: "Brownies",
      quantity: 50
    },
    {
      name: "Bottles of Coke",
      quantity: 30
    },
    {
      name: "Pancakes",
      quantity: 200
    },
    {
      name: "Toilet rolls",
      quantity: 200
    }
  ];

  var alreadyBoughtItems = [];

  service.getToBuyItems = function(){
    return toBuyItems;
  };

  service.getAlreadyBoughtItems = function(){
    return alreadyBoughtItems;
  };

  service.bought = function(index){
    alreadyBoughtItems.push(toBuyItems[index]);
    toBuyItems.splice(index,1);
  };

}

})();
