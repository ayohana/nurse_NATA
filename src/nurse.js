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

  checkVacationRequest(requestDueDate){
    if (this.vacationRequests[this.vacationRequests.length-1].submissionDate > requestDueDate) {
      return `Vacation request is past the submission due date: ${requestDueDate.toDateString()}. Please manually check if requested dates are still available.`;
    } else {
      return `Vacation request succesfully submitted!`;
    }
  }

  checkWorkRequest(requestDueDate){
    if (this.workRequests[this.workRequests.length-1].submissionDate > requestDueDate) {
      return `Work request is past the submission due date: ${requestDueDate.toDateString()}. Please manually check if requested work date is still available or if another staff member wants to have the day off.`;
    } else {
      return `Work request succesfully submitted!`;
    }
  }



  



  // Analyze vacation request:
 
  // 1 Analyze 2 years past schedule to see their vacation dates

  // analyzeVacationRequest(){

    //   for (i=0; i<this.vacationRequests.length; i++){
  //     if ( this.pastSchedule2019.priorVacationDates ) 
  //     this.pastSchedule2018.priorVacationDates
  //   }

  // 2 Analyze 2 years past schedule to see their past holidays worked (same priority with #2)

  // 3 Comparing nurse A and nurse B vacation requests
  //if they have same request dates then do #2 and #3
  //else look into their seniority (FTE, hours worked, etc)

  // Returns approval/rejection with the dates

  
}

