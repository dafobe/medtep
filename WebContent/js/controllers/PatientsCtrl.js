/**
 * Controller: PatientsCtrl
 * Manage patients screen 
 */

 function PatientsCtrl (PatientsService) {
      'use strict';
      var ctrl = this, 
  		  patients = [];
      
      this.patients = patients,
      this.sortField = ['name'];
      
      PatientsService.getPatients().then(function(values){
    	  		ctrl.patients = PatientsService.updatePatients(values)});
      
      this.updateSorting = function(sortField){
    	  var sorting = this.sortField,
    	  	  currentSorting,
    	  	  currentSortingIsDesc = false,
	  		  sortByIndex,
	  		  sortField;
    	  console.log('sort in:', sorting);
    	  
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
    	      	  
    	  console.log('sort out:', sorting);
      }
}
 
angular
	.module('PatientsApp')
	.controller('PatientsCtrl', PatientsCtrl);