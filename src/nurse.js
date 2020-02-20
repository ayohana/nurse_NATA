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

  // Analyze vacation request:

  // holidays = unit.holidays2020
  // nurses.Role = unit.sortedNursingAssistants (for instance)
  // nurse.vacationRequest[0].vacationReqDateRange

  // analyzeVacationRequest(nursesRole, holidays){
  analyzeVacationRequest(holidays){

    //check for empty arrays - if empty, return no overlapping dates for instance
    this.vacationRequests[0].getDateRange();
    this.compareWithPriorVacations(this.pastSchedule2019.priorVacationDates[0]);
    // this.compareWithPriorVacations(this.pastSchedule2018.priorVacationDates);
    this.compareWithPastHolidaysWorked(this.pastSchedule2019.daysWorked[0], holidays);
    // this.compareWithPastHolidaysWorked(this.pastSchedule2018.daysWorked, holidays);
    // this.compareWithOtherVacationRequests(nursesRole);
  }

  compareWithPriorVacations(priorVacationDates){
    let vacationRequest = this.vacationRequests[0].vacationReqDateRange;
    let overlapDates = [];
    for (let i=0; i < vacationRequest.length; i++){
      for (let j=0; j < priorVacationDates.length; j++) {
        if (vacationRequest[i].getDate() === priorVacationDates[j].getDate() && vacationRequest[i].getMonth() === priorVacationDates[j].getMonth()){
          overlapDates.push(priorVacationDates[j]);
        }
      }
    }
    return overlapDates;
  }

  compareWithPastHolidaysWorked(daysWorked, holidays){
    let vacationRequest = this.vacationRequests[0].vacationReqDateRange;
    let workedPastHolidayDates = [];
    for (let i=0; i < vacationRequest.length; i++){
      for (let j=0; j < holidays.length; j++) {
        if (vacationRequest[i].getTime() === holidays[j].getTime() ){
          for (let k=0; k < daysWorked.length; k++){
            if (vacationRequest[i].getMonth() === daysWorked[k].getMonth() && vacationRequest[i].getDate() === daysWorked[k].getDate()){  
              workedPastHolidayDates.push("Worked holidays: " + daysWorked[k]);
            } 
          }
        }
      }
    }
    return workedPastHolidayDates;
  }

  // 3 Comparing nurse A and nurse B vacation requests
  //if they have same request dates then do #2 and #3
  //else look into their seniority (FTE, hours worked, etc)

  // Returns approval/rejection with the dates

  
  
}

