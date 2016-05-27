var app = angular.module("sampleApp", ["firebase"]);
// var app = angular.module("todoApp", ["firebase"]);

app.factory("chatMessages", ["$firebaseArray",
// app.factory("todoLists", ["$firebaseArray",

  function($firebaseArray) {
    // create a reference to the database where we will store our data
    var randomRoomId = Math.round(Math.random() * 100000000);
    // var randomRoomID = 1 ---room id irrelevant search by user/complete/text/timestamp
    var ref = new Firebase("https://what2do-4dd97.firebaseio.com/" );

    return $firebaseArray(ref);
  }
]);

app.controller("ChatCtrl", ["$scope", "chatMessages",
// app.controller("todoCtrl", ["$scope", "todoList",

  function($scope, chatMessages) {
    // function($scope, todoLists) {

    $scope.user = "Guest " + Math.round(Math.random() * 100);
    // $scope.authUser= message.user ------unsure for now

    $scope.messages = chatMessages;
    // $scope.todos = todoLists;


    $scope.addMessage = function() {
      // addTodo
      // $add on a synchronized array is like Array.push() except it saves to the database!
      $scope.messages.$add({
        // $scope.todos.$add({
        from: $scope.user,
        content: $scope.message,
        // content: $scope.todo,
        timestamp: Firebase.ServerValue.TIMESTAMP

      });

      $scope.message = "";
      // $scope.todo = "";
    };

    // if the messages are empty, add something for fun!
    // disect addition of todo format
    $scope.messages.$loaded(function() {
      if ($scope.messages.length === 0) {
        $scope.messages.$add({
          from: "UserSays",
          content: "Enter what 2 do!",
          timestamp: Firebase.ServerValue.TIMESTAMP
        });
     }
    });
  }


]);
