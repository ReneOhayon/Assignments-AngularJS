(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['MenuDataService', 'menu_items', '$stateParams'];
function ItemsController(MenuDataService, menu_items, $stateParams) {
  var ctl = this;
  ctl.items = menu_items;
}

})();
