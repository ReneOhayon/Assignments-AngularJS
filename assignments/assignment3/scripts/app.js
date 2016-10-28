(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: '../grid/foundItems.template.html',
    scope: {
      items: '<',
      onRemove: '&onRemove'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController(){
    var dir = this;

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var ctrl = this;
  ctrl.foundItems = [];
  ctrl.searchTerm;

  ctrl.onSearch = function(){
    var promise =  MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
    promise.then(function (response) {
    ctrl.foundItems = filter(response.data.menu_items);
    })
    .catch(function (error) {
      console.log(error);
    })
  };

  ctrl.onRemove = function(index){
    ctrl.foundItems.splice(index,1);
  };

  function filter(items){
    var found = [];
    if(ctrl.searchTerm===undefined || ctrl.searchTerm.trim().length==0)
      return items;
    for (var i=0;i<items.length;i++){
      var item = items[i];
      if(item.description.indexOf(ctrl.searchTerm)!=-1)
        found.push(item);
      }
    return found;
  }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm){
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
    return response;
  };

}

})();
