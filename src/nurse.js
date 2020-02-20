import { PastSchedule } from "./past-schedule";

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

  // Assign role priority for type of nurse as a number
  assignRolePriority(){
    if(this.role === "CN"){
      this.rolePriority = 1;
    } else if (this.role === "RN"){
      this.rolePriority = 2;
    } else if (this.role === "NAC"){
      this.rolePriority = 3;
    }
  }

  // When add vacation requests, get the date range to save in vacation request and add to nurse
  addVacationRequest(vacationRequest){
    vacationRequest.getDateRange();
    this.vacationRequests.push(vacationRequest);
  }

  // Add work request to nurse
  addWorkRequest(workRequest){
    this.workRequests.push(workRequest);
  }

  // Check if range of dates in vacation request are the same as vacation dates in prior years and returns overlapping dates
  compareWithPriorVacations(vacReqDateRange, priorVacationDates){
    let overlapDates = [];
    for (let i = 0; i < vacReqDateRange.length; i++){
      for (let j = 0; j < priorVacationDates.length; j++) {
        if (vacReqDateRange[i].getDate() === priorVacationDates[j].getDate() && vacReqDateRange[i].getMonth() === priorVacationDates[j].getMonth()){
          overlapDates.push(priorVacationDates[j]);
        }
      }
    }
    return overlapDates;
  }

  // Check if range of dates in vacation request are the same as holidays worked in prior years and returns overlapping dates
  compareWithPastHolidaysWorked(vacReqDateRange, daysWorked, holidays){
    let workedPastHolidayDates = [];
    let vacReqDate;
    let pastWorkedDates;
    for (let i = 0; i < vacReqDateRange.length; i++){
      for (let j = 0; j < holidays.length; j++) {
        if (vacReqDateRange[i].getMonth() === holidays[j].getMonth() && vacReqDateRange[i].getDate() === holidays[j].getDate()){
          if (daysWorked[0] != undefined) {
            for (let k = 0; k < daysWorked[0].length; k++){
              vacReqDate = vacReqDateRange[i];
              pastWorkedDates = daysWorked[0][k];
              if (vacReqDate.getMonth() === pastWorkedDates.getMonth() && vacReqDate.getDate() === pastWorkedDates.getDate()){  
                workedPastHolidayDates.push(vacReqDate);
              } 
            }
          }
        }
      }
    }
    return workedPastHolidayDates;
  }

}