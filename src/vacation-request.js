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

  // Check if nurse has vacation hours available and return boolean
  checkVacationHoursAvailable() {
    let hoursRequestedOff = parseFloat(this.workDaysRequestedOff * 12);
    if (this.vacationHoursAvailable >= hoursRequestedOff) {
      this.adequateVacationHours = true;
    } else {
      this.adequateVacationHours = false;
    }
  }

  // Check if vacation request is submitted before due date
  checkVacationRequest(requestDueDate){
    if (this.submissionDate > requestDueDate) {
      return false;
    } else {
      return true;
    }
  }

  // For a start and end date, make an array of Date objects of all days in range and set range for this vacation request
  getDateRange() {
    let start = new Date(this.vacationStartDate);
    let end = new Date(this.workReturnDate);
    for (var range = [], i = start; i <= end; i.setDate(i.getDate()+1)) {
      range.push(new Date(i));
    }
    this.vacationReqDateRange = range;
  }

}