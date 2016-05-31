var app = angular.module("2DoApp", ["firebase"]);

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


    $scope.addTodo= function() {
      // addTodo
      // $add on a synchronized array is like Array.push() except it saves to the database!
        $scope.todos.$add({

          from: $scope.user,
          content: $scope.todo,
          createdAt: Firebase.ServerValue.TIMESTAMP,
          completed : false 
          // completed: $scope.checked


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
          timestamp: Firebase.ServerValue.TIMESTAMP
        });
       }
    });

    // $scope.lessThanWeekOld = function() {
    //   timeElapsed = Date.now - createdAt;
    //   if (timeElapsed >=  6048000000)
    //    return true;
    //    else
    //    return false;
    // };
  }



]);
