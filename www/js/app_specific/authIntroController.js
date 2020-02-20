(
    function () {
        'use strict';

        angular
            .module('authjs')
            .controller('authIntroCtrl', control);

        control.$inject = [
            '$state',
            'authSrvc',
            'tutorSrvc'
        ];

        function control(
            $state,
            authSrvc,
            tutorSrvc
        ) {
            var vm = angular.extend(this, {

            });

            function update() {
                vm.isLoggedIn = authSrvc.isAuthenticated();
            }

            vm.login = function () {
                authSrvc.authenticate().then(
                    function success() {
                        
                        console.log(JSON.stringify(authSrvc.getAuthInfo(), null, 2));
                        tutorSrvc.createTutor().then(
                            function sucess() { 
                                $state.go('mainView') 
                             });
                    },
                    update
                );

            }

            vm.logout = function () {
                authSrvc.clear();
                update();
            }

            update();

            return vm;
        }
    }
)();