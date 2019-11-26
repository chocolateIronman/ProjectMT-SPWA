(
    function () {
        'use strict';

        angular
            .module('tasksjs')
            .controller('tasksListCtrl',control);

        control.$inject = [
            '$state',
            '$stateParams',
            'tasksSrvc'
        ];

        function control(
            $state,
            $stateParams,
            tasksSrvc
           
        ) {
            var vm = angular.extend(this, {
                tasks : []
            });

            var projectid=$stateParams.projectID;
            vm.projectid=projectid;
            console.log("ProjectID =" + projectid);


            vm.onItemSelected = function(index){
                console.log("Task index: "+ index);

                //passing parameters into the new state
                //'selected' is an attribute in a parameter object, defined in the module definition
                //write the destination controller, so it knows to look for an object with a 'selected' attribute
                var taskId = vm.tasks[index].id;
                console.log("Task id: "+taskId)
                $state.go('taskView',{selected: taskId});
            };

            vm.noTasks = function(){
                return vm.tasks.length == 0;
            };

            
           
            

            tasksSrvc.getTasks(projectid).then(
                function successCallback(response) {
                    console.log(response.data);

                    vm.tasks = response.data;
                },
                function errorCallback(response) {
                    console.error(response);
                }  
            );

            vm.deleteTask = function(taskID) {
                console.log("DELETING TASK");
                
                tasksSrvc.deleteTask(taskID).then(function(){
                    $state.go('tasksList',{projectID: projectid});
                })
            }
            
            return vm;
        }
    }
) ();