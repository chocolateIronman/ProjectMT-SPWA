(function () {
    'use strict';

    angular
        .module('categoryjs')
        .factory('categorySrvc',categorySrvc);

    categorySrvc.$inject = [
        '$q', //promise service
        '$timeout', //timeut service
        '$http',
        'authSrvc'
    ];

    function categorySrvc(
        $q,
        $timeout,
        $http,
        authSrvc
    ) {
        var service = {}; //declare an object to hold all the functions
        service.categories = []; //declare the local array for projects

        service.createCategory = function createcategory(category) {
            return ($http({
                method: 'POST',
                url: 'https://projectmt.herokuapp.com:443/projectCategory',
                headers: {
                    "Content-Type" : 'application/json',
                    "Authorization" : 'Bearer ' + token
                },
                data: category
            }))
        }

        service.getCategories = function getCategories(){
            return ($http({
                method: 'GET',
                url: 'https://projectmt.herokuapp.com/projectCategory',
                headers: {
                    "Accept" : 'application/json',
                    "Authorization" : 'Bearer ' + token
                    
                }
            }))
        }

        service.deleteCategory = function deleteCategory(categoryID){
            return($http({
                method: 'DELETE',
                url: 'https://projectmt.herokuapp.com/projectCategory/'+categoryID,
                headers: {
                    "Content-Type" : 'application/json',
                    "Authorization" : 'Bearer ' + token
                }
            }))
        }

        service.getCategory = function getCategory(categoryID){
            return($http({
                method: 'GET',
                url: 'https://projectmt.herokuapp.com/projectCategory/'+categoryID,
                headers: {
                    "Content-Type" : 'application/json',
                    "Authorization" : 'Bearer ' + token
                }
            }))
        }

        var token = null;
        try{
            var authInfo = authSrvc.getAuthInfo();
            token = authInfo.access_token;
        } catch(e){}
    
        return service;
    }
})();