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

  assignRolePriority(){
    if(this.role === "CN"){
      this.rolePriority = 1;
    } else if (this.role === "RN"){
      this.rolePriority = 2;
    } else if (this.role === "NAC"){
      this.rolePriority = 3;
    }
  }

  addVacationRequest(vacationRequest){
    this.vacationRequests.push(vacationRequest);
  }

  addWorkRequest(workRequest){
    this.workRequests.push(workRequest);
  }

  analyzeVacationRequest(){
  // 1 Work requests for this year

  // 2 

  // 3

  // 4

  // 5 
  }
}

