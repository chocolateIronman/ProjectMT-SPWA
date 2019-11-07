(
    function () {
        'use strict';

        angular
            .module('categoryjs')
            .controller('categoryListCtrl',control);

        control.$inject = [
            '$state',
            //categorySrvc
        ];

        function control(
            $state,
            //categorySrvc
        ) {
            var vm = angular.extend(this, {
                categories : []
            });

            vm.back = function(){
                $state.go('projectsList')
            }

            vm.add = function () {
                console.log("ADDING CATEGORY!!!");
                //TODO: Error Handling
                //categorySrvc.createCategory().then(function(){
                    //state.go('categoryList);
                //});
            };
        }
    }
)();