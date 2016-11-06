(function () {
'use strict';

angular.module('spinner')
.component('spinner', {
  templateUrl: 'src/spinner/spinner.template.html',
  bindings: {
    items: '<'
  },
  controller: 'SpinnerController'
});

})();
