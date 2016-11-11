(function () {
"use strict";

angular.module('public')
.component('signupInfo', {
  templateUrl: 'src/public/signup/signup.template.html',
  bindings: {
    isInput: '<',
    user: '<'
  },
  controller: 'SignUpController'
});

})();
