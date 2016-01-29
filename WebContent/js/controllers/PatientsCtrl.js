/**
 * Controller: PatientsCtrl
 * Manage patients screen 
 */

 function PatientsCtrl ($filter, PatientsService) {
      'use strict';
      var ctrl = this, 
  		  patients = [],
  		  fullNameFilter = $filter('filterByFields')('name','lastName'),
  		  statusFilter = $filter('filterByFields')('status');
      
      this.patients = patients;
      this.filteredPatients = patients;
      this.sortField = ['name'];
      this.fullNameFilter = '';
      this.statusFilter = '';

      
      PatientsService.getPatients().then(function(values){
    	  		ctrl.patients = PatientsService.updatePatients(values);
    	  		ctrl.filteredPatients = ctrl.patients;
      });
      
      this.filterPatients = function(){
    	  var filteredList = fullNameFilter(this.fullNameFilter, this.patients);
    	  this.filteredPatients = statusFilter(this.statusFilter, filteredList);
      }
      
      this.updateSorting = function(sortField){
    	  var sorting = this.sortField,
    	  	  currentSorting,
    	  	  currentSortingIsDesc = false,
	  		  sortByIndex,
	  		  sortField;
    	  
    	  currentSorting = sorting.filter(function(field, index){
    		  var regex = new RegExp('^-?'+sortField, 'g'),
    		  	  regexIsDesc = new RegExp('^-');
    		  
    		  if(field.match(regex)){
    			  sortByIndex = index;
    			  currentSortingIsDesc = field.match(regexIsDesc);
    			  return true;
    		  }
    	  });
    	  
    	  //Reset Sorting 
    	  sorting.forEach(function(field){
    		  var regexIsDesc = new RegExp('^-');
    		  field.replace(regexIsDesc,'');
    	  });
	  	
    	  (typeof sortByIndex != 'undefined') && sorting.splice(sortByIndex, 1);
    	  
    	  sorting.splice(0,0,(currentSortingIsDesc)?sortField:'-'+sortField);
      }
}
 
angular
	.module('PatientsApp')
	.controller('PatientsCtrl', PatientsCtrl);