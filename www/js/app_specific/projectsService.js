(function () {
    'use strict';

    angular
        .module('projectsjs')
        .factory('projectsSrvc',projectsSrvc);

    projectsSrvc.$inject =[
        '$q', //promise service
        '$timeout', //timeout service
        '$http',
        'authSrvc'
        // 'moment' //dates service
    ];

    function projectsSrvc(
        $q,
        $timeout,
        $http,
        authSrvc
        // moment
    ) {
        
        var service = {}; //declare an object to hold all the functions
        service.projects = []; //declare the local array for projects
    
        service.createProject = function createProject(project){
            return ($http({
                method: 'POST',
                url: 'https://projectmt.herokuapp.com/project',
                headers: {
                    "Accept" : 'application/json',
                    "Authorization" : 'Bearer ' + token
                    
                },
                data: project
            }))
    
        }
    
        service.getProjects = function getProjects(tutorID){
            return ($http({
                method: 'GET',
                url: 'https://projectmt.herokuapp.com/project',
                params: {"tutorID":"39d5ff9a-6d31-4a76-8171-e93903d21d82"},
                headers: {
                    "Accept" : 'application/json',
                    "Authorization" : 'Bearer ' + token
                    
                }
            }));
        }

        service.getProject = function getProject(projectID){
            return($http({
                method: 'GET',
                url: 'https://projectmt.herokuapp.com/project/'+projectID,
                headers: {
                    "Accept" : 'application/json',
                    "Authorization" : 'Bearer ' + token
                    
                }
            }))
        }

        service.updateProject = function updateProject(project,projectID){
            return($http({
                method: 'PUT',
                url:'https://projectmt.herokuapp.com/project/'+projectID,
                headers: {
                    "Accept" : 'application/json',
                    "Authorization" : 'Bearer ' + token
                    
                },
                data: project
            }))
        }

        service.deleteProject = function deleteProject(projectID){
            return($http({
                method: 'DELETE',
                url: 'https://projectmt.herokuapp.com/project/'+projectID,
                headers: {
                    "Accept" : 'application/json',
                    "Authorization" : 'Bearer ' + token
                    
                }
            }))
        }

        service.fetchProject = function fetchProject(projectID) {
            for(var i=0; i<service.projects.length;i++){
                if(service.projects[i].id === projectID){
                    return service.projects[i];
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


})();