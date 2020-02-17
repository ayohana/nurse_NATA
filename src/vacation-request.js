export class VacationRequest {
  constructor () {
    this.name = name;
    this.submissionDate = submissionDate;
    this.vacationStartDate = vacationStartDate;
    this.workReturnDate = workReturnDate;
    this.workDaysRequestedOff = workDaysRequestedOff;
    this.vacationHoursAvailable = vacationHoursAvailable;
    this.comments = comments;
    this.vacationApproval = false;
    this.approvedVacationStartDate;
    this.approvedVacationEndDate;
    this.approvedWorkReturnDate;
  }
}