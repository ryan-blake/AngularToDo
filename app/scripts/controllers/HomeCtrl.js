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



app.controller("todoCtrl", ["$scope", "todoLists",

    function($scope, todoLists) {

    $scope.user = "";

    $scope.todos = todoLists;

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
          content: "Enter what 2 do!",
          createdAt: Firebase.ServerValue.TIMESTAMP,
          completed: true
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

    // $scope.trueTodo = function(completed) {
    //   var old = [];
    //   for(var i =0; i < todoLists.length; i++){
    //       console.log(todoLists[i])
    //       }
    // };
    $scope.priority = {
     repeatSelect: null,
     availableOptions: [
       {id: 'high', name: 'high'},
       {id: 'med', name: 'med'},
       {id: 'low', name: 'low'}
     ],
        selectedOption: {id: '2', name: 'med'}
    };


  }
]);
