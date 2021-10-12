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
  });
  
  
  const save = () => {
    try{
      let employeePayrollData = createEmployeePayroll();
      
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