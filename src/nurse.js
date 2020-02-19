import { PastSchedule } from "./past-schedule";
import { VacationRequest } from "./vacation-request";

export class Nurse{
  constructor(firstName, lastName, hireDate, hoursWorked, priorDaysOff, role, fte){
    this.firstName = firstName.toLowerCase();
    this.lastName = lastName.toLowerCase();
    this.hireDate = hireDate;
    this.hoursWorked = hoursWorked;
    this.priorDaysOff = priorDaysOff;
    this.role = role;
    this.fte = fte;
    this.vacationRequests = [];
    this.workRequests = [];
    this.pastSchedule2018 = new PastSchedule();
    this.pastSchedule2019 = new PastSchedule();
    this.rolePriority = 0;
    this.groupPriority = 0;
  }

  assignRolePriority(){
    if(this.role === "CN"){
      this.rolePriority = 1;
    } else if (this.role === "RN"){
      this.rolePriority = 2;
    } else if (this.role === "NAC"){
      this.rolePriority = 3;
    }
  }

  // Remove function below when tests are complete!
  addVacationRequestTest(firstName, lastName, submissionDate, vacationStartDate, workReturnDate, workDaysRequestedOff, vacationHoursAvailable, comments){
    let vacationRequest = new VacationRequest(firstName, lastName, submissionDate, vacationStartDate, workReturnDate, workDaysRequestedOff, vacationHoursAvailable, comments);
    this.vacationRequests.push(vacationRequest);
  }

  addVacationRequest(vacationRequest){
    this.vacationRequests.push(vacationRequest);
  }

  addWorkRequest(workRequest){
    this.workRequests.push(workRequest);
  }

  // (Separate function?) Schedule holiday for CN first, RN second, NAC third

  // Analyze work request:
    // 1 If vacation request is submitted after the deadline, do not analyze the request. Scheduler checks manually
    // 2 Plug in work request to calendar so that other nurses who requested off can get a chance to have those dates off

  

  checkWorkRequest(requestDueDate){
    if (this.workRequests[this.workRequests.length-1].submissionDate > requestDueDate) {
      return `Work request is past the submission due date: ${requestDueDate.toDateString()}. Please manually check if requested work date is still available or if another staff member wants to have the day off.`;
    } else {
      return `Work request succesfully submitted!`;
    }
  }

  



  



  // Analyze vacation request:

  analyzeVacationRequest(groupOfNurses){
    this.compareWithPriorVacations();
    this.compareWithPastHolidaysWorked();
    this.compareWithOtherVacationRequests(groupOfNurses);
  }
 
  // 1 Analyze 2 years past schedule to see their vacation dates

  compareWithPriorVacations(){

    let vacations2020 = this.vacationRequests;
    let vacations2019 = this.pastSchedule2019.priorVacationDates;
    let vacations2018 = this.pastSchedule2018.priorVacationDates;

    for (let i=0; i < vacations2020.length; i++){
      if (vacations2019.includes(vacations2020[i]) || vacations2018.includes(vacations2020[i]) ){
        return console.log(`Vacations dates overlaped with ${vacations2020[i]}`);
      }
    }
  }


  // 2 Analyze 2 years past schedule to see their past holidays worked (same priority with #2)

  compareWithPastHolidaysWorked(){
    let vacations2020 = this.vacationRequests;
    let holidays2020 = this.holidays2020;
    let workdays2019 = this.pastSchedule2019.daysWorked;
    let workdays2018 = this.pastSchedule2018.daysWorked;

    for (let i=0; i < vacations2020.length; i++){
      if (holidays2020.includes(vacations2020[i]) ){
        if (workdays2019.includes(vacations2020[i]) || workdays2018.includes(vacations2020[i]) ){
          continue;
        }
      } else {
        return console.log(`You didn't work this holiday ${vacations2020[i]} `);
      }
    }
  }

  // 3 Comparing nurse A and nurse B vacation requests
  //if they have same request dates then do #2 and #3
  //else look into their seniority (FTE, hours worked, etc)

  // Returns approval/rejection with the dates

  compareWithOtherVacationRequests(groupOfNurses){
    let vacations2020 = this.vacationRequests;
    for (let i=0; i < vacations2020.length; i++){
      for (let j=0; j < groupOfNurses.length; j++) {
        let otherRequest = groupOfNurses[j].vacationRequests;
        if (otherRequest.includes(vacations2020[i]) ){
          return console.log(`Your day ${vacations2020[i]} overlapped with other person request`);
        }
      }
    }
  }
  
}

