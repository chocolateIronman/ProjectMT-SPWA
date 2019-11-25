(
    function () {
        'use strict';

        angular
            .module('tasksjs')
            .controller('tasksListCtrl',control);

        control.$inject = [
            '$state',
            'tasksSrvc'
        ];

        function control(
            $state,
            tasksSrvc
        ) {
            var vm = angular.extend(this, {
                tasks : []
            });

            vm.onItemSelected = function(index){
                console.log("Task: "+ index);

                //passing parameters into the new state
                //'selected' is an attribute in a parameter object, defined in the module definition
                //write the destination controller, so it knows to look for an object with a 'selected' attribute
                $state.go('taskView',{selected: index});
            }

            vm.noTasks = function(){
                return vm.tasks.length == 0;
            }


            
        }
    }
) ();