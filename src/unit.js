export class Unit{
  constructor(){
    this.nurses = [];
    this.chargeNurses = [];
    this.registeredNurses = [];
    this.nursingAssistants = [];
    this.sortedChargeNurses = [];
    this.sortedRegisteredNurses = [];
    this.sortedNursingAssistants = [];
    this.requestDueDate;
    this.holidays2020 = [new Date("2020/07/04"), new Date("2020/09/07")];
    this.holidays2019 = [new Date("2019/07/04"), new Date("2019/09/02")];
    this.holidays2018 = [new Date("2018/07/04"), new Date("2018/09/03")];
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

  searchNurse(firstName, lastName){
    for(let i=0; i< this.nurses.length; i++){
      if (lastName.toLowerCase() === this.nurses[i].lastName){
        if(firstName.toLowerCase() === this.nurses[i].firstName || firstName == ""){
          return this.nurses[i];
        }
        
      } 
    }
    alert("No nurse found by this name");
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

  sortByHours(roleArray){
    roleArray.sort((a,b) => parseFloat(b.hoursWorked) - parseFloat(a.hoursWorked));
  }

  sortByHireDate(roleArray){
    roleArray.sort((a,b) => a.hireDate - b.hireDate);
  }

  sortWorkByDate(nurseArray){
    let workArray = [];
    for (let i=0; i< nurseArray.length; i++){
      if (nurseArray[i].workRequests.length > 0){
        for (let j=0; j< nurseArray[i].workRequests.length; j++){
          let request = {firstName: nurseArray[i].firstName, lastName: nurseArray[i].lastName, workRequests: [nurseArray[i].workRequests[j]]};
          workArray.push(request);
        }
      }
    }
    workArray.sort((a,b) => a.workRequests[0].getTime() - b.workRequests[0].getTime());
    return workArray;
  }

  sortVacationsByStartDate(nurseArray){
    let vacationArray = [];
    for (let i=0; i< nurseArray.length; i++){
      if (nurseArray[i].vacationRequests.length > 0){
        for (let j=0; j< nurseArray[i].vacationRequests.length; j++){
          let request = {firstName: nurseArray[i].firstName, lastName: nurseArray[i].lastName, vacationRequests: [nurseArray[i].vacationRequests[j]]};
          vacationArray.push(request);
        }
      }
    }
    vacationArray.sort((a,b) => a.vacationRequests[0].vacationStartDate - b.vacationRequests[0].vacationStartDate);
    return vacationArray;
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

  compareVacationRequests(sortedStaff){
    let overlapVacationRequests = {};
    let staffNames;
    let staffIndex = 0;
    for (let j = 0; j < sortedStaff.length; j++){
      if (staffIndex >= sortedStaff.length - 1) {
        staffIndex = 0;
      } else {
        staffIndex += 1;
      }
      for (let i = 0; i < sortedStaff[j].vacationRequests.length; i++) {
        if (sortedStaff[j].vacationRequests.length != 0) {
          let rangeWithTime = [];
          sortedStaff[j].vacationRequests[i].vacationReqDateRange.forEach(element => rangeWithTime.push(element.getTime()));
          for (let k = 0; k < sortedStaff[staffIndex].vacationRequests[i].vacationReqDateRange.length; k++){
            if (rangeWithTime.includes(sortedStaff[staffIndex].vacationRequests[i].vacationReqDateRange[k].getTime())){
              staffNames = `${sortedStaff[j].firstName} ${sortedStaff[j].lastName} and ${sortedStaff[staffIndex].firstName} ${sortedStaff[staffIndex].lastName}`;
              overlapVacationRequests[staffNames] += `${sortedStaff[j].vacationRequests[i].vacationReqDateRange[k]} `;
            } 
          }
        }
      }
    }
    return overlapVacationRequests;
  }


}