(
    function () {
        'use strict';

        angular
            .module('mainviewjs')
            .controller('mainViewCtrl',control);

        control.$inject = [
            '$state'
        ];

        function control(
            $state
        ) {
            var vm = angular.extend(this, {

            });

            vm.fun = function(){
                $state.go('projectsList');
            }
        }
       
    }
)();