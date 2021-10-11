class EmployeePayrollData {

    constructor(...params) {
        this.name = params[0];
        this.salary = params[1];
        this.gender = params[2];
        this.startDate = params[3];
        this.departments = params[4];
        this.notes = params[5];
    }

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
        if (new Date() < startDate) throw 'START DATE IS INCORECT';
        else this._startDate = startDate;
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
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const empDate = !this.startDate ? "not defined" :
            this.startDate.toLocaleDateString("en-US", options);
        return "name=" + this.name + ", salary=" + this.salary + ", gender=" + this.gender + ", start date=" + this.empDate + ", department=" + this.departments;
    }
}

try {
    let newEmployeePayrollData = new EmployeePayrollData(1, "Terissa", 30000, 'm', new Date('2022-01-01'));
    console.log("employeePayrollData: " + newEmployeePayrollData.toString());
} catch (e) {
    console.error(e);
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

    employeeArr.push(new EmployeePayrollData(name.value,salary.value,gender,date,departments,notes.value));

    console.log(employeeArr);
}