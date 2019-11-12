(
    function() { // IIFE

    'use strict';

    const module = angular.module('projectsjs', []);

    module.config(function($stateProvider, $urlRouterProvider) {

        $stateProvider.state('projectsList', {
            cache: false,
            url: '/projectsList',
            templateUrl: 'js/app_specific/projectsList.html',
            controller:'projectsListCtrl as vm'
            
        });

        $stateProvider.state('projectView', {
            cache: false,
            url: '/projectView',
            templateUrl:'js/app_specific/viewProject.html',
            params: {'selected' : 0},
            controller: 'projectViewCtrl as vm'
        });

        $stateProvider.state('projectCreate', {
            cache: false,
            url: '/projectCreate',
            templateUrl: 'js/app_specific/createProject.html',
            controller: 'projectCreateCtrl as vm'
        });

        $stateProvider.state('projectUpdate', {
            cache: false,
            url: '/projectUpdate',
            templateUrl: 'js/app_specific/updateProject.html',
            controller: 'projectUpdateCtrl as vm'
        });

  

    });

})();