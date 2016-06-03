(function() {
  function config($stateProvider, $locationProvider) {
  $locationProvider
   .html5Mode({
       enabled: true,
       requireBase: false
   });
   $stateProvider
     .state('home', {
         url: '/',
         controller: 'HomeCtrl as home',
         templateUrl: '/templates/home.html'
     })
     .state('history', {
    url: '/history',
    controller: 'homeCtrl as home',
    templateUrl: '/templates/history.html'
      });
    }

  angular
   .module('toDoApp', ['ui.router'])
   .config(config);
})();
