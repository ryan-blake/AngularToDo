(function() {
  var app = angular.module("toDoApp", ["firebase"]);

  app.factory("TodoFactory", ["$firebaseArray",
   ToDoFactory = function($firebaseArray) {
    var ref = new Firebase("https://what2do-4dd97.firebaseio.com/");
    console.log("hi")
    return $firebaseArray(ref);

   }
  ]);

function HomeCtrl($scope, TodoFactory){

    $scope.todos = todoLists

    $scope.user = "";

    $scope.priority = {
     repeatSelect: null,
     availableOptions: [
       {id: '1', name: 'high'},
       {id: '2', name: 'med'},
       {id: '3', name: 'low'}
     ],
    };

    // $scope.ratings = ["low", "med", "high"]

    var ref = new Firebase("https://what2do-4dd97.firebaseio.com/" );

    $scope.addTodo= function() {
        $scope.todos.$add({
          from: $scope.user,
          content: $scope.todo,
          createdAt: Firebase.ServerValue.TIMESTAMP,
          completed: $scope.completed == false,
          priority: $scope.priority
        });
      $scope.todo = "";
     };

    // if the messages are empty, add something for fun!
    // disect addition of todo format
    $scope.todos.$loaded(function() {
      if ($scope.todos.length === 0) {
        $scope.todos.$add({
          from: "UserSays",
          content: "Enter what to do!",
          createdAt: Firebase.ServerValue.TIMESTAMP,
          completed: false,
          priority: "med"
        });
       }
    });

   $scope.checkTrue = function(todo) {
       ref.child(todo.$id).update({completed: true});
   };

  $scope.lessThanWeekOld = function(createdAt) {
      var currentTime = new Date();
      var msTime = currentTime.getTime();
      var timeElapsed = msTime - createdAt;
      if (timeElapsed <= 6048000000) {
        return true
      }
      else {
        return false
      }
  };

  $scope.changePriorityDown = function(todo) {
      if (todo.priority == "1") {
       ref.child(todo.$id).update({priority: "2"})
      } else {
       ref.child(todo.$id).update({priority: "3"})
      }
    };
  $scope.changePriorityUp = function(todo) {
    if (todo.priority == "3") {
     ref.child(todo.$id).update({priority: "2"})
    } else {
     ref.child(todo.$id).update({priority: "1"})
    }
  };

}


angular
  .module('toDoApp', ['ui.router', 'homeCtrl'])
  .controller('HomeCtrl', ["$scope", "TodoFactory", HomeCtrl])

})();
