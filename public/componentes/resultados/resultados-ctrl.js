(function(angular) {
    'use strict';
    function ResultadoController($scope, $element, $attrs,$http) {
        var ctrl = this;
    }
    
    angular.module("app").component('resultado', {
        templateUrl: '../componentes/resultados/resultados.html',
        controller: ResultadoController,
        bindings: {
            datosHotel: '<',
            filtroEstrella: '<',
            filtroNombre : '<'
        }
    });
})(window.angular);