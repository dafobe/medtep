
angular
	.module('PatientsApp')
	.factory('PatientEntry', Patient);

function Patient() {
	function PatientEntry(id, name, lastName, status){
		this.id = id;
		this.name = name;
		this.lastName = lastName;
		this.status = status || 'unknown';
	}

	PatientEntry.prototype.setStatus = function (status){
		status && (this.status = status);
		
		return this;
	}
	
	PatientEntry.prototype.hasName = function (){
		return this.name?true:false;
	}
	
	PatientEntry.prototype.hasLastName = function (){
		return this.lastName?true:false;
	}
	
	PatientEntry.prototype.hasStatus = function (){
		return this.status?true:false;
	}
	
	
	
	return (PatientEntry);
}