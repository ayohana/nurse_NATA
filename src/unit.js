//import {Nurse} from './nurse';

export class Unit{
  constructor(){
    this.nurses = [];
    this.chargeNurses = [];
    this.registeredNurses = [];
    this.nursingAssistants = [];
    this.sortedChargeNurses = [];
    this.sortedRegisteredNurses = [];
    this.sortedNursingAssistants = [];
  }

  addNurse(nurse){
    this.nurses.push(nurse);
    this.sortByLastName(this.nurses);
    if (nurse.rolePriority === 1){
      this.chargeNurses.push(nurse);
    } else if (nurse.rolePriority === 2){
      this.registeredNurses.push(nurse);
    } else{
      this.nursingAssistants.push(nurse);
    }
  }

  sortByFTE(array){
    let fullTime = [];
    let partTime = [];
    let perDiem = [];
    let roleNumber;
    if(array === undefined || array.length == 0){
      roleNumber = 0;
    } else {
      roleNumber = array[0].rolePriority;
    }
    
    for (let i=0; i<array.length; i++){
      if(array[i].fte === 0.9){
        fullTime.push(array[i]);
      } else if (array[i].fte === 0.6){
        partTime.push(array[i]);
      } else {
        perDiem.push(array[i]);
      }
    }
    console.log("full time", fullTime);
    console.log("part time", partTime);
    console.log("per diem", perDiem);
    if (roleNumber ===1 || roleNumber === 2){
      this.sortByHours(fullTime);
      this.sortByHours(partTime);
      this.sortByHours(perDiem);
      if (roleNumber ===1){
        this.sortedChargeNurses = this.mergedArrays(fullTime,partTime,perDiem);
      } else{
        this.sortedRegisteredNurses = this.mergedArrays(fullTime,partTime,perDiem);
      }
    } else {
      this.sortByHireDate(fullTime);
      this.sortByHireDate(partTime);
      this.sortByHireDate(perDiem);
      this.sortedNursingAssistants = this.mergedArrays(fullTime,partTime,perDiem);
    }

  }

  mergedArrays(fullTime, partTime, perDiem){
    let mergedArray = perDiem.concat(partTime);
    mergedArray = mergedArray.concat(fullTime);
    for (let i=0; i<mergedArray.length; i++){
      mergedArray[i].groupPriority = i;
    }
    return mergedArray;
  }

  // assignGroupPriority(roleNumber){
  //   if (roleNumber === 1){
  //     this.sortByHours(this.chargeNurses);
  //   } else if (roleNumber === 2){
  //     this.sortByHours(this.registeredNurses);
  //   } else{
  //     this.sortByHireDate(this.nursingAssistants);
  //   }
  // }

  sortByHours(roleArray){
    roleArray.sort((a,b) => parseFloat(a.hoursWorked) - parseFloat(b.hoursWorked));
  }

  sortByHireDate(roleArray){
    roleArray.sort((a,b) => a.hireDate - b.hireDate);
  }

  sortByLastName(nurseArray){
    nurseArray.sort(function(a,b){
      let c = a.lastName.toLowerCase();
      let d = b.lastName.toLowerCase();
      if (c < d){
        return -1;
      }
      if (c > d){
        return 1;
      }
      return 0;
    }); 
  }
}