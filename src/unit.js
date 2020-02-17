import {Nurse} from `./nurse`;

export class Unit{
  constructor(){
    this.nurses = [];
    this.chargeNurses = [];
    this.registeredNurses = [];
    this.nursingAssistants = [];

  }

  addNurse(name){
    this.nurses.push(name);
    if (roleNumber === 1){
      this.chargeNurses.push(name);
    } else if (roleNumber === 2){
      this.registeredNurses.push(name);
    } else{
      this.nursingAssistants.push(name);
    }
  }

  assignGroupPriority(roleNumber){
    if (roleNumber === 1){
      this.chargeNurses.sort((a,b) => parseFloat(a.hoursWorked) - parseFloat(b.hoursWorked));
    }
    //Add for other roles
  }
}