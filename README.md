# [NursSync](https://github.com/ayohana/nurse_NATA.git/)

#### Team Week Javascript Project for Epicodus, 02.17.2020

#### By _**Adela Darmansyah, Tiffany Siu, Andriy Veremyeyev, Neha Doodi**_

## Description

**This is a web application to assist a nurse scheduler in organizing nurses' vacation requests during Summer Prime Time at Swedish Medical Center in Issaquah, WA, General Surgical Unit 3 Olympic**.  A nurse scheduler can input vacation requests received from staff of the dates they are requesting, how many of their work shifts they are requesting off, vacation hours available, and reason for the request.  The application will return a priority list of nurses according to the priority rules and a priority list for overlapping request dates between nurses. The priority list is determined by:

* FTE level (full-time, part-time, and per diem)
  * Per diem nurses are more able to have less working days so they have a higher priority for getting vacation days.
* Seniority level
  * Charge Nurses and Registered Nurses have seniority by the number of cumulative hours worked.  Nursing Assistants have seniority by their hire date.
* Previous year vacation dates
  * Nurses must take turns getting vacation dates off so if they had the same dates off in previous years, they are not allowed to get the same dates off this year.
* Holiday work requests
  * Special rules apply for holidays of ranking which holiday they want off the most

A nurse scheduler can also input work requests of days staff would like to work and have it display for comparison as well.

This application does **not** make decisions on which nurse gets the dates off and instead assists the nurse scheduler by providing an interface showing all relevant data in one place and providing priority lists for staff and requests.

## Setup/Installation Requirements

* Clone this [repository](https://github.com/ayohana/nurse_NATA.git/)
* Open the command line and navigate into the repository.
  * Use the command `npm install` to install all necessary plugins.
  * Use the command `npm run start` to start the web application.

### Requirements to Run
* _Web Browser_
* _Webpack_
* _Node.js_
* _NPM_

## Other Technologies Used

* _HTML_
* _CSS_
* _Javascript_
* _JQuery 3.4.1_
* _Bootstrap 4.4.1_
* _ESLint_
* _Babel_
* _Jest_
* _Markdown_

## Notable Features
<!-- _features that make project stand out_ -->

## User Stories

* As a scheduler, I want to be able to organize nurses vacation schedules without much paperwork so that I can be more efficient.
* As a scheduler, I want to be able to look up a nurse's vacation requests and her previous vacation days off so that I can review them.
* As a scheduler, I want to see a list of requests with the overlapping dates and the nurses that sent in the requests organized by priority so I can see which staff member should have priority in getting the request approved.

## Specifications

* _Show priority list of all nurses organized by priority from the priority rules_
  * _Example Input: NurseA profile, NurseB profile, NurseC profile, NurseD profile_
  * _Example Output: NurseB > NurseA > NurseD > NurseC_
* _Reject vacation request if submitted date is after due date for requests_
  * _Example Input: new vacation request with submission date after due date_
  * _Example Output: "Vacation request is past the submission due date"_
* _Gather input from user taken from paper vacation requests from nurses if submitted date is before due date_
  * _Example Input: name, date submitted, dates for vacation, reason, total shifts off, vacation hours available, holiday work requests_
  * _Example Output: table with name, dates for vacation, and reason for all requests_
* _Gather input from user for work request dates from nurses_
  * _Example Input: Nurse A=date1, date2 Nurse B=date3_
  * _Example Output: table with Nurse A date1, Nurse A date2, and Nurse B date3_
* _The program will prioritize nurses by last year vacation dates_
  * _Example Input: Nurse B had same dates last year_
  * _Example Output: Nurse B not able to have the same days off_
* _The program will prioritize nurses by FTE level_
  * _Example Input: Nurse A=.6, Nurse B=per diem, Nurse C=.9_
  * _Example Output: Nurse B > Nurse A > Nurse C_
* _The program will prioritize nurses by seniority level by total hours worked cumulatively_
  * _Example Input: Nurse A=4300, Nurse B=6200, Nurse C=3100_
  * _Example Output: Nurse B > Nurse A > Nurse C_
* _The program will output a priority list for overlapping vacation request dates_
  * _Example Input: Nurse A=2/4-2/6 priority=3, Nurse B=2/5-2/7 priority=2, Nurse C=2/6-2/8 priority=1_
  * _Example Output: Nurse C > Nurse B > Nurse A_

## Screenshots

<!-- _Here is a snippet of what the input looks like:_

![Snippet of input fields](img/snippet1.png)

_Here is a preview of what the output looks like:_

![Snippet of output box](img/snippet2.png) -->

<!-- _{Show pictures using ![alt text](image.jpg), show what library does as concisely as possible but don't need to explain how project solves problem from `code`_ -->

## Test Case Example
<!-- _Tests are done through Jest and are run from the command line prompt with `npm test`._
_Some example tests:_
![Snippet of an example test](img/test1.png)

![Snippet of an example result](img/test2.png) -->
<!-- _describe and show how to run tests with `code` examples}_ -->

## Known Bugs

There are currently no known bugs in this program.

## Support and contact details

If there are any question or concerns please contact us at our emails:

* [Adela Darmansyah](mailto:adela.yohana@gmail.com)
* [Tiffany Siu](mailto:tsiu88@gmail.com)
* [Neha Doodi](mailto:nehadoodipoonia@gmail.com)
* [Andriy Veremyeyev](mailto:belyybrat@gmail.com)

Thank you.

### License

*This software is licensed under the MIT license*

Copyright (c) 2020 **_Adela Darmansyah, Tiffany Siu, Andriy Veremyeyev, Neha Doodi_**
