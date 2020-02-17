# [NursSync](https://github.com/ayohana/nurse_NATA.git/)

#### Team Week Javascript Project for Epicodus, 02.17.2020

#### By _**Adela Darmansyah, Tiffany Siu, Andriy Veremyeyev, Neha Doodi**_

## Description

**This is a web application to help a nurse scheduler organize nurses' vacation requests during Summer Prime Time at 3 Olympic, General Surgical Unit, Swedish Medical Center, Issaquah, WA.** A nurse scheduler can submit staff vacation requests and the application will return a priority list for all the requests. The priority list is determined by:

* Holiday work reqeusts
* Seniority level
* Previous year vacation dates
* FTE level

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
* As a scheduler, I want to be able to look up a nurse's vacation requests and her previous vacation so that I can review them.
* As a scheduler, I want to see the list of reasons why the application prioritizes a nurses vacation request so that I know why the nurse can have the request approved.

## Specifications

* _Gather input from user taken from paper vacation requests from nurses_
  * _Example Input: name, date submitted, dates for vacation, reason, total days off, vacation hours available, holiday work requests_
  * _Example Output: `console: `name, date submitted, dates for vacation, reason, total days off, vacation hours available, holiday work requests_
* _The program will prioritize nurses by seniority level by total hours worked cumulatively_
  * _Example Input: Nurse A=4300, Nurse B=6200, Nurse C=3100_
  * _Example Output: Nurse B > Nurse A > Nurse C_
* _The program will prioritize nurses by last year vacation dates_
  * _Example Input: Nurse B had same dates last year_
  * _Example Output: Nurse B not able to have the same days off_
* _The program will prioritize nurses by FTE level_
  * _Example Input: Nurse A=.6, Nurse B=per diem, Nurse C=.9_
  * _Example Output: Nurse C > Nurse A > Nurse B_
* _The program will output a priority list to user for the date being viewed_
  * _Example Input: Click "date"_
  * _Example Output: Final output= Nurse B > Nurse A > Nurse C_ 

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
