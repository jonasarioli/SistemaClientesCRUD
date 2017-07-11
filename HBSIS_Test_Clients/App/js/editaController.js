﻿(function (app) {
    var editaController = function ($scope, clientService) {

        $scope.isEditavel = function () {
            return $scope.editar && $scope.editar.cliente;
        };
        $scope.cancelar = function () {
            $scope.editar.cliente = null;
        };
        $scope.salvar = function () {
            if ($scope.editar.cliente.Id) {
                atualizaCliente();
            } else {
                criaCliente();
            }
        };
        var atualizaCliente = function () {
            clientService.atualizar($scope.editar.cliente)
            .success(function () {
                angular.extend($scope.cliente, $scope.editar.cliente);
                $scope.editar.cliente = null;
            });
        };
        var criaCliente = function () {
            clientService.criar($scope.editar.cliente)
            .success(function (cliente) {
                $scope.clientes.push(cliente);
                $scope.editar.cliente = null;
            });
        };
    };
    app.controller("editaController", editaController);
}(angular.module("app")));