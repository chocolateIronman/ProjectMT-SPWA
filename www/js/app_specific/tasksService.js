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

        service.createTask = function createTask(task,projectID){
            return ($http({
                method: 'POST',
                url: 'http://localhost:8080/projectTasks',
                headers: {
                    "Content-Type" : 'application/json'
                },
                data: task
            }))
        }

        service.getTasks = function getTasks(projectID){
            return($http({
                methid: 'GET',
                url: 'http://localhost:8080/projectTasks?projectID='+projectID,
                headers:{
                    "Content-Type" : 'application/json'
                }
            }));
        }

        service.getTask = function getTask(taskID){
            return($http({
                method: 'GET',
                url: 'http://localhost:8080/projectTasks/'+taskID,
                headers: {
                    "Content-Type" : 'application/json'
                }
            }))
        }

        service.updateTask = function updateTask(task,taskID){
            return($http({
                method: 'PUT',
                url: 'http://localhost:8080/projectTasks/'+taskID,
                headers: {
                    "Content-Type" : 'application/json'
                },
                data: task
            }))
        }

        service.deleteTask = function deleteTask(taskID){
            return($http({
                method: 'DELETE',
                url: 'http://localhost:8080/projectTasks/'+taskID,
                headers: {
                    "Content-Type" : 'application/json'
                }
            }))
        }

        service.fetchTask = function fetchTask(taskID) {
            for(var i=0; i<service.tasks.length; i++){
                if(service.tasks[i].id === taskID) {
                    return service.tasks[i];
                }
            }
        }

        return service;
    }
}) ();