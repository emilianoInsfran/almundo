(function(angular) {
    'use strict';
    function FiltroController($scope,$http) {
        var ctrl = this;

        ctrl.filtrarNombreHotel = function(busqueda){
            ctrl.nombre = busqueda;

            var data = {
                name: ctrl.nombre 
            };
        
            $http.post('http://localhost:5600/buscarHotel',data )
            .then( 
                function successCallback(resp){
                     ctrl.data=resp.data;
                   
                },
                function errorCallback(err){
                }
            );
        }

        ctrl.mostrarHotelesInicio = function(){
            // BD subida a https://mlab.com/databases/almundohoteles
            $http({
                method: 'GET',
                url: 'http://localhost:5600/obtenerHoteles'
            }).then(function successCallback(response) {
                ctrl.data = response.data;
            }, function errorCallback(response) {
            alert(response)
            });
        }

        ctrl.mostrarHotelesInicio ();
   }
    
    angular.module("app").component('busqueda', {
        templateUrl: '../componentes/busqueda/busqueda.html',
        controller: FiltroController,
        bindings: {
            datos: '&'
        }
    });
  })(window.angular);