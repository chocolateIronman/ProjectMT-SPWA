(function () {
    'use strict';

    angular
        .module('tasksjs')
        .factory('tasksSrvc',tasksSrvc);

    tasksSrvc.$inject = [
        '$q', //promise service
        '$timeout', //timeout service
        '$http',
        'authSrvc'
    ];

    function tasksSrvc(
        $q,
        $timeout,
        $http,
        authSrvc
    ) {
        var service = {}; //declare an object to hold all the functions
        service.tasks = []; //declare the local array for tasks

        service.createTask = function createTask(task){
            return ($http({
                method: 'POST',
                url: 'https://projectmt.herokuapp.com/projectTasks',
                headers: {
                    "Accept" : 'application/json',
                    "Authorization" : 'Bearer ' + token
                    
                },
                data: task
            }))
        }

        service.getTasks = function getTasks(projectID){
            return($http({
                methid: 'GET',
                url: 'https://projectmt.herokuapp.com/projectTasks?projectID='+projectID,
                headers: {
                    "Accept" : 'application/json',
                    "Authorization" : 'Bearer ' + token
                    
                }
            }));
        }

        service.getTask = function getTask(taskID){
            return($http({
                method: 'GET',
                url: 'https://projectmt.herokuapp.com/projectTasks/'+taskID,
                headers: {
                    "Accept" : 'application/json',
                    "Authorization" : 'Bearer ' + token
                    
                }
            }))
        }

        service.updateTask = function updateTask(task,taskID){
            return($http({
                method: 'PUT',
                url: 'https://projectmt.herokuapp.com/projectTasks/'+taskID,
                headers: {
                    "Accept" : 'application/json',
                    "Authorization" : 'Bearer ' + token
                    
                },
                data: task
            }))
        }

        service.deleteTask = function deleteTask(taskID){
            return($http({
                method: 'DELETE',
                url: 'https://projectmt.herokuapp.com/projectTasks/'+taskID,
                headers: {
                    "Accept" : 'application/json',
                    "Authorization" : 'Bearer ' + token
                    
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

        var token = null;
        try{
            var authInfo = authSrvc.getAuthInfo();
            token = authInfo.access_token;
        } catch(e){}

        return service;
    }
}) ();