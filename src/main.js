import 'bootstrap' ; 
import 'bootstrap/dist/css/bootstrap.min.css' ; 
import './styles.css' ;
import $ from 'jquery';
import { VacationRequest } from '../src/vacation-request';
import { Nurse } from './nurse';
import { Unit } from './unit';


function addNurseToUnit(nurse, unit){
  nurse.assignRolePriority();
  unit.addNurse(nurse);
}

function getFullName(array, position){
  return array[position].firstName.toUpperCase() + " " + array[position].lastName.toUpperCase();
}

function addToPriorityOutput(nurseArray, outputLocation){
  if(nurseArray.length === 0){
    $(eval(`"#${outputLocation}"`)).append("No nurses found.");
  } else {
    for (let i=0; i< nurseArray.length; i++){
      let output = [];
      output.push(getFullName(nurseArray, i));
      output.push("Hire Date: " + nurseArray[i].hireDate.toDateString());
      output.push("Hours Worked: " + nurseArray[i].hoursWorked);
      output.push("FTE: " + nurseArray[i].fte);
      let listItem = document.createElement('li');
      listItem.innerHTML = output.toString();
      $(eval(`"#${outputLocation}"`)).append(listItem);
    }
  }
}

function addVactionOutput(nurseArray){
  for(let i=0; i<nurseArray.length; i++){
    let currentVacationRequests = nurseArray[i].vacationRequests;
    if(currentVacationRequests.length > 0){
      for (let j=0; j<currentVacationRequests.length;j++){
        let newRow = document.createElement('tr');
        newRow.id = "nurse" + i + "VR" + j;

        let name = document.createElement('td');
        name.innerText = getFullName(nurseArray, i);
        newRow.appendChild(name);

        let dates = document.createElement('td');
        dates.innerText = currentVacationRequests[j].vacationStartDate + " to " + currentVacationRequests[j].workReturnDate;
        newRow.appendChild(dates);

        let reason = document.createElement('td');
        reason.innerText = currentVacationRequests[j].comments;
        newRow.appendChild(reason);

        $("#vacationOutput").append(newRow);
      }
      
    }
  }
}

function addWorkRequestOutput(nurseArray){
  for (let i=0; i<nurseArray.length; i++){
    let currentWorkRequests = nurseArray[i].workRequests;
    if(currentWorkRequests.length>0){
      for (let j =0; j<currentWorkRequests.length; j++){
        let newRow = document.createElement('tr');
        newRow.id = "nurse" + i + "WR" + j;

        let name = document.createElement('td');
        name.innerText = getFullName(nurseArray,i);
        newRow.appendChild(name);

        let dates = document.createElement('td');
        dates.innerText = currentWorkRequests[j].toDateString();
        newRow.appendChild(dates);

        $("#workOutput").append(newRow);
      }
    }
  }
}



$(document).ready(function(){
  let unit = new Unit();
  unit.requestDueDate = new Date(); // Request Due Date: Current Date
  $("#dueDate").attr('value', unit.requestDueDate.toISOString().substr(0,10));
  let workDates = 1;

  let nurseA = new Nurse("A", "Last", new Date(2000, 1, 2), 1234, [2/3, 4/5], [], "NAC", 0.6);
  let nurseB = new Nurse("B", "Class", new Date(2011, 2, 1), 3456, [1/3], "NAC", 0.6);
  let nurseC = new Nurse("C", "Name", new Date(2005, 1, 2), 2345, [1/2], "NAC", 0.9);
  let nurseD = new Nurse("D", "Rank", new Date(2008, 3, 4), 543, [], "NAC", 0.3);
  let nurseE = new Nurse("E", "EEEE", new Date(2018, 1, 4), 5432, [], "NAC", 0.9);
  let nurseF = new Nurse("F", "FFFF", new Date(2002, 5, 4), 1543, [], "NAC", 0.9);


  addNurseToUnit(nurseA, unit);
  addNurseToUnit(nurseB, unit);
  addNurseToUnit(nurseC, unit);
  addNurseToUnit(nurseD, unit);
  addNurseToUnit(nurseE, unit);
  addNurseToUnit(nurseF, unit);

  unit.sortByFTE(unit.chargeNurses);
  unit.sortByFTE(unit.registeredNurses);
  unit.sortByFTE(unit.nursingAssistants);

  addToPriorityOutput(unit.sortedChargeNurses, "CNpriority");
  addToPriorityOutput(unit.sortedRegisteredNurses, "RNpriority");
  addToPriorityOutput(unit.sortedNursingAssistants, "NACpriority");

  nurseA.pastSchedule2019.savePastSchedule([new Date(2019, 6, 1), new Date(2019, 6, 2), new Date(2019, 6, 4)]);
  nurseB.pastSchedule2019.savePastSchedule([]);
  nurseC.pastSchedule2019.savePastSchedule([new Date(2019, 6, 3), new Date(2019, 6, 4), new Date(2019, 6, 5)]);
  nurseA.pastSchedule2019.savePriorVacationDates([]);
  nurseB.pastSchedule2019.savePriorVacationDates([new Date(2019, 6, 2), new Date(2019, 6, 3), new Date(2019, 6, 4), new Date(2019, 6, 5), new Date(2019, 6, 6)]);
  nurseC.pastSchedule2019.savePriorVacationDates([]);
  
  nurseA.addVacationRequestTest("A", "Last", new Date(2020, 1, 17), new Date(2020, 5, 1), new Date(2020, 5, 15), 3, 100, "test1"); // Request Date: 1/17/20
  nurseB.addVacationRequestTest("B", "Class", new Date(2020, 1, 15), new Date(2020, 6, 2), new Date(2020, 6, 10), 3, 100, "test1");
  nurseC.addVacationRequestTest("C", "Name", new Date(2020, 1, 20), new Date(2020, 5, 1), new Date(2020, 5, 15), 3, 100, "test1");

  // nurseB.vacationRequests[0].getDateRange();

  nurseB.compareWithPriorVacations();

  console.log(unit);
  console.log(nurseA);
  console.log(nurseB);
  console.log(nurseC);

  $("#dueDateButton").click(function(event){
    event.preventDefault();
    unit.requestDueDate = $("#dueDate").val();
    $("#dateChanged").text("Date Changed to " + unit.requestDueDate);
  });

  $("form#vacationForm").submit(function(event){
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
    let currentNurse = unit.searchNurse(firstName, lastName);
    if (vacationRequest.checkVacationRequest(unit.requestDueDate)){
      currentNurse.addVacationRequest(vacationRequest);
      $("#vacationOutput").empty();
      addVactionOutput(unit.nurses);
      $("#vacationMessage").text("Vacation request succesfully submitted!");
    } else {
      $("#vacationMessage").text(`Vacation request is past the submission due date: ${unit.requestDueDate.toDateString()}.`);
    }
    
  });

  $("#moreDates").click(function(event){
    event.preventDefault();
    let dateField = document.createElement('input');
    dateField.type = "date";
    dateField.className = "workDates";
    dateField.id = "workDate" + workDates++;
    $("#multipleDates").append(dateField);
  });

  $("#workSubmit").click(function(event){
    event.preventDefault();
    $("#workMessage").text("");
    let firstNameWork = $("#firstNameWork").val();
    let lastNameWork = $("#lastNameWork").val();
    let currentNurse = unit.searchNurse(firstNameWork, lastNameWork);
    let dates = document.getElementsByClassName("workDates");
    for (let i=0; i<dates.length; i++){
      if(dates[i].valueAsDate != null){
        currentNurse.addWorkRequest(dates[i].valueAsDate);
        $("#workMessage").append(`Work request for ${dates[i].valueAsDate.toISOString().substr(0,10)} succesfully submitted!`);
      }
    }
    $("#workOutput").empty();
    addWorkRequestOutput(unit.nurses);
  });


});