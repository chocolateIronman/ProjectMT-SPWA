(
    function() {
        'use strict';

    const module = angular.module('tasksjs', []);

    module.config(function($stateProvider, $urlRouterProvider) {
        
        $stateProvider.state('tasksList',{
            cache: false,
            url: '/tasksList/:projectID',
            templateUrl: 'js/app_specific/tasksList.html',
            controller: 'tasksListCtrl as vm',
            resolve: {
                selectedProject: function($stateParams, projectsSrvc) {
                    return projectsSrvc.fetchProject($stateParams.projectID)
                }
            }
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
            url: '/taskCreate/:projectID',
            templateUrl: 'js/app_specific/createTasks.html',
            controller: 'taskCreateCtrl as vm',
            resolve: {
                selectedProject: function($stateParams, projectsSrvc) {
                    return projectsSrvc.fetchProject($stateParams.projectID)
                }
            }
        });

        $stateProvider.state('taskUpdate',{
            cache: false,
            url: '/taskUpdate/:taskID',
            templateUrl: 'js/app_specific/updateTask.html',
            controller: 'taskUpdateCtrl as vm',
            resolve: {
                selectedTask: function($stateParams, tasksSrvc){
                    return tasksSrvc.fetchTask($stateParams.taskID)
                }
            }
        });

    });
})();