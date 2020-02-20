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
            var token=authSrvc.getAuthInfo().access_token;
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
    
        service.getProjects = function getProjects(){
            var token=authSrvc.getAuthInfo().access_token;
            return ($http({
                method: 'GET',
                url: 'https://projectmt.herokuapp.com/project',
                
                headers: {
                    "Accept" : 'application/json',
                    "Authorization" : 'Bearer ' + token
                    
                }
            }));
        }

        service.getProject = function getProject(projectID){
            var token=authSrvc.getAuthInfo().access_token;
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
            var token=authSrvc.getAuthInfo().access_token;
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
            var token=authSrvc.getAuthInfo().access_token;
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

        

        return service;
    }


})();