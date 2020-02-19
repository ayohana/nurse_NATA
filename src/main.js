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

function convertDateInput(input){
  return new Date(input.replace(/-/g, '/'));
}

$(document).ready(function(){
  let unit = new Unit();
  unit.requestDueDate = new Date(); // Request Due Date: Current Date
  $("#dueDate").attr('value', unit.requestDueDate.toISOString().substr(0,10));
  let workDates = 1;

  let nurseG = new Nurse("G", "Gegege", new Date("2013/06/09"), 1356, [1/3], "CN", 0.6);
  let nurseH = new Nurse("H", "Hihi", new Date("2011/08/15"), 2356, [1/2], "CN", 0.9);
  let nurseI = new Nurse("I", "Eye", new Date("2003/02/14"), 5413, [], "CN", 0.3);

  let nurseJ = new Nurse("J", "Bird", new Date("2007/04/17"), 7439, [1/3], "RN", 0.6);
  let nurseK = new Nurse("K", "Okokok", new Date("2002/08/08"), 4523, [1/2], "RN", 0.9);
  let nurseL = new Nurse("L", "El", new Date("1998/07/11"), 1743, [], "RN", 0.3);
  let nurseM = new Nurse("M", "Mmmmm", new Date("2014/02/19"), 8482, [], "RN", 0.9);

  let nurseA = new Nurse("A", "Last", new Date("2000/01/02"), 1234, [2/3, 4/5], "NAC", 0.6);
  let nurseB = new Nurse("B", "Class", new Date("2011/02/08"), 3456, [1/3], "NAC", 0.6);
  let nurseC = new Nurse("C", "Name", new Date("2005/12/21"), 2345, [1/2], "NAC", 0.9);
  let nurseD = new Nurse("D", "Rank", new Date("2008/03/14"), 543, [], "NAC", 0.3);
  let nurseE = new Nurse("E", "EEEE", new Date("2018/01/24"), 5432, [], "NAC", 0.9);
  let nurseF = new Nurse("F", "FFFF", new Date("2002/05/03"), 1543, [], "NAC", 0.9);


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

  // nurseA.pastSchedule2019.savePastSchedule([new Date("2019/06/01"), new Date("2019/06/02"), new Date("2019/06/04")]);
  nurseB.pastSchedule2019.savePastSchedule([new Date("2019/07/4"), new Date("2019/7/21"), new Date("2019/07/22"), new Date("2019/07/23"), new Date("2019/07/24")]);
  // nurseC.pastSchedule2019.savePastSchedule([new Date("2019/06/03"), new Date("2019/06/04"), new Date("2019/06/05")]);
  // nurseA.pastSchedule2019.savePriorVacationDates([]);
  nurseB.pastSchedule2019.savePriorVacationDates([new Date("2019/06/29"), new Date("2019/06/30"), new Date("2019/07/01"), new Date("2019/07/02"), new Date("2019/07/03")]);
  // nurseC.pastSchedule2019.savePriorVacationDates([]);

  // nurseA.addVacationRequestTest("A", "Last", new Date("2020/01/17"), new Date("2020/05/01"), new Date("2020/05/15"), 3, 100, "test1"); // Request Date: 1/17/20
  // nurseB.addVacationRequestTest("B", "Class", new Date("2020/01/15"), new Date("2020/06/30"), new Date("2020/07/02"), 3, 100, "test1");
  nurseB.addVacationRequestTest("B", "Class", new Date("2020/01/15"), new Date("2020/07/04"), new Date("2020/07/06"), 3, 100, "test1");
  // nurseC.addVacationRequestTest("C", "Name", new Date("2020/01/20"), new Date("2020/05/01"), new Date("2020/05/15"), 3, 100, "test1");

 
  nurseB.analyzeVacationRequest(unit.holidays2020);
  // console.log("overlap:" + nurseB.compareWithPriorVacations(nurseB.pastSchedule2019.priorVacationDates[0]));

  console.log(nurseB.pastSchedule2019.daysWorked[0])
  nurseB.compareWithPastHolidaysWorked(nurseB.pastSchedule2019.daysWorked[0], unit.holidays2020);


  // console.log(unit);
  // console.log(nurseA);
  console.log(nurseB);
  // console.log(nurseC);

  $("#dueDateButton").click(function(event){
    event.preventDefault();
    unit.requestDueDate = $("#dueDate").val();
    $("#dateChanged").text("Date Changed to " + unit.requestDueDate);
  });

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
    if (vacationRequest.checkVacationRequest(unit.requestDueDate)){
      currentNurse.addVacationRequest(vacationRequest);
      $("#vacationOutput").empty();
      addVactionRequestOutput(unit.nurses);
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
      let dateObj = convertDateInput(dates[i].value);
      if(dates[i].valueAsDate != null){
        currentNurse.addWorkRequest(dateObj);
        $("#workMessage").append(`Work request for ${dateObj.toDateString()} succesfully submitted!`);
      }
    }
    $("#workOutput").empty();
    addWorkRequestOutput(unit.nurses);
  });


});