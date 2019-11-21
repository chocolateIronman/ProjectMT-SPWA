(function () {
    'use strict';

    angular
        .module('projectsjs')
        .factory('projectsSrvc',projectsSrvc);

    projectsSrvc.$inject =[
        '$q', //promise service
        '$timeout', //timeout service
        '$http'
        // 'moment' //dates service
    ];

    function projectsSrvc(
        $q,
        $timeout,
        $http
        // moment
    ) {
        
        var service = {}; //declare an object to hold all the functions
        service.projects = []; //declare the local array for projects
    
        service.createProject = function createProject(project){
            return ($http({
                method: 'POST',
                url: 'http://localhost:8080/project',
                headers: {
                    "Content-Type" : 'application/json'
                },
                data: project
            }))
    
        }
    
        service.getProjects = function getProjects(tutorID){
            return ($http({
                method: 'GET',
                url: 'http://localhost:8080/project',
                params: {"tutorID":"0e3afd83-6fb5-459a-9bd1-66cc7f10c57a"}
            }));
        }

        service.getProject = function getProject(projectID){
            return($http({
                method: 'GET',
                url: 'http://localhost:8080/project/'+projectID,
                headers: {
                    "Content-Type" : 'application/json'
                }
            }))
        }

        service.updateProject = function updateProject(project,projectID){
            return($http({
                method: 'PUT',
                url:'http://localhost:8080/project/'+projectID,
                headers:{
                    "Content-Type" : 'application/json'
                },
                data: project
            }))
        }

        service.deleteProject = function deleteProject(projectID){
            return($http({
                method: 'DELETE',
                url: 'http://localhost:8080/project/'+projectID,
                headers: {
                    "Content-Type" : 'application/json'
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

        return service;
    }


})();