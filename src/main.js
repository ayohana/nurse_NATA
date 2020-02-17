import 'bootstrap' ; 
import 'bootstrap/dist/css/bootstrap.min.css' ; 
import './styles.css' ;
import $ from 'jquery';
import {Nurse} from './nurse';
import {Unit} from './unit';

$(document).ready(function(){
  let unit = new Unit();
  let nurseA = new Nurse("A", new Date(2000, 1, 2), 1234, [2/3, 4/5], "CN");
  let nurseB = new Nurse("B", new Date(2011, 2, 1), 3456, [1/3], "NAC");
  let nurseC = new Nurse("C", new Date(2005, 1, 2), 2345, [1/2], "NAC");
  let nurseD = new Nurse("D", new Date(2008, 3, 4), 543, [], "NAC")
  
  nurseA.assignRolePriority();
  nurseB.assignRolePriority();
  nurseC.assignRolePriority();
  nurseD.assignRolePriority();
  unit.addNurse(nurseA);
  unit.addNurse(nurseB);
  unit.addNurse(nurseC);
  unit.addNurse(nurseD);
  console.log("all nurses", unit.nurses);
  console.log("unit", unit);
  console.log("unsorted", unit.nursingAssistants);
  unit.assignGroupPriority(1);
  unit.assignGroupPriority(2);
  unit.assignGroupPriority(3);
  console.log("sorted",unit.nursingAssistants);
});