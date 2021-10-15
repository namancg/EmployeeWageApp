let isUpdate = false;
let employeePayrollObj  = {};
window.addEventListener('DOMContentLoaded', (event) =>{
  const name = document.querySelector('#name');
  const textError = document.querySelector('.text-error');
  name.addEventListener('input', function() {
    if(name.value.length == 0){
      textError.textContent = "";
      return;
    }
    try{
      (new EmployeePayrollData()).name = name.value;
      textError.textContent = "";
    } 
    catch(e) {
      textError.textContent = e;
    }
  });

  const startDateError = document.querySelector('.startDate-error');
  const day  = document.querySelector('#day');
  const month  = document.querySelector('#month');
  const year  = document.querySelector('#year');
  const dateSelect = document.querySelector('.select-div');
  dateSelect.addEventListener('input', function(){
    const date = new Date(day.value+"/"+month.value+"/"+year.value);
    try{
      (new EmployeePayrollData()).startDate = date;
      startDateError.textContent = "";
    } 
    catch(e) {
      startDateError.textContent = e;
    }
  })
    
  const salary = document.querySelector('#salary');
  const output  = document.querySelector('.salary-output');
  output.textContent = salary.value;
  salary.addEventListener('input', function(){
    output.textContent = salary.value;
  });
  checkForUpdate();
});


const save = () => {
  try{
    let employeePayrollData = createEmployeePayroll();
    createAndUpdateStorage(employeePayrollData);
  }
  catch(e){
    return;
  }
}

const createEmployeePayroll = () => {
  let employeePayrollData = new EmployeePayrollData();
  const textError = document.querySelector('.text-error');
  try{
    employeePayrollData.name = getInputValueById('#name');
  }
  catch (e) {
    textError.textContent = e;
    throw e;
  }
  employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
  employeePayrollData.gender = getSelectedValues('[name=gender').pop();
  employeePayrollData.departments = getSelectedValues('[name=department');
  employeePayrollData.salary = getInputValueById('#salary');
  employeePayrollData.notes = getInputValueById('#notes');
  employeePayrollData.id = new Date().getTime();
  const startDateError = document.querySelector('.startDate-error');
  let date = getInputValueById('#day')+"/"+ getInputValueById('#month')+"/"+ getInputValueById('#year');
  try {
    employeePayrollData.startDate = new Date(date);
  }
  catch(e){
    startDateError.textContent = e;
    throw e;
  }
  alert(employeePayrollData.toString());
  return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  let selItems = [];
  allItems.forEach(item => {
    if(item.checked) selItems.push(item.value);
  });
  return selItems;
}

const getInputValueById = (id) => {
  let value  = document.querySelector(id).value;
  return value;
}

const getInputElementValue =(id) => {
  return document.getElementById(id).value;
}


function createAndUpdateStorage(employeePayrollData) {
  let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));

  if(employeePayrollList != undefined) {
    employeePayrollList.push(employeePayrollData);
  }
  else {
    employeePayrollList = [employeePayrollData]
  }
  alert(employeePayrollList.toString());
  localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}


const resetForm = () => {
  setValue('#name','');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValue('#salary','');
  setValue('#notes','');
  setValue('#day','1');
  setValue('#month','January');
  setValue('#year','2020');
  setTextValue('#salary-value',400000);
}

const unsetSelectedValues = (propertyValue) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
    item.checked = false;
  });
}

const setTextValue = (id, value) =>{
  const element = document.querySelector(id);
  element.textContent = value;
}

const setValue = (id, value) => {
  const element = document.querySelector(id);
  element.value = value;
}

onst checkForUpdate = () => {
  const employeePayrollJson = localStorage.getItem('editEmp');
  isUpdate = employeePayrollJson ? true : false;
  if(!isUpdate) return;
  employeePayrollObj = JSON.parse(employeePayrollJson);
  setForm();
}

const setForm = () => {
  setValue('#name', employeePayrollObj._name);
  setSelectedValues('[name=profile]', employeePayrollObj._profilePic);
  setSelectedValues('[name=gender]',employeePayrollObj._gender);
  setSelectedValues('[name=department]',employeePayrollObj._departments);
  setValue('#salary',employeePayrollObj._salary);
  setTextValue('.salary-output', employeePayrollObj._salary);
  setValue('#notes', employeePayrollObj._notes);
  let date = stringifyDate(employeePayrollObj._startDate).split(" ");
  setValue('#day',date[0]);
  setValue('#month',date[1]);
  setValue('#year',date[2]);
}

const setSelectedValues = (propertyValue, value) => {
  let allItems = document.querySelectorAll(propertyValue);
  allItems.forEach(item => {
      if(Array.isArray(value)){
        if(value.includes(item.value)){
          item.checked = true;
        }
      }
      else if (item.value === value)
        item.checked = true;
  });