//import {Nurse} from './nurse';

export class Unit{
  constructor(){
    this.nurses = [];
    this.chargeNurses = [];
    this.registeredNurses = [];
    this.nursingAssistants = [];

  }

  addNurse(nurse){
    this.nurses.push(nurse);
    if (nurse.rolePriority === 1){
      this.chargeNurses.push(nurse);
    } else if (nurse.rolePriority === 2){
      this.registeredNurses.push(nurse);
    } else{
      this.nursingAssistants.push(nurse);
    }
  }

  assignGroupPriority(roleNumber){
    if (roleNumber === 1){
      this.sortByHours(this.chargeNurses);
    } else if (roleNumber === 2){
      this.sortByHours(this.registeredNurses);
    } else{
      this.sortByHireDate(this.nursingAssistants);
    }
  }

  sortByHours(roleArray){
    roleArray.sort((a,b) => parseFloat(a.hoursWorked) - parseFloat(b.hoursWorked));
    for (let i=0; i<roleArray.length; i++){
      roleArray[i].groupPriority = i;
    }
  }

  sortByHireDate(roleArray){
    roleArray.sort((a,b) => a.hireDate - b.hireDate);
    for (let i=0; i<roleArray.length; i++){
      roleArray[i].groupPriority = i;
    }
  }
}