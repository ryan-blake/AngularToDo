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

app.controller("histCtrl", ["$scope", "todoLists",

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


   }
]);
