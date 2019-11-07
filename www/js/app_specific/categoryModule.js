(
    function() {

        'use strict';

        const module = angular.module('categoryjs', []);

        module.config(function($stateProvider, $urlRouterProvider) {

            $stateProvider.state('categoryList', {
                cache: false,
                url: '/categoryList',
                templateUrl: 'js/app_specific/categoryList.html',
                controller: 'categoryListCtrl as vm'
            });

            $urlRouterProvider.otherwise('categoryList');

        });
})();