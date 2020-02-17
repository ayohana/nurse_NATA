export class VacationRequest {
  constructor(firstName, lastName, submissionDate, vacationStartDate, workReturnDate, workDaysRequestedOff, vacationHoursAvailable, comments) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.submissionDate = submissionDate;
    this.vacationStartDate = vacationStartDate;
    this.workReturnDate = workReturnDate;
    this.workDaysRequestedOff = workDaysRequestedOff;
    this.vacationHoursAvailable = vacationHoursAvailable;
    this.comments = comments;
    this.adequateVacationHours;
    this.vacationApproval = false;
    this.approvedVacationStartDate;
    this.approvedVacationEndDate;
    this.approvedWorkReturnDate;
  }

  checkVacationHoursAvailable() {
    let hoursRequestedOff = parseFloat(this.workDaysRequestedOff * 12);
    if (this.vacationHoursAvailable >= hoursRequestedOff) {
      this.adequateVacationHours = true;
    } else {
      this.adequateVacationHours = false;
    }
  }

}