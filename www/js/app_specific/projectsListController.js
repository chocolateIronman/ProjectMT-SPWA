(
    function () {
        'use strict';

        angular
            .module('projectsjs')
            .controller('projectsListCtrl',control);
        
        control.$inject = [
            '$state'
            //'projectsSrvc'
        ];

        function control(
            $state,
            //projectsSrvc
        ) {
            var vm = angular.extend(this, {
                projects : []
            });

            vm.onItemSelected = function(index){
                console.log("Project: "+ index);

                //passing parameters into the new state
                //'selected' is an attribute in a parameter object, defined in the module definition
                //write the destination controller, so it knows to look for an object with a 'selected' attribute
                $state.go('projectView',{selected: index});
            }

            vm.noProjects = function(){
                return vm.projects.length == 0;
            }

            

            

            //vm.projects = projectSrvc.getProjects();

        }
    }
)();