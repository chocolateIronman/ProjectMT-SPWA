(
    function () {
        'use strict';

        angular
            .module('categoryjs')
            .controller('categoryListCtrl',control);

        control.$inject = [
            '$state',
            'categorySrvc',
            '$ionicHistory',
            '$stateParams'
        ];

        function control(
            $state,
            categorySrvc,
            $ionicHistory,
            $stateParams
        ) {
            var vm = angular.extend(this, {
                categories : [],
                newCategory: {}
            });

            
            categorySrvc.getCategories().then(
                function successCallback(response) {
                    console.log(response.data);

                    vm.categories = response.data;
                },
                function errorCallback(response){
                    console.error(response);
                }
            );

            vm.deleteCategory = function(categoryID) {
                console.log("DELETING CATEGORY");

                categorySrvc.deleteCategory(categoryID).then(function(){
                    console.log("Going now!");
                    $state.reload();
                })
            }

            
            

            vm.saveCategory = function () {
                console.log("SAVING CATEGORY!");
                console.table(vm.newCategory);
                categorySrvc.createCategory(vm.newCategory).then(function(){
                    $state.reload();
                });
            }
            

            return vm;
        }
    }
)();