
angular
	.module('PatientsApp')
	.factory('PatientEntry', Patient);

function Patient() {
	function PatientEntry(id, name, lastName, status){
		this.id = id;
		this.name = name;
		this.lastName = lastName;
		this.status = status;
	}

	PatientEntry.prototype.setStatus = function (status){
		this.status = status;
		
		return this;
	}
	
	return (PatientEntry);
}