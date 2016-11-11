(function(){
  "use strict";

  angular.module('public')
  .controller('InfoController',InfoController);

  InfoController.$inject = ['user','menuitem'];

  function InfoController(user,menuitem){
    var info = this;
    info.user=user;
    info.menuitem=menuitem;
    console.log(info.user);
  }
})();
