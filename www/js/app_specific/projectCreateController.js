(
    function () {
        'use strict';

        angular
            .module('projectsjs')
            .controller('projectCreateCtrl',control);

        control.$inject = [
            '$state',
            'projectsSrvc'
        ];

        function control(
            $state,
            projectsSrvc
        ) {
            var vm = angular.extend(this, {
                newProject:{
                    tutor_id: "0e3afd83-6fb5-459a-9bd1-66cc7f10c57a"
                }
            });

            vm.saveProject = function () {
                console.log("SAVING PROJECT!!!");
                console.table(vm.newProject);
                //TODO: Error Handling
                projectsSrvc.createProject(vm.newProject).then(function(){
                    $state.go('projectsList');
                });
            };

        }
    }
)();