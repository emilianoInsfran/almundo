angular.controller("Filtro", function Filtro($http,$scope){

    $scope.filtroNombre = true;
    $scope.filtroEstrella = true;

    $scope.onClickMostrarElemento = function(mostrar){
        if(mostrar === true) return false;
        else return true;
    }
    $scope.mostrarFiltroNombre = function(data){
        $scope.filtroNombre = $scope.onClickMostrarElemento(data);
    }
    $scope.mostrarFiltroEstrella = function(data){
        $scope.filtroEstrella = $scope.onClickMostrarElemento(data);
    }

});