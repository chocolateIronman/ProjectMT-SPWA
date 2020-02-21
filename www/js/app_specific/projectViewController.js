(
    function () {
        'use strict';

        angular
            .module('projectsjs')
            .controller('projectViewCtrl',control);

        control.$inject = [
            '$state',
            '$stateParams',
            'projectsSrvc',
            'moment'
        ];

        function control(
            $state,
            $stateParams,
            projectsSrvc,
            moment
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
            })

            //get a specific project and its details based on the ID from the state parameters
            var params=$stateParams;
            projectsSrvc.getProject(params.selected).then(
                function successCallback(response) {
                    console.log(response.data[0]);

                    vm.project = response.data[0];
                    vm.project.StartDate=moment(parseInt(response.data[0].StartDate)).format("DD/MM/YYYY");//convert the date from epoch to human readable
                    vm.project.EndDate=moment(parseInt(response.data[0].EndDate)).format("DD/MM/YYYY");
                    
                    // this callback will be called asynchronously
                    // when the response is available
                },
                function errorCallback(response) {
                    console.error(response);
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                }
            );
        }
    }
)();
