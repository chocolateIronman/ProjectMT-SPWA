(function () {
    'use strict';

    angular
        .module('categoryjs')
        .factory('categorySrvc',categorySrvc);

    categorySrvc.$inject = [
        '$q', //promise service
        '$timeout', //timeut service
        '$http'
    ];

    function categorySrvc(
        $q,
        $timeout,
        $http
    ) {
        var service = {}; //declare an object to hold all the functions
        service.categories = []; //declare the local array for projects

        service.createCategory = function createcategory(category) {
            return ($http({
                method: 'POST',
                url: 'http://localhost:8080/projectCategory',
                headers: {
                    "Content-Type" : 'application/json'
                },
                data: category
            }))
        }

        service.getCategories = function getCategories(){
            return ($http({
                method: 'GET',
                url: 'http://localhost:8080/projectCategory'
            }))
        }

        service.deleteCategory = function deleteCategory(categoryID){
            return($http({
                method: 'DELETE',
                url: 'http://localhost:8080/projectCategory/'+categoryID,
                headers: {
                    "Content-Type" : 'application/json'
                }
            }))
        }

        service.getCategory = function getCategory(categoryID){
            return($http({
                method: 'GET',
                url: 'http://localhost:8080/projectCategory/'+categoryID,
                headers: {
                    "Content-Type" : 'application/json'
                }
            }))
        }

    
        return service;
    }
})();