var app = angular.module("toDoApp", ["firebase"]);

app.factory("todoLists", ["$firebaseArray",

  function($firebaseArray) {
    // create a reference to the database where we will store our data
    // var randomRoomId = Math.round(Math.random() * 100000000);
    var randomRoomID = 1
    //  ---room id irrelevant search by user/complete/text/timestamp
    var ref = new Firebase("https://what2do-4dd97.firebaseio.com/" );

    return $firebaseArray(ref);
  }
]);



app.controller("homeCtrl", ["$scope", "todoLists",

    function($scope, todoLists) {

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
]);
