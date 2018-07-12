(function(angular) {
    'use strict';
    function FiltroController($scope, $element, $attrs,$http) {
        var ctrl = this;
    
        ctrl.filtroNombre = true;
        ctrl.filtroEstrella = true;
        ctrl.lugar = '';
        ctrl.hideFiltro = true;
        ctrl.showFiltro = false;

        ctrl.onClickMostrarElemento = function(mostrar){
            if(mostrar === true) return false;
            else return true;
        }
        ctrl.mostrarFiltroNombre = function(data){
            ctrl.filtroNombre = ctrl.onClickMostrarElemento(data);
        }
        ctrl.mostrarFiltroEstrella = function(data){
            ctrl.filtroEstrella = ctrl.onClickMostrarElemento(data);
        }
        ctrl.accionFiltroMobile = function(show,hide){
            ctrl.showFiltro = ctrl.onClickMostrarElemento(show);
            ctrl.hideFiltro = ctrl.onClickMostrarElemento(hide);
        }
   }
    
    angular.module("app").component('filtro', {
        templateUrl: '../componentes/filtro/filtro.html',
        controller: FiltroController,
        bindings: {
            datos: '&'
        }
    });
})(window.angular);