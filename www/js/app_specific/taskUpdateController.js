(
    function () {
        'use strict';

        angular
            .module('tasksjs')
            .controller('taskUpdateCtrl',control);

        control.$inject = [
            '$state',
            //'tasksSrvc'
        ];

        function control(
            $state,
            //tasksSrvc
        ) {
            var vm = angular.extend(this, {
                task : {
                    name: "no name",
                    startDate: "startDate",
                    dueDate: "due date",
                    endDate: "end date",
                    notes: "no notes"
                }
            });

            

            vm.updateTask = function(){
                console.log("UPDATING TASK!!!")
                //TODO:Error Handling
                //tasksSrvc.updateTask().then(function(){
                    //$state.go('taskView);
                //});
            };
        }
    }
)();