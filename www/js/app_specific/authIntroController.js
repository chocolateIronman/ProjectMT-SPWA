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
            //checking if the user is logged in and the page is authenticated
            function update() {
                vm.isLoggedIn = authSrvc.isAuthenticated();
            }
            //logging in > authenticating the user and if successful creating a new tutor (user) if successful or user exists going to the authenticated main view of the app
            vm.login = function () {
                authSrvc.authenticate().then(
                    function success() {
                        
                        //console.log(JSON.stringify(authSrvc.getAuthInfo(), null, 2));
                        tutorSrvc.createTutor().then(
                            function sucess() { 
                                $state.go('mainView') 
                             });
                    },
                    update
                );

            }
            //logging out of the app
            vm.logout = function () {
                authSrvc.clear();
                update();
            }

            update();

            return vm;
        }
    }
)();
