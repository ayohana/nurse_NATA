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
function addVacationRequestOutput(nurseArray){
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

// Check if current request had prior vacation dates that are the same for last 2 years and returns an array
function showPriorVacations(request, nurse) {
  let workedPastVacDates = [];
  let workedPast1VacDates = [];
  if(nurse.pastSchedule2019){
    for (let i = 0; i < nurse.pastSchedule2019.priorVacationDates.length; i++) {
      workedPastVacDates = nurse.compareWithPriorVacations(request.vacationReqDateRange, nurse.pastSchedule2019.priorVacationDates[i]);
    }
  }
  if(nurse.pastSchedule2018) {
    for (let i = 0; i < nurse.pastSchedule2018.priorVacationDates.length; i++) {
      workedPast1VacDates = nurse.compareWithPriorVacations(request.vacationReqDateRange, nurse.pastSchedule2018.priorVacationDates[i]);
    }
    workedPastVacDates = workedPastVacDates.concat(workedPast1VacDates);
  }
  return workedPastVacDates;
}

// NOT FINISHED
// Check if Nurse worked on the holidays in the past 2 years
function showPastHolidaysWorked(nurse, unit) {
  let workedPastHolidays;
  for (let m = 0; m < nurse.vacationRequests.length; m++) {
    for (let i = 0; i < nurse.pastSchedule2019.priorVacationDates.length; i++) {
      workedPastHolidays = nurse.compareWithPastHolidaysWorked(nurse.vacationRequests[m].vacationReqDateRange, nurse.pastSchedule2019.daysWorked, unit.holidays2019);
      if (workedPastHolidays.length === 0) {
        // console.log(`${nurse.firstName} ${nurse.lastName} did not work any holidays in 2019.`);
      } else {
        // console.log(`${nurse.firstName} ${nurse.lastName} worked on these holidays in 2019: ${workedPastHolidays}. They may have their vacation request approved this year.`);
      }
    }
  }
  for (let m = 0; m < nurse.vacationRequests.length; m++) {
    for (let i = 0; i < nurse.pastSchedule2018.priorVacationDates.length; i++) {
      workedPastHolidays = nurse.compareWithPastHolidaysWorked(nurse.vacationRequests[m].vacationReqDateRange, nurse.pastSchedule2018.daysWorked, unit.holidays2018);
      if (workedPastHolidays.length === 0) {
        // console.log(`${nurse.firstName} ${nurse.lastName} did not work any holidays in 2018.`);
      } else {
        // console.log(`${nurse.firstName} ${nurse.lastName} worked on these holidays in 2018: ${workedPastHolidays}.`);
      }
    }
  }
}


// Get overlapping vacations and names if there are overlapping vacation request dates within group of a nurse type
function showStaffOverlapVacReqs(unit, sortedStaff){
  return unit.compareVacationRequests(sortedStaff);
}

// User Interface LOGIC ----------------------------------------------------
$(document).ready(function(){
  let unit = new Unit();
  $("#allVacationOutput").hide();
  $("#outputVacationMessage").show();
  $("#allWorkOutput").hide();
  $("#outputWorkMessage").show();
  $("#conflictingOutput").hide();
  //$("#conflictingRequests").hide();

  // When enter input in vacation start date field, check if end date is before start date and clear input if start date invalid
  document.getElementById("vacationStartDate").addEventListener("input", function(){
    let endDate = convertDateInput($("#workReturnDate").val());
    let startDate = convertDateInput($("#vacationStartDate").val());
    if (endDate != "" && endDate < startDate){
      alert("Start date must be before end date.");
      $("#vacationStartDate").val("");
    }
  });

  // When enter input in work return date field, check if start date is after end date and clear input if end date invalid
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
  let nurseG = new Nurse("mary", "smith", new Date("2013/06/09"), 1356, "CN", 0.6);
  let nurseH = new Nurse("patricia", "johnson", new Date("2011/08/15"), 2356, "CN", 0.9);
  let nurseI = new Nurse("linda", "williams", new Date("2003/02/14"), 5413, "CN", 0.3);
 
  let nurseJ = new Nurse("barbara", "jones", new Date("2007/04/17"), 7439, "RN", 0.6);
  let nurseK = new Nurse("elizabeth", "brown", new Date("2002/08/08"), 4523, "RN", 0.9);
  let nurseL = new Nurse("jennifer", "davis", new Date("1998/07/11"), 1743,"RN", 0.3);
  let nurseM = new Nurse("maria", "miller", new Date("2014/02/19"), 8482, "RN", 0.9);

  let nurseA = new Nurse("susan", "thomas", new Date("2000/01/02"), 1234, "NAC", 0.6);
  let nurseB = new Nurse("lisa", "lee", new Date("2011/02/08"), 3456, "NAC", 0.6);
  let nurseC = new Nurse("nancy", "wright", new Date("2005/12/21"), 2345, "NAC", 0.9);
  let nurseD = new Nurse("betty", "young", new Date("2008/03/14"), 543, "NAC", 0.3);
  let nurseE = new Nurse("carol", "turner", new Date("2018/01/24"), 5432, "NAC", 0.9);
  let nurseF = new Nurse("laura", "adams", new Date("2002/05/03"), 1543, "NAC", 0.9);

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

  nurseA.pastSchedule2019.savePastSchedule([new Date("2019/06/01"), new Date("2019/06/02"), new Date("2019/06/04")]);
  nurseB.pastSchedule2019.savePastSchedule([new Date("2019/07/4"), new Date("2019/7/21"), new Date("2019/07/22"), new Date("2019/07/23"), new Date("2019/07/24")]);
  nurseC.pastSchedule2019.savePastSchedule([new Date("2019/06/03"), new Date("2019/06/04"), new Date("2019/06/05")]);
  nurseA.pastSchedule2019.savePriorVacationDates([new Date("2019/03/05"), new Date("2019/03/06"), new Date("2019/03/07")]);
  nurseB.pastSchedule2019.savePriorVacationDates([new Date("2019/06/29"), new Date("2019/06/30"), new Date("2019/07/01"), new Date("2019/07/02"), new Date("2019/07/03")]);
  nurseC.pastSchedule2019.savePriorVacationDates([]);
  nurseA.pastSchedule2018.savePriorVacationDates([new Date("2018/03/10"), new Date("2018/03/11"), new Date("2018/03/12")]);

  //showPriorVacations(nurseA);
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
  // Check if submitted before due date, have enough hours, not the same dates as previous years, and no duplicate requests with the same start and end dates for same nurse
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
        $("#priorVacationMessage").text("");
        vacationRequest.getDateRange();
        let pastOverlapVacations = showPriorVacations(vacationRequest, currentNurse);
        if (pastOverlapVacations.length > 0){
          $("#priorVacationMessage").text(`Similar vacation dates in last two years:`);
          for (let i=0; i< pastOverlapVacations.length; i++){
            $("#priorVacationMessage").append(`<p>${pastOverlapVacations[i].toDateString()}</p>`);
          }
        } else {
          $("#priorVacationMessage").text(`No similar vacation dates found in the last two years.`);

          if (currentNurse.vacationRequests.some(request => request.vacationStartDate.getTime() === vacationRequest.vacationStartDate.getTime()) && currentNurse.vacationRequests.some(request => request.workReturnDate.getTime() === vacationRequest.workReturnDate.getTime())){
            $("#vacationMessage").text("Vacation request already exists!");
          } else {
            currentNurse.addVacationRequest(vacationRequest);
            $("#vacationOutput").empty();
            $("#allVacationOutput").show();
            $("#outputVacationMessage").hide();
            addVacationRequestOutput(unit.nurses);
            $("#vacationMessage").text("Vacation request succesfully submitted!");
          }
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
    addVacationRequestOutput(unit.nurses);
  });

  // When click sort vacation by date, show All Vacation Request output sorted by start date
  $("#vacationByDate").click(function(event){
    event.preventDefault();
    $("#vacationOutput").empty();
    addVacationRequestOutput(unit.sortVacationsByStartDate(unit.nurses));
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

  // NOT FINISHED
  $("#showConflicts").click(function(event){
    event.preventDefault();
    $("#conflictingOutput").show();
    $("#conflictingCN").text("");
    $("#conflictingRN").text("");
    $("#conflictingNAC").text("");
    let CNOverlapObj = showStaffOverlapVacReqs(unit, unit.sortedChargeNurses);
    let RNOverlapObj = showStaffOverlapVacReqs(unit, unit.sortedRegisteredNurses);
    let NACOverlapObj = showStaffOverlapVacReqs(unit, unit.sortedNursingAssistants);
    if ($.isEmptyObject(CNOverlapObj)) {
      $("#conflictingCN").text("No overlapping vacation requests for CNs.");
    } else{
      Object.entries(CNOverlapObj).forEach(([key, value]) => $("#conflictingCN").append(`<li>${key} overlap on dates ${value}</li>`));
    }

    if($.isEmptyObject(RNOverlapObj)){
      $("#conflictingRN").text("No overlapping vacation requests for RNs.");
    } else {
      Object.entries(RNOverlapObj).forEach(([key, value]) => $("#conflictingRN").append(`<li>${key} overlap on dates ${value}</li>`));
    }

    if($.isEmptyObject(NACOverlapObj)){
      $("#conflictingNAC").text("No overlapping vacation requests for NACs.");
    } else{
      Object.entries(NACOverlapObj).forEach(([key, value]) => $("#conflictingNAC").append(`<li>${key} overlap on dates ${value}</li>`));
    }
  });
});