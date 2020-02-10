(
    function () {
        'use strict';

        angular
            .module('mainviewjs')
            .controller('mainViewCtrl', control);

        control.$inject = [
            '$state',
            'authSrvc'
        ];

        function control(
            $state,
            authSrvc
        ) {
            var vm = angular.extend(this, {

            });

            
        }

    }
)();