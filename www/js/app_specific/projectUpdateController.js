(
    function () {
        'use strict';

        angular
            .module('projectsjs')
            .controller('projectUpdateCtrl',control);

        control.$inject = [
            '$state',
            //'projectsSrvc'
        ];

        function control(
            $state,
            //projectsSrvc
        ) {
            var vm = angular.extend(this, {
                project : {
                    name: "no name",
                    category: "no category",
                    startDate: "start date",
                    endDate: "end date",
                    year: "no year",
                    notes: "no notes"
                }
            });

            vm.cancel = function(){
                $state.go("projectView");
            }

            vm.updateProject = function(){
                console.log("UPDATING PROJECT!!!")
                //TODO:Error Handling
                //projectsSrvc.updateProject().then(function(){
                    //$state.go('projectView);
                //});
            };
        }
    }
)();