/**
 * Controller: FilterByFields
 * Generic Filter to filter list of objects by more than one attribute 
 */

 function FilterByFields () {
	 return function(){
		 var fields = Array.prototype.slice.call(arguments);
		 return function(value, list){
			 	var regex = new RegExp(value.toLowerCase())
			 	
			 	return list.filter(function(obj){
				 	var found = false;
				 	fields.forEach(function(field){
				 		!found && (found = obj[field]?regex.test(obj[field].toLowerCase()):false);
				 	})
				 	return found;
				 })
		 }
	 }
}
 
angular
	.module('PatientsApp')
	.filter('filterByFields', FilterByFields);