(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  var currentUser = {};

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

  service.saveUser = function(user){
    service.currentUser=user;
  };

  service.getUser = function(){
    // var c = {
    //   firstname: "R",
    //   last: "R",
    //   email: "r@r",
    //   phone: "123",
    //   favorite: "A1"
    // }

    // service.currentUser=c;
    return service.currentUser;
  };

  service.getMenuItem = function(){
    if (service.currentUser===undefined || service.currentUser.favorite===undefined)
      return null;
    return $http.get(ApiPath + '/menu_items/' + service.currentUser.favorite + '.json').then(function (response) {
      return response.data;
    },function(response){return null;});
  };
}
})();
