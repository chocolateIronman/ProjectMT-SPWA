(
    function() {
        'use strict';

        const module = angular.module('mainviewjs', []);

        module.config(function($stateProvider,) {

            $stateProvider.state('mainView', {
                cache: false,
                url: '/mainView',
                templateUrl: 'js/app_specific/mainView.html',
                controller: 'mainViewCtrl as vm'
            });

            
        });
    }
)();