(function() {
  var app = angular.module("toDoApp", ["firebase"]);
// pomoStuff
  app.factory("toDoLists", ["$firebaseArray",
   function($firebaseArray) {
    var ref = new Firebase("https://what2do-4dd97.firebaseio.com/");
    return $firebaseArray(ref);
   }
  ]);
  
  app.controller("homeCtrl", ["$scope", "$inteval","pomoStuff",
    function($scope, pomoStuff) {
    var ref = new Firebase("https://pomo-fd012.firebaseio.com" );
    }
  ])
    angular
      .module('pomoApp', ['ui.router', 'homeCtrl'])

})();
