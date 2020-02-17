export class VacationRequest {
  constructor () {
    this.name;
    this.submissionDate;
    this.vacationStartDate;
    this.workReturnDate;
    this.workDaysRequestedOff;
    this.vacationHoursAvailable;
    this.comments;
    this.vacationApproval = false;
    this.approvedVacationStartDate;
    this.approvedVacationEndDate;
    this.approvedWorkReturnDate;
  }

  submitRequest(name, submissionDate, vacationStartDate, workReturnDate, workDaysRequestedOff, vacationHoursAvailable, comments){
    this.name = name;
    this.submissionDate = submissionDate;
    this.vacationStartDate = vacationStartDate;
    this.workReturnDate = workReturnDate;
    this.workDaysRequestedOff = workDaysRequestedOff;
    this.vacationHoursAvailable = vacationHoursAvailable;
    this.comments = comments;
  }

}