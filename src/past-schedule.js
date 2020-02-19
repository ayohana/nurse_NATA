export class PastSchedule {
  constructor (){
    this.daysWorked = [];
    this.priorVacationDates = [];
  }
  
  savePastSchedule(datesWorked){
    datesWorked.sort(function(a, b){return a-b;});
    this.daysWorked.push(datesWorked);
  }

  savePriorVacationDates(vacationDates){
    vacationDates.sort(function(a, b){return a-b;});
    this.priorVacationDates.push(vacationDates);
  }

}