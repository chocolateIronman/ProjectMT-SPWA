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
            //function for loading 
            vm.loading=true;
            //getting all categories from the server (DB)
            categorySrvc.getCategories().then(
                function successCallback(response) {
                    console.log(response.data);

                    vm.categories = response.data;
                    vm.loading=false; //if there are categories stop loading
                },
                function errorCallback(response){ //error function
                    console.error(response);
                }
            );
            //deleting a category from the app and the server (DB)
            vm.deleteCategory = function(categoryID) {
                console.log("DELETING CATEGORY");

                categorySrvc.deleteCategory(categoryID).then(function(){
                    console.log("Going now!");
                    vm.loading=false;
                    $state.reload();
                })
            }

            
            
            //adding a new category 
            vm.saveCategory = function () {
                console.log("SAVING CATEGORY!");
                console.table(vm.newCategory);
                categorySrvc.createCategory(vm.newCategory).then(function(){
                    vm.loading=false;
                    $state.reload();
                });
            }
            

            return vm;
        }
    }
)();
