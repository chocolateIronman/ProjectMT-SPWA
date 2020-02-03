(
    function() {
        'use strict';

        angular
            .module('authjs',[])
            .config(function($stateProvider,$urlRouterProvider) {
                $stateProvider
                    .state('authIntro', {
                        cache: false,
                        url:'/authIntro',
                        templateUrl: 'js/app_specific/authIntro.html',
                        controller: 'authIntroCtrl as vm'
                    });

                    $urlRouterProvider.otherwise('authIntro');
            });
    }

)();