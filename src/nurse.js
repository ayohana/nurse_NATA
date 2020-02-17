export class Nurse{
  constructor(name, hireDate, hoursWorked, priorDaysOff, role){
    this.name = name;
    this.hireDate = hireDate;
    this.hoursWorked = hoursWorked;
    this.priorDaysOff = priorDaysOff;
    this.role = role;
    this.vacationRequests = vacationRequests;
    this.rolePriority = 0;
    this.groupPriority = 0;
  }

  assignRolePriority(){
    if(this.role === "charge nurse"){
      this.rolePriority = 1;
    } else if (this.role === "registered nurse"){
      this.rolePriority = 2;
    } else if (this.role === "nursing assistant"){
      this.rolePriority = 3;
    }
  }

  
}

