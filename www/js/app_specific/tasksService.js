(function () {
    'use strict';

    angular
        .module('tasksjs')
        .factory('tasksSrvc',tasksSrvc);

    tasksSrvc.$inject = [
        '$q', //promise service
        '$timeout', //timeout service
        '$http'
    ];

    function tasksSrvc(
        $q,
        $timeout,
        $http
    ) {
        var service = {}; //declare an object to hold all the functions
        service.tasks = []; //declare the local array for tasks

        service.createTask = function createTask(task){
            return ($http({
                method: 'POST',
                url: 'http://localhost:8080/projectTasks',
                headers: {
                    "Content-Type" : 'application/json'
                },
                data: task
            }))
        }

        return service;
    }
}) ();