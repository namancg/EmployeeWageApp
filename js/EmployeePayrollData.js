class EmployeePayrollData {
    //getter and setter
    get id() { return this._id;}
    set id(id) {
        this._id = id;
    }
    get name() { return this._name; }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$');
        if(nameRegex.test(name))
            this._name = name;
        else throw 'Name is Incorrect';
    }
    get profilePic() { return this._profilePic; }
    set profilePic(profilePic) {
        this._profilePic = profilePic;
    }
    get salary() { return this._salary; }
    set salary(salary) {
        this._salary = salary;
    }
    get gender() { return this._gender; }
    set gender(gender) {
        this._gender = gender;
    }
    get startDate() { return this._startDate; }
    set startDate(startDate) {
        let thirtyDaysInMiliSec = 30*24*60*60*1000;
        if(startDate <= new Date() &&  Date.now()-startDate < thirtyDaysInMiliSec)
            this._startDate = startDate; 
        else throw 'startDate is Incorrect';
    }
    get departments() { return this._departments}
    set departments(departments){
        this._departments = departments;
    }
    get notes() { return this._notes}
    set notes(notes) {
        this._notes = notes;
    }

    toString() {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const empDate = this.startDate === undefined ? "undefined" : this.startDate.toLocaleDateString("en-US", options);
        return "name="+ this.name +", salary="+ this.salary+", gender="+ this.gender+", start date="+ empDate+", department="+this.departments+", notes="+this.notes;
    }
}