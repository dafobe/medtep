/**
 * Controller: PatientsCtrl
 * Manage patients screen 
 */

 function PatientsCtrl (PatientsService) {
      'use strict';
      var ctrl = this, 
  		  patients = [];
      
      this.patients = patients,
      this.sortField = ['name','lastName','status'];
      
      PatientsService.getPatients().then(function(values){
    	  		ctrl.patients = PatientsService.updatePatients(values)});
      
      this.updateSorting = function(sortField){
    	  var sorting = this.sortField,
	  		  sortByIndex,
	  		  sortField;
    	  console.log('sort in:', sorting);
    	 
    	  sortByIndex = sorting.indexOf(sortField);
	  		  
    	  (sortByIndex > -1) && sorting.splice(sortByIndex, 1);
    	  
    	  sorting.splice(0,0,sortField);
    	      	  
    	  console.log('sort out:', sorting);
      }
}
 
angular
	.module('PatientsApp')
	.controller('PatientsCtrl', PatientsCtrl);