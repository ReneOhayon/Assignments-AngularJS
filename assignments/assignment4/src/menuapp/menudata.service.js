(function () {
'use strict';

angular.module('data')
.service('MenuDataService',MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$q','$http','ApiBasePath'];
function MenuDataService($q,$http,ApiBasePath){
    var service = this;

    service.getAllCategories = function(){
      return $http({
       method: "GET",
       url: (ApiBasePath + "/categories.json")
     }).then(function(result){
       return result.data;
     });
    };

    //this method should return a promise which is a result of using the `$http` service, using the following REST API endpoint: https://davids-restaurant.herokuapp.com/categories.json
    service.getItemsForCategory = function(categoryShortName){
      return $http({
       method: "GET",
       url: (ApiBasePath + "/menu_items.json"),
       params: {'category':categoryShortName}
     }).then(function (result){
       return result.data.menu_items;
     });
    };
}

MenuDataService
})();
