(
    function() {
        'use strict';

        angular
            .module('authjs',[])
            .config(function($stateProvider) {
                $stateProvider
                    .state('authIntro', {
                        cache: false,
                        url:'/authIntro',
                        templateUrl: 'js/app_specific/authIntro.html',
                        controller: 'authIntroCtrl as vm'
                    })
            });
    }
)();