(
    function () {
        'use strict';

        angular
            .module('projectsjs')
            .controller('projectCreateCtrl',control);

        control.$inject = [
            '$state',
            '$stateParams',
            'projectsSrvc',
            'categorySrvc',
            '$scope',
            'moment'
        ];

        function control(
            $state,
            $stateParams,
            projectsSrvc,
            categorySrvc,
            $scope,
            moment
            
        ) {
            var vm = angular.extend(this, {
                newProject:{
                   
                },
                categories: [], 
                displayCategories:[],
                showAddButton:false,
                newCategory: {},
                startDateHolder: Date(),
                endDateHolder: Date()
            

                
            });
            //get all available categories
            categorySrvc.getCategories().then(
                function successCallback(response) {
                    console.log(response.data);

                    vm.categories = response.data;
                    //vm.displayCategories=vm.categories;
                },
                function errorCallback(response){
                    console.error(response);
                }
            );
            
            //search through categories to select a category
              //if category doesnt exist create new one and add its id to project
              //if it exist select and add its id to project              
            vm.searchCategory = function searchCategory(input){
                var tempCategory = [];
                console.log("searching for"+input);
                
                var j=0;
                if(angular.isUndefined(input)||input==null||input==""){
                    vm.showAddButton=false;
                    return null;
                } else{
                    for(var i=0;i<vm.categories.length;i++){
                        if(vm.categories[i].name.toLowerCase().includes(input.toLowerCase())){
                            tempCategory[j]=vm.categories[i];
                            j++
                        }
                    }
                    if (tempCategory.length==0) {
                        vm.showAddButton=true;
                    }else{
                        vm.showAddButton=false;
                    }
                    return tempCategory;
                }
            }

            
            //search
            document.getElementById('categorySearchInput').addEventListener('input',function(){
                setTimeout(function() {
                    vm.displayCategories=vm.searchCategory(document.getElementById('categorySearchInput').value);
                    console.log(vm.displayCategories);
                    $scope.$apply();
                }, 0);
                    
            })
            
            //on selected category add to project
            vm.onItemSelected = function(index){
                console.log("Category index: "+ index);
                //passing parameters into the new state
                //'selected' is an attribute in a parameter object, defined in the module definition
                //write the destination controller, so it knows to look for an object with a 'selected' attribute
                var categoryId= vm.displayCategories[index].id;
                console.log("Category id:" + categoryId);
                vm.newProject.ProjectCategory=categoryId;
                console.log(vm.newProject.ProjectCategory);
                
                
            };
            //save new category and add to project
            vm.saveCategory = function () {
                console.log("SAVING CATEGORY!");
                console.table(vm.newCategory);
                categorySrvc.createCategory(vm.newCategory).then(function(){
                    categorySrvc.getCategories().then(
                        function successCallback(response) {
                            console.log(response.data);
                            var foundCategory={};
                            vm.categories = response.data;
                            vm.categories.forEach(function (category) {
                                if (category.name==vm.newCategory.name) {
                                    foundCategory=category.id;
                                }
                            });
                            console.log("FOUND CATEGORY"+foundCategory);
                            console.table(foundCategory);
                            
                            
                            vm.newProject.ProjectCategory=foundCategory;
                        },
                        function errorCallback(response){
                            console.error(response);
                        }
                    );
                });
            }

            /* vm.test= function(){
                console.alert("TESTING");
            } */
            //save new  project
            vm.saveProject = function () {
                console.log("SAVING PROJECT!!!");

                vm.newProject.StartDate=moment(vm.startDateHolder,"DD/MM/YYYY").valueOf();
                vm.newProject.EndDate=moment(vm.endDateHolder,"DD/MM/YYYY").valueOf();

                console.table(vm.newProject);
                //TODO: Error Handling
                projectsSrvc.createProject(vm.newProject).then(function success(){
                    $state.go('projectsList');
                },
                function error(err){
                    console.log(err);
                });
            };

           return vm;

        }
    }
)();
