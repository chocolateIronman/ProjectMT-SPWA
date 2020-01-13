(
    function() {
        'use strict';

        angular
            .module('authjs')
            .controller('authIntroCtrl',control);

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

            function update(){
                vm.isLoggedIn=authSrvc.isAuthenticated();
            }

            vm.login = function(){
                authSrvc.authenticate().then(
                    update,
                    update
                );
            }

            vm.logout = function(){
                authSrvc.clear();
                update();
            }

            update();

            return vm;
        }
    }
)();