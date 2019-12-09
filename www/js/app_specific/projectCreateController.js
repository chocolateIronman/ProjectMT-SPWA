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
            '$scope'
        ];

        function control(
            $state,
            $stateParams,
            projectsSrvc,
            categorySrvc,
            $scope
            
        ) {
            var vm = angular.extend(this, {
                newProject:{
                    tutor_id: "0e3afd83-6fb5-459a-9bd1-66cc7f10c57a"
                },
                categories: [],
                displayCategories:[],
                showAddButton:false,
                newCategory: {}
            

                
            });

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

            

            document.getElementById('categorySearchInput').addEventListener('input',function(){
                setTimeout(function() {
                    vm.displayCategories=vm.searchCategory(document.getElementById('categorySearchInput').value);
                    console.log(vm.displayCategories);
                    $scope.$apply();
                }, 0);
                    
            })
            
            
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

            vm.test= function(){
                console.alert("TESTING");
            }

            vm.saveProject = function () {
                console.log("SAVING PROJECT!!!");
                console.table(vm.newProject);
                //TODO: Error Handling
                projectsSrvc.createProject(vm.newProject).then(function(){
                    $state.go('projectsList');
                });
            };

           return vm;

        }
    }
)();