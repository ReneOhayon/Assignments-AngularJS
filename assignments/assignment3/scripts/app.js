(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'grid/foundItems.template.html',
    scope: {
      items: '<',
      showLoader: '<',
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
  ctrl.searchTerm="";
  ctrl.showLoader = false;
  ctrl.hasError=false;

  ctrl.onSearch = function(){
    // Initialise loader and error parameters
    ctrl.hasError=false;
    ctrl.showLoader = true;

    // Calling the service
    var promise =  MenuSearchService.getMatchedMenuItems(ctrl.searchTerm,ctrl.onError);
    promise.then(function (data) {
    ctrl.foundItems = data;
    })
    .catch(function (error) {
      ctrl.hasError=true;
      console.log(error);
    })
    .finally(function(){
      ctrl.showLoader = false;
    })
  };

  ctrl.onRemove = function(index){
    ctrl.foundItems.splice(index,1);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  function retrieveItems(searchTerm){
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    });
    return response;
  }

  service.getMatchedMenuItems = function(searchTerm){
    var promise = retrieveItems(searchTerm);
    return promise.then(function(result){
      return filter(result.data.menu_items,searchTerm);
    });
  };

  function filter(items,searchTerm){
    var found = [];
    if(searchTerm===undefined || searchTerm.trim().length==0)
      return items;
    for (var i=0;i<items.length;i++){
      var item = items[i];
      if(item.description.indexOf(searchTerm)!=-1)
        found.push(item);
      }
    return found;
  }
}

})();
