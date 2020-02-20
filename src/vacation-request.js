export class VacationRequest {
  constructor(firstName, lastName, submissionDate, vacationStartDate, workReturnDate, workDaysRequestedOff, vacationHoursAvailable, comments) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.submissionDate = submissionDate;
    this.vacationStartDate = vacationStartDate;
    this.workReturnDate = workReturnDate;
    this.vacationReqDateRange = [];
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

  checkVacationRequest(requestDueDate){
    if (this.submissionDate > requestDueDate) {
      return false;
    } else {
      return true;
    }
  }

  getDateRange() {
    let start = new Date(this.vacationStartDate);
    let end = new Date(this.workReturnDate);
    for (var range = [], i = start; i <= end; i.setDate(i.getDate()+1)) {
      range.push(new Date(i));
    }
    this.vacationReqDateRange = range;
  }

}