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
    vacationRequest.getDateRange();
    this.vacationRequests.push(vacationRequest);
  }

  addVacationRequest(vacationRequest){
    vacationRequest.getDateRange();
    this.vacationRequests.push(vacationRequest);
  }

  addWorkRequest(workRequest){
    this.workRequests.push(workRequest);
  }

  analyzeVacationRequest(holidays){

    //check for empty arrays - if empty, return no overlapping dates for instance
    this.vacationRequests[0].getDateRange();
    this.compareWithPriorVacations();
    // this.compareWithPriorVacations(this.pastSchedule2018.priorVacationDates);
    this.compareWithPastHolidaysWorked(this.pastSchedule2019.daysWorked[0], holidays);
    // this.compareWithPastHolidaysWorked(this.pastSchedule2018.daysWorked, holidays);
    // this.compareWithOtherVacationRequests(nursesRole);
  }

  checkVacationRequest(){
    let overlapVacationDates = this.compareWithPriorVacations(this.pastSchedule2019.priorVacationDates)
    if (overlapVacationDates.length === 0) {
      return `${this.firstName} ${this.lastName} do not have current vacation request dates overlapping with prior vacation dates.`
    } else {
      return overlapVacationDates;
    }
    
  }

  compareWithPriorVacations(){
    let overlapDates = [];
    let vacReqArr = this.vacationRequests;
    let priorVacArr = this.pastSchedule2019.priorVacationDates;
    console.log(vacReqArr);
    console.log(priorVacArr);

    for (let k = 0; k < vacReqArr.length; k++){
      for (let i = 0; i < vacReqArr[k].vacationReqDateRange.length; i++){
        console.log(vacReqArr[k].vacationReqDateRange[i]);
        console.log(vacReqArr[k].vacationReqDateRange[i].getDate() === priorVacArr[i].getDate());
      }
    }

    // for (let i=0; i < vacReqDateRange.length; i++){

    
    //   for (let j=0; j < priorVacationDates.length; j++) {
    //     if (vacReqDateRange[i].getDate() === priorVacationDates[j].getDate() && vacReqDateRange[i].getMonth() === priorVacationDates[j].getMonth()){
    //       overlapDates.push(priorVacationDates[j]);
    //     }
    //   }
    // }

    console.log(overlapDates);
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
  
}

