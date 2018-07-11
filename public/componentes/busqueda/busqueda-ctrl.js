(function(angular) {
    'use strict';
    function FiltroController($scope,$http) {
        var ctrl = this;
        ctrl.mostrarDatosNombre = function(data){
            ctrl.nombre = data;
        }
        ctrl.mostrarDatosEstrella = function(data){
            console.log("imostrarDatosEstrellai",data);
            ctrl.estrella = data;
        }

        $http({
            method: 'GET',
            url: '../../data/data.json'
        }).then(function successCallback(response) {
            ctrl.data = response.data;
        }, function errorCallback(response) {
           alert(response)
        });
   }
    
    angular.module("app").component('busqueda', {
        templateUrl: '../componentes/busqueda/busqueda.html',
        controller: FiltroController,
        bindings: {
            datos: '&'
        }
    });
  })(window.angular);