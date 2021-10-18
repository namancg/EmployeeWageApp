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
      checkName(name.value);
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
      checkStartDate(date);
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


const save = (event) => {
  event.preventDefault();
  event.stopPropagation();
  try{
    setEmployeePayrollObject();
    if(site_properties.use_local_storage.match("true")){
      createAndUpdateStorage();
      resetForm();
      window.location.replace(site_properties.home_page);
    }
    else {
      createOrUpdateEmployeePayroll();
    }
  }
  catch(e){
    console.log(e);
    return;
  }
}

const createOrUpdateEmployeePayroll = () => {
  let postUrl = site_properties.server_url;
  let methodCall = "POST";
  if(isUpdate) {
    methodCall = "PUT";
    postUrl = postUrl + employeePayrollObj.id.toString();
  }
  makeServiceCall(methodCall, postUrl, true, employeePayrollObj)
      .then(responceText => {
        resetForm();
        window.location.replace(site_properties.home_page);
      })
      .catch(error => {
        throw error;
      });
}

const setEmployeePayrollObject = () => {
  if(!isUpdate ) employeePayrollObj.id = createNewEmployeeId();
  employeePayrollObj._name = getInputValueById('#name');
  employeePayrollObj._profilePic = getSelectedValues('[name=profile]').pop();
  employeePayrollObj._gender = getSelectedValues('[name=gender]').pop();
  employeePayrollObj._departments = getSelectedValues('[name=department]');
  employeePayrollObj._salary =  getInputValueById('#salary');
  employeePayrollObj._notes = getInputValueById('#notes');
  let date = getInputValueById('#day')+ " "+ getInputValueById('#month')+" "+getInputValueById('#year');
  employeePayrollObj._startDate = date;
  console.log(employeePayrollObj);
}

const createAndUpdateStorage = () => {
  let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
  if(employeePayrollList){
    let empPayrollData = employeePayrollList.find(empData => empData.id == employeePayrollObj.id);
    if(!empPayrollData) {
      employeePayrollList.push(employeePayrollObj);
    }
    else {
      const index = employeePayrollList.map(empData => empData.id)
                                       .indexOf(empPayrollData.id);
      employeePayrollList.splice(index, 1, employeePayrollObj);
    }
  }
  else{
    employeePayrollList = [employeePayrollObj];
  }
  localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}


const createNewEmployeeId = () => {
  let empID = localStorage.getItem("EmployeeId");
  empID = !empID ? 1 : (parseInt(empID)+1).toString();
  localStorage.setItem("EmployeeId",empID);
  return empID;
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


const resetForm = () => {
  setValue('#name','');
  unsetSelectedValues('[name=profile]');
  unsetSelectedValues('[name=gender]');
  unsetSelectedValues('[name=department]');
  setValue('#salary','');
  setValue('#notes','');
  setValue('#day','1');
  setValue('#month','January');
  setValue('#year','2021');
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

const checkForUpdate = () => {
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
}