import 'bootstrap' ; 
import 'bootstrap/dist/css/bootstrap.min.css' ; 
import './styles.css' ;
import $ from 'jquery';
import { VacationRequest } from '../src/vacation-request';
import { Nurse } from './nurse';
import { Unit } from './unit';

// Add Test Nurses to Units
function addNurseToUnit(nurse, unit){
  nurse.assignRolePriority();
  unit.addNurse(nurse);
}

// Return Full Name in Uppercase
function getFullName(array, position){
  return array[position].firstName.toUpperCase() + " " + array[position].lastName.toUpperCase();
}

// Convert input type date strings into our universal Date object format
function convertDateInput(input){
  return new Date(input.replace(/-/g, '/'));
}

// Add Nurses in priority order for MVP output area dynamically
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

// Add all vacation requests into MVP output area dynamically
function addVactionRequestOutput(nurseArray){
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
        dates.innerText = currentVacationRequests[j].vacationStartDate.toDateString() + " to " + currentVacationRequests[j].workReturnDate.toDateString();
        newRow.appendChild(dates);

        let reason = document.createElement('td');
        reason.innerText = currentVacationRequests[j].comments;
        newRow.appendChild(reason);

        $("#vacationOutput").append(newRow);
      }
      
    }
  }
}

// Add all work requests to MVP output area dynamically
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

// Check if Nurse had prior vacation dates that are the same for last 2 years
function showPriorVacations(nurse) {
  let workedPastVacDates;
  for (let m = 0; m < nurse.vacationRequests.length; m++) {
    for (let i = 0; i < nurse.pastSchedule2019.priorVacationDates.length; i++) {
      workedPastVacDates = nurse.compareWithPriorVacations(nurse.vacationRequests[m].vacationReqDateRange, nurse.pastSchedule2019.priorVacationDates[i]);
      if (workedPastVacDates.length === 0) {
        console.log(`${nurse.firstName} ${nurse.lastName} do not have the same vacation dates in 2019 compared to the dates requested this year.`);
      } else {
        console.log(`${nurse.firstName} ${nurse.lastName} had similar vacation dates in 2019 compared to this year: ${workedPastVacDates}`);
      }
    }
  }
  for (let m = 0; m < nurse.vacationRequests.length; m++) {
    for (let i = 0; i < nurse.pastSchedule2018.priorVacationDates.length; i++) {
      workedPastVacDates = nurse.compareWithPriorVacations(nurse.vacationRequests[m].vacationReqDateRange, nurse.pastSchedule2018.priorVacationDates[i]);
      if (workedPastVacDates.length === 0) {
        console.log(`${nurse.firstName} ${nurse.lastName} do not have the same vacation dates in 2018 compared to the dates requested this year.`);
      } else {
        console.log(`${nurse.firstName} ${nurse.lastName} had similar vacation dates in 2018 compared to this year: ${workedPastVacDates}`);
      }
    }
  }
}

// Check if Nurse worked on the holidays in the past 2 years
function showPastHolidaysWorked(nurse, unit) {
  let workedPastHolidays;
  for (let m = 0; m < nurse.vacationRequests.length; m++) {
    for (let i = 0; i < nurse.pastSchedule2019.priorVacationDates.length; i++) {
      workedPastHolidays = nurse.compareWithPastHolidaysWorked(nurse.vacationRequests[m].vacationReqDateRange, nurse.pastSchedule2019.daysWorked, unit.holidays2019);
      if (workedPastHolidays.length === 0) {
        console.log(`${nurse.firstName} ${nurse.lastName} did not work any holidays in 2019.`);
      } else {
        console.log(`${nurse.firstName} ${nurse.lastName} worked on these holidays in 2019: ${workedPastHolidays}. They may have their vacation request approved this year.`);
      }
    }
  }
  for (let m = 0; m < nurse.vacationRequests.length; m++) {
    for (let i = 0; i < nurse.pastSchedule2018.priorVacationDates.length; i++) {
      workedPastHolidays = nurse.compareWithPastHolidaysWorked(nurse.vacationRequests[m].vacationReqDateRange, nurse.pastSchedule2018.daysWorked, unit.holidays2018);
      if (workedPastHolidays.length === 0) {
        console.log(`${nurse.firstName} ${nurse.lastName} did not work any holidays in 2018.`);
      } else {
        console.log(`${nurse.firstName} ${nurse.lastName} worked on these holidays in 2018: ${workedPastHolidays}.`);
      }
    }
  }
}

// Show message for if there are overlapping vacation request dates within group of a nurse type
function showStaffOverlapVacReqs(unit, sortedStaff){
  let overlapVacReqs = unit.compareVacationRequests(sortedStaff);
  if ($.isEmptyObject(overlapVacReqs)) {
    console.log(`${sortedStaff[0].role}s in this Unit do not have any overlapping vacation requests.`);
  } else {
    console.log(`These ${sortedStaff[0].role}'s have overlapping vacation requests: ${Object.keys(overlapVacReqs)} on these dates: ${Object.values(overlapVacReqs)}`);
  }
}

// User Interface LOGIC ----------------------------------------------------
$(document).ready(function(){
  let unit = new Unit();
  $("#allVacationOutput").hide();
  $("#outputVacationMessage").show();
  $("#allWorkOutput").hide();
  $("#outputWorkMessage").show();

  // When put input in vacation start date field, check if end date is before start date and clear input if start date invalid
  document.getElementById("vacationStartDate").addEventListener("input", function(){
    let endDate = convertDateInput($("#workReturnDate").val());
    let startDate = convertDateInput($("#vacationStartDate").val());
    if (endDate != "" && endDate < startDate){
      alert("Start date must be before end date.");
      $("#vacationStartDate").val("");
    }
  });

  // When put input in work return date field, check if start date is after end date and clear input if end date invalid
  document.getElementById("workReturnDate").addEventListener("input", function(){
    let endDate = convertDateInput($("#workReturnDate").val());
    let startDate = convertDateInput($("#vacationStartDate").val());
    if (startDate != "" && endDate < startDate){
      alert("Start date must be before end date.");
      $("#workReturnDate").val("");
    }
  });

  // Set default due date to current date and put date into field
  unit.requestDueDate = new Date(); // Request Due Date: Current Date
  $("#dueDate").attr('value', unit.requestDueDate.toISOString().substr(0,10));
  let workDates = 1;

  // HARD-CODED TEST NURSE INFO
  let nurseG = new Nurse("mary", "smith", new Date("2013/06/09"), 1356, [1/3], "CN", 0.6);
  let nurseH = new Nurse("patricia", "johnson", new Date("2011/08/15"), 2356, [1/2], "CN", 0.9);
  let nurseI = new Nurse("linda", "williams", new Date("2003/02/14"), 5413, [], "CN", 0.3);
 
  let nurseJ = new Nurse("barbara", "jones", new Date("2007/04/17"), 7439, [1/3], "RN", 0.6);
  let nurseK = new Nurse("elizabeth", "brown", new Date("2002/08/08"), 4523, [1/2], "RN", 0.9);
  let nurseL = new Nurse("jennifer", "davis", new Date("1998/07/11"), 1743, [], "RN", 0.3);
  let nurseM = new Nurse("maria", "miller", new Date("2014/02/19"), 8482, [], "RN", 0.9);

  let nurseA = new Nurse("susan", "thomas", new Date("2000/01/02"), 1234, [2/3, 4/5], "NAC", 0.6);
  let nurseB = new Nurse("lisa", "lee", new Date("2011/02/08"), 3456, [1/3], "NAC", 0.6);
  let nurseC = new Nurse("nancy", "wright", new Date("2005/12/21"), 2345, [1/2], "NAC", 0.9);
  let nurseD = new Nurse("betty", "young", new Date("2008/03/14"), 543, [], "NAC", 0.3);
  let nurseE = new Nurse("carol", "turner", new Date("2018/01/24"), 5432, [], "NAC", 0.9);
  let nurseF = new Nurse("laura", "adams", new Date("2002/05/03"), 1543, [], "NAC", 0.9);

  // Add nurses to units, sort, and output to MVP Output Priority list
  addNurseToUnit(nurseA, unit);
  addNurseToUnit(nurseB, unit);
  addNurseToUnit(nurseC, unit);
  addNurseToUnit(nurseD, unit);
  addNurseToUnit(nurseE, unit);
  addNurseToUnit(nurseF, unit);
  addNurseToUnit(nurseG, unit);
  addNurseToUnit(nurseH, unit);
  addNurseToUnit(nurseI, unit);
  addNurseToUnit(nurseJ, unit);
  addNurseToUnit(nurseK, unit);
  addNurseToUnit(nurseL, unit);
  addNurseToUnit(nurseM, unit);

  unit.sortByFTE(unit.chargeNurses);
  unit.sortByFTE(unit.registeredNurses);
  unit.sortByFTE(unit.nursingAssistants);

  addToPriorityOutput(unit.sortedChargeNurses, "CNpriority");
  addToPriorityOutput(unit.sortedRegisteredNurses, "RNpriority");
  addToPriorityOutput(unit.sortedNursingAssistants, "NACpriority");

  showPriorVacations(nurseA);
  showPastHolidaysWorked(nurseA, unit);
  showStaffOverlapVacReqs(unit, unit.sortedChargeNurses);
  showStaffOverlapVacReqs(unit, unit.sortedRegisteredNurses);
  showStaffOverlapVacReqs(unit, unit.sortedNursingAssistants);

  // Change due date from default and display message that it changed
  $("#dueDateButton").click(function(event){
    event.preventDefault();
    unit.requestDueDate = convertDateInput($("#dueDate").val());
    $("#dateChanged").text("Date Changed to " + unit.requestDueDate.toDateString());
  });

  // When submit vacation form, take in inputs
  // Check if submitted before due date, have enough hours, and no duplicate requests with the same start and end dates for same nurse
  // Add vacation request to nurse and add to MVP All vacation request output area
  $("form#vacationForm").submit(function(event){
    event.preventDefault();
    let firstName = $("#firstName").val();
    let lastName = $("#lastName").val();
    let submissionDate = convertDateInput($("#submissionDate").val());
    let vacationStartDate = convertDateInput($("#vacationStartDate").val());
    let workReturnDate = convertDateInput($("#workReturnDate").val());
    let workDaysRequestedOff = $("#workDaysRequestedOff").val();
    let vacationHoursAvailable = $("#vacationHoursAvailable").val();
    let comments = $("#comments").val();

    let vacationRequest = new VacationRequest(firstName, lastName, submissionDate, vacationStartDate, workReturnDate, workDaysRequestedOff, vacationHoursAvailable, comments);

    vacationRequest.checkVacationHoursAvailable();
    let currentNurse = unit.searchNurse(firstName, lastName);
    if (vacationRequest.checkVacationSubmissionDate(unit.requestDueDate)){

      if(vacationRequest.adequateVacationHours === true){
        if (currentNurse.vacationRequests.some(request => request.vacationStartDate.getTime() === vacationRequest.vacationStartDate.getTime()) && currentNurse.vacationRequests.some(request => request.workReturnDate.getTime() === vacationRequest.workReturnDate.getTime())){
          $("#vacationMessage").text("Vacation request already exists!");
        } else {
          currentNurse.addVacationRequest(vacationRequest);
          $("#vacationOutput").empty();
          $("#allVacationOutput").show();
          $("#outputVacationMessage").hide();
          addVactionRequestOutput(unit.nurses);
          $("#vacationMessage").text("Vacation request succesfully submitted!");
        }

      } else {
        $("#vacationMessage").text(`Insufficient vacation hours available!  Available Hours: ${vacationHoursAvailable} Requested Hours: ${vacationRequest.hoursRequestedOff()}`);
      }
      
    } else {
      $("#vacationMessage").text(`Vacation request is past the submission due date: ${unit.requestDueDate.toDateString()}.`);
    }
    
  });

  // When click "+", add more work request date fields
  $("#moreDates").click(function(event){
    event.preventDefault();
    let dateField = document.createElement('input');
    dateField.type = "date";
    dateField.className = "workDates";
    dateField.id = "workDate" + workDates++;
    $("#multipleDates").append(dateField);
  });

  // When submit work request, check if no duplicates and add work requests to nurse for all date fields created and filled in
  $("#workSubmit").click(function(event){
    event.preventDefault();
    $("#workMessage").text("");
    $("#allWorkOutput").show();
    $("#outputWorkMessage").hide();
    let firstNameWork = $("#firstNameWork").val();
    let lastNameWork = $("#lastNameWork").val();
    let currentNurse = unit.searchNurse(firstNameWork, lastNameWork);

    let dates = document.getElementsByClassName("workDates");
    for (let i=0; i<dates.length; i++){
      let dateObj = convertDateInput(dates[i].value);

      if(dates[i].valueAsDate != null){
        if (currentNurse.workRequests.some(date => date.getTime() === dateObj.getTime())){
          $("#workMessage").append(`<p>Work request for ${dateObj.toDateString()} already exists!</p>`);
        } else {
          currentNurse.addWorkRequest(dateObj);
          $("#workMessage").append(`<p>Work request for ${dateObj.toDateString()} succesfully submitted!</p>`);
        }
        
      }
    }
    $("#workOutput").empty();
    addWorkRequestOutput(unit.nurses);
  });

  // When click sort vacation by name, show All Vacation Request output sorted by last name
  $("#vacationByName").click(function(event){
    event.preventDefault();
    $("#vacationOutput").empty();
    addVactionRequestOutput(unit.nurses);
  });

  // When click sort vacation by date, show All Vacation Request output sorted by start date
  $("#vacationByDate").click(function(event){
    event.preventDefault();
    $("#vacationOutput").empty();
    addVactionRequestOutput(unit.sortVacationsByStartDate(unit.nurses));
  });

  // When click sort work by name, show All Work Request output sorted by last name
  $("#workByName").click(function(event){
    event.preventDefault();
    $("#workOutput").empty();
    addWorkRequestOutput(unit.nurses);
  });

  // When click sort work by date, show All Work Request output sorted by date
  $("#workByDate").click(function(event){
    event.preventDefault();
    $("#workOutput").empty();
    let sorted = unit.sortWorkByDate(unit.nurses);
    addWorkRequestOutput(sorted);
  });
});