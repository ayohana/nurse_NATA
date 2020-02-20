export class PastSchedule {
  constructor (){
    this.daysWorked = [];
    this.priorVacationDates = [];
  }
  
  // Take days worked and sort them before adding to array of days worked
  savePastSchedule(datesWorked){
    datesWorked.sort(function(a, b){return a-b;});
    this.daysWorked.push(datesWorked);
  }

  // Take vacation days and sort them before adding to array of vacation dates
  savePriorVacationDates(vacationDates){
    vacationDates.sort(function(a, b){return a-b;});
    this.priorVacationDates.push(vacationDates);
  }

}