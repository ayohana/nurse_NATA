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
  $("#allVacationOutput").hide();
  $("#outputVacationMessage").show();
  $("#allWorkOutput").hide();
  $("#outputWorkMessage").show();

  document.getElementById("vacationStartDate").addEventListener("input", function(){
    let endDate = convertDateInput($("#workReturnDate").val());
    let startDate = convertDateInput($("#vacationStartDate").val());
    if (endDate != "" && endDate < startDate){
      alert("Start date must be before end date.");
      $("#vacationStartDate").val("endDate.toISOString().substr(0,10)");
    }
  });
  document.getElementById("workReturnDate").addEventListener("input", function(){
    let endDate = convertDateInput($("#workReturnDate").val());
    let startDate = convertDateInput($("#vacationStartDate").val());
    if (startDate != "" && endDate < startDate){
      alert("Start date must be before end date.");
      $("#workReturnDate").val("startDate.toISOString().substr(0,10)");
    }
  });

  unit.requestDueDate = new Date(); // Request Due Date: Current Date
  $("#dueDate").attr('value', unit.requestDueDate.toISOString().substr(0,10));
  let workDates = 1;

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
  nurseA.pastSchedule2019.savePriorVacationDates([]);
  nurseB.pastSchedule2019.savePriorVacationDates([new Date("2019/06/29"), new Date("2019/06/30"), new Date("2019/07/01"), new Date("2019/07/02"), new Date("2019/07/03")]);
  nurseC.pastSchedule2019.savePriorVacationDates([]);

  nurseA.addVacationRequestTest("A", "Last", new Date("2020/01/17"), new Date("2020/05/01"), new Date("2020/05/15"), 3, 100, "test1");
  nurseB.addVacationRequestTest("B", "Class", new Date("2020/01/15"), new Date("2020/06/30"), new Date("2020/07/02"), 3, 100, "test1");
  nurseB.addVacationRequestTest("B", "Class", new Date("2020/01/15"), new Date("2020/07/04"), new Date("2020/07/06"), 3, 100, "test1");
  nurseC.addVacationRequestTest("C", "Name", new Date("2020/01/20"), new Date("2020/05/01"), new Date("2020/05/15"), 3, 100, "test1");

  nurseG.addVacationRequestTest("G", "Gegege", new Date("2020/01/17"), new Date("2020/05/01"), new Date("2020/05/15"), 3, 100, "test1");
  nurseH.addVacationRequestTest("H", "Hihi", new Date("2020/01/15"), new Date("2020/06/30"), new Date("2020/07/05"), 3, 100, "test1");
  nurseI.addVacationRequestTest("I", "Eye", new Date("2020/01/15"), new Date("2020/07/01"), new Date("2020/07/06"), 3, 100, "test1");
 
  nurseB.analyzeVacationRequest(unit.holidays2020);
  nurseG.vacationRequests[0].getDateRange();
  nurseH.vacationRequests[0].getDateRange();
  nurseI.vacationRequests[0].getDateRange();
  console.log(unit.sortedChargeNurses);
  console.log(unit.compareWithOtherVacationRequests(unit.sortedChargeNurses));
 

      
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
      $("#allVacationOutput").show();
      $("#outputVacationMessage").hide();
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
    $("#allWorkOutput").show();
    $("#outputWorkMessage").hide();
    let firstNameWork = $("#firstNameWork").val();
    let lastNameWork = $("#lastNameWork").val();
    let currentNurse = unit.searchNurse(firstNameWork, lastNameWork);

    let dates = document.getElementsByClassName("workDates");
    for (let i=0; i<dates.length; i++){
      let dateObj = convertDateInput(dates[i].value);
      console.log(currentNurse.workRequests);
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

  $("#vacationByName").click(function(event){
    event.preventDefault();
    $("#vacationOutput").empty();
    addVactionRequestOutput(unit.nurses);
  });

  $("#workByName").click(function(event){
    event.preventDefault();
    $("#workOutput").empty();
    addWorkRequestOutput(unit.nurses);
  });
});