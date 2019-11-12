(
    function() {
        'use strict';

    const module = angular.module('tasksjs', []);

    module.config(function($stateProvider, $urlRouterProvider) {
        
        $stateProvider.state('tasksList',{
            cache: false,
            url: '/tasksList',
            templateUrl: 'js/app_specific/tasksList.html',
            controller: 'tasksListCtrl as vm'
        });

        $stateProvider.state('taskView',{
            cache: false,
            url: '/taskView',
            templateUrl: 'js/app_specific/viewTask.html',
            params: {'selected' : 0},
            controller: 'taskViewCtrl as vm'
        });

        $stateProvider.state('taskCreate',{
            cache: false,
            url: '/taskCreate',
            templateUrl: 'js/app_specific/createTasks.html',
            controller: 'taskCreateCtrl as vm'
        });

        $stateProvider.state('taskUpdate',{
            cache: false,
            url: '/taskUpdate',
            templateUrl: 'js/app_specific/updateTask.html',
            controller: 'taskUpdateCtrl as vm'
        });

    });
})();