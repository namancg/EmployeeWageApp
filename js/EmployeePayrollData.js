let employeeArr = [];
let flag = true;
class EmployeePayrollData {
    get name() { return this._name; }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-z]{2,}$')
        if (nameRegex.test(name)) this._name = name;
        else throw 'NAME IS INCORECT';
    }

    get salary() { return this._salary; }
    set salary(salary) {
        let salaryRegex = RegExp('^[0-9.]+$')
        if (salaryRegex.test(salary)) this._salary = salary;
        else
            throw 'SALARY IS INCORECT';
    }

    get gender() { return this._gender; }
    set gender(gender) {
        let genderRegex = RegExp('^[MFmf]{1}$')
        if (genderRegex.test(gender)) this._gender = gender;
        else
            throw 'GENDER IS INCORECT';
    }

    get startDate() { return this._startDate; }
    set startDate(startDate) {
        let thirtyDaysInMiliSec = 30*24*60*60*1000;
        if(startDate <= new Date() &&  Date.now()-startDate < thirtyDaysInMiliSec)
            this._startDate = startDate; 
        else{
            flag = false;
            alert('Invalid date');
        }
    }
    get departments() { return this._departments }
    set departments(departments) {
        this._departments = departments;
    }
    get notes() { return notes }
    set notes(notes) {
        this._notes = notes;
    }


    toString() {
        return "id="+ this.id +", name="+ this.name +", salary="+ this.salary+", gender="+ this.gender+", start date="+ this.startDate+", department="+this.departments;
    }
}


function save(){
    const name = document.querySelector("#name");   
    let departments = new Array();
    let markedCheckbox = document.getElementsByName('department');  
    for (var checkbox of markedCheckbox) {  
      if (checkbox.checked)  
        departments.push(checkbox.value);  
    } 
    let markedRadioButton = document.getElementsByName('gender');
    let gender;
    for (var radiobutton of markedRadioButton) {  
        if (radiobutton.checked)  
          gender = radiobutton.value;  
    }
    const salary = document.querySelector('#salary');
    const day = document.querySelector('#day');
    const month = document.querySelector('#month');
    const year = document.querySelector('#year');
    const date = new Date(day.value+"/"+month.value+"/"+year.value);
    const notes = document.querySelector('#notes'); 
    let empObject = new EmployeePayrollData();
    flag = true;
    empObject.name = name.value;
    empObject.salary = salary.value;
    empObject.gender = gender;
    empObject.startDate = date;
    empObject.departments = departments;
    empObject.notes = notes.value;
    if(flag) {
        employeeArr.push(empObject);
        alert('Successfully added employee');
    } 

    console.log(employeeArr);
}
