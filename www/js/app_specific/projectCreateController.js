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
                newProject:{}
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