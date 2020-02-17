import 'bootstrap' ; 
import 'bootstrap/dist/css/bootstrap.min.css' ; 
import './styles.css' ;
import $ from 'jquery';
import { VacationRequest } from '../src/vacation-request';
import {Nurse} from './nurse';
import {Unit} from './unit';

$(document).ready(function(){

  $("form#requestForm").submit(function(event){
    event.preventDefault();
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    let submissionDate = $("#submissionDate").val();
    let vacationStartDate = $("#vacationStartDate").val();
    let workReturnDate = $("#workReturnDate").val();
    let workDaysRequestedOff = $("#workDaysRequestedOff").val();
    let vacationHoursAvailable = $("#vacationHoursAvailable").val();
    let comments = $("#comments").val();
    let vacationRequest = new VacationRequest(firstName, lastName, submissionDate, vacationStartDate, workReturnDate, workDaysRequestedOff, vacationHoursAvailable, comments);
    vacationRequest.checkVacationHoursAvailable();
    console.log(vacationRequest);
  });

  let unit = new Unit();
  let nurseA = new Nurse("A", "Last", new Date(2000, 1, 2), 1234, [2/3, 4/5], "NAC", 0.6);
  let nurseB = new Nurse("B", "Class", new Date(2011, 2, 1), 3456, [1/3], "NAC", 0.6);
  let nurseC = new Nurse("C", "Name", new Date(2005, 1, 2), 2345, [1/2], "NAC", 0.9);
  let nurseD = new Nurse("D", "Rank", new Date(2008, 3, 4), 543, [], "NAC", 0.3);
  let nurseE = new Nurse("E", "EEEE", new Date(2018, 1, 4), 5432, [], "NAC", 0.9);
  let nurseF = new Nurse("F", "FFFF", new Date(2002, 5, 4), 1543, [], "NAC", 0.9);
  
  nurseA.assignRolePriority();
  nurseB.assignRolePriority();
  nurseC.assignRolePriority();
  nurseD.assignRolePriority();
  nurseE.assignRolePriority();
  nurseF.assignRolePriority();
  unit.addNurse(nurseA);
  unit.addNurse(nurseB);
  unit.addNurse(nurseC);
  unit.addNurse(nurseD);
  unit.addNurse(nurseE);
  unit.addNurse(nurseF);
  console.log("all nurses", unit.nurses);
  console.log("unit", unit);
  console.log("unsorted", unit.nursingAssistants);
  unit.sortByFTE(unit.chargeNurses);
  unit.sortByFTE(unit.registeredNurses);
  unit.sortByFTE(unit.nursingAssistants);
  // unit.assignGroupPriority(1);
  // unit.assignGroupPriority(2);
  // unit.assignGroupPriority(3);
  console.log("sorted",unit.sortedNursingAssistants);

});