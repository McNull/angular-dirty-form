var app = angular.module('myApp', ['ngRoute', 'dirtyForm', 'inform', 'ngAnimate', 'ui.bootstrap.dialog']);

app.config(function($routeProvider) {
  
  $routeProvider.when('/', {
    text: 'Home',
    templateUrl: '/demo/default.html'
  });
  
  $routeProvider.when('/view1', {
    text: 'View 1',
    templateUrl: '/demo/view1.html'
  });
  
  $routeProvider.when('/view2', {
    text: 'View 2',
    templateUrl: '/demo/view2.html'
  });
  
  $routeProvider.otherwise({
    redirectTo: '/'
  });
  
});

app.controller('MainCtrl', function($scope, $location, $route, dirtyFormConfig, $dialog) {
  
  dirtyFormConfig.confirm = function(msg) {
    return $dialog.confirm(msg).result;
  };
  
  $scope.routes = [];
  
  angular.forEach($route.routes, function(route, key) {
    if(key && !route.redirectTo) {
      $scope.routes.push(route);
    }
  });
  
  $scope.isActiveRoute = function(route) {
    return $route.current && $route.current.$$route === route;  
  };
  
});

app.controller('View1Ctrl', function($scope, $location, inform) {
  
  $scope.save = function() {
    $scope.form.ctrl.$setPristine(true);
    inform.add('Form data saved');
    $location.path('/');
  };
  
});

app.controller('View2Ctrl', function($scope, $location, inform) {
  
  $scope.send = function() {
    $scope.form.ctrl.$setPristine(true);
    inform.add('Message send');
    $location.path('/');
  };
  
});