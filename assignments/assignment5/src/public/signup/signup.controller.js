(function(){
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService'];
function SignUpController(MenuService) {
  var reg = this;
  reg.saved = false;

  reg.submit = function () {
    reg.completed = true;
    MenuService.saveUser(reg.user);
    reg.saved=true;
  };
}

})();
