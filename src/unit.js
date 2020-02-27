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

  // Add nurse object into array of all nurses and correct array for type of nurse
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

  // Search nurse array by name and return if found
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

  // Sort array of nurses first by FTE, then sort by hours or hire date within their FTE group and return merged array with the groups intact
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

  // Merge FTE group arrays in correct order and return merged array
  mergedArrays(fullTime, partTime, perDiem){
    let mergedArray = perDiem.concat(partTime);
    mergedArray = mergedArray.concat(fullTime);
    for (let i=0; i<mergedArray.length; i++){
      mergedArray[i].groupPriority = i;
    }
    return mergedArray;
  }

  // Sort by hours worked, use for Nursing assistants
  sortByHours(roleArray){
    roleArray.sort((a,b) => parseFloat(b.hoursWorked) - parseFloat(a.hoursWorked));
  }

  // Sort by hire date, use for Charge nurses and Registered nurses
  sortByHireDate(roleArray){
    roleArray.sort((a,b) => a.hireDate - b.hireDate);
  }

  // Take nurse array and add all work requests into an array with the name, then sort by work request date and return sorted array
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

  // Take nurse array and add all vacation requests into an array with the name and vacation request object, then sort by start date and return sorted array
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

  // Take nurse array and sort by last name
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

  // Compares between nurses for overlapping dates within the type of nurse and returns an object with both nurses names as a key and the dates that overlap as a value
  compareVacationRequests(sortedStaff){
    let overlapVacationRequests = {};
    let staffNames;
    let staffIndex = 0;
    for (let j = 0; j < sortedStaff.length-1; j++){
      if (staffIndex >= sortedStaff.length - 1) {
        staffIndex = 0;
      } else {
        staffIndex += 1;
      }
      for (let i = 0; i < sortedStaff[j].vacationRequests.length; i++) {
        if (sortedStaff[j].vacationRequests.length != 0) {
          let rangeWithTime = [];
          sortedStaff[j].vacationRequests[i].vacationReqDateRange.forEach(element => rangeWithTime.push(element.getTime()));

          for(let l=staffIndex; l<sortedStaff.length; l++){
            if (Array.isArray(sortedStaff[l].vacationRequests) && sortedStaff[l].vacationRequests.length != 0 && l != j){

              for (let k = 0; k < sortedStaff[l].vacationRequests[i].vacationReqDateRange.length; k++){
                if (rangeWithTime.includes(sortedStaff[l].vacationRequests[i].vacationReqDateRange[k].getTime())){
                  staffNames = `${sortedStaff[j].firstName} ${sortedStaff[j].lastName} and ${sortedStaff[l].firstName} ${sortedStaff[l].lastName}`;
                  if (overlapVacationRequests[staffNames] == undefined){
                    overlapVacationRequests[staffNames] = "";
                  }
                  overlapVacationRequests[staffNames] += `${sortedStaff[l].vacationRequests[i].vacationReqDateRange[k].toDateString()} `;
                } 
              }
            }
          }
          
          
        }
      }
    }
    return overlapVacationRequests;
  }
}