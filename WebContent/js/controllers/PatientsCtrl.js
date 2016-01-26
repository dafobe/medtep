/**
 * Controller: PatientsCtrl
 * Manage patients screen 
 */

 function PatientsCtrl (PatientsService) {
      'use strict';
      var ctrl = this;
      this.patients = PatientsService.getPatients();
    }
 
angular
	.module('PatientsApp')
	.controller('PortfolioCtrl', PatientsCtrl);