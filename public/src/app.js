var angular = angular.module("app",['angular-repeat-n'])

angular.controller("MainCtrl", function MainCtrl($http,$scope){

    $http({
      method: 'GET',
      url: '../data/data.json'
    }).then(function successCallback(response) {
       $scope.data = response.data;
    }, function errorCallback(response) {
       alert(response)
    });
});

angular.component('filtro', {
  templateUrl: '../componentes/filtro/filtro.html',
});

angular.component('resultado', {
  templateUrl: '../componentes/resultados/resultados.html',
  bindings: {
    datosHotel: '<'
  }
});