const IS_PART_TIME = 1;
const IS_FULL_TIME = 2;
const PART_TIME_HOUR = 4;
const FULL_TIME_HOUR = 8;
const WAGE_PER_HOUR = 20;
const NUM_OF_WORKING_DAYS = 20;
const MAX_HRS_IN_MONTH = 160;

{
    const IS_ABSENT = 0;
    let empCheck = Math.floor(Math.random() * 10) % 2
    if(empCheck == IS_ABSENT) {
        console.log('Employee is Absent');
    }
    else
        console.log('Employee is Present');
}

function getWorkingHours(empCheck) {
    switch (empCheck) {
        case IS_PART_TIME:
           return PART_TIME_HOUR;
            break;
        case IS_FULL_TIME:  
            return FULL_TIME_HOUR;
            break;
        default:
            return 0;
    }
}


function calculateWage(empHrs) {
    return WAGE_PER_HOUR * empHrs;
}
let totalEmpHrs = 0;
let totalWorkingDays = 0;
let empDailyWageArr = new Array();
let employeeDailyWageMap = new Map();
let empDailyHrsMap = new Map();
let empDailyHrsAndWageArray = new Array();

while (totalEmpHrs <= MAX_HRS_IN_MONTH && totalWorkingDays < NUM_OF_WORKING_DAYS) {
    totalWorkingDays ++;
    let empCheck = Math.floor(Math.random() * 10) % 3;
    let empHrs = getWorkingHours(empCheck);
    totalEmpHrs += empHrs;
    empDailyWageArr.push(calculateWage(empHrs))
    employeeDailyWageMap.set(totalWorkingDays,calculateWage(empHrs))
    empDailyHrsAndWageArray.push({
        dayNum: totalWorkingDays,
        dailyHours: empHrs,
        dailyWage: calculateWage(empHrs),
        toString() {
            return '\nDay: '+this.dayNum+' => Working Hours: '+this.dailyHours +
                    ' And daily wage: '+this.dailyWage;
        }
    })
}
let EmpWage =calculateWage(totalEmpHrs);
console.log("EMPLOYEE HOURS IS : "+totalEmpHrs+" hr\nAND TOTAL WORKING DAYS : " + totalWorkingDays + "\nAND EMPLOYEE WAGE IS : " + EmpWage);
let totalEmpWage = 0;

//MAP
function totalWages(totalWage,dailyWage)
{
    return totalWage+dailyWage
}
console.log("Employee wage map totalHours: "+Array.from(employeeDailyWageMap.values()).reduce(totalWages,0))


function sum(dailyWage) {
    return totalEmpWage += dailyWage; 
}
empDailyWageArr.forEach(sum);
console.log("\nCALCULATING TOTAL WAGE BY FOREACH METHOD : ")
console.log("EMPLOYEE HOURS IS : "+totalEmpHrs+" hr\nAND TOTAL WORKING DAYS : " + totalWorkingDays + "\nAND EMPLOYEE WAGE IS : " + totalEmpWage);


function totalWages(totalWage, dailyWage) {
    return totalWage + dailyWage;
}
console.log("TOTAL EMPLLOYEE WAGE(REDUCE METHOD): " + empDailyWageArr.reduce(totalWages, 0) );
let dailyCounter = 0;


function mapDayWithWage(dailyWage) {
    dailyCounter ++;
    return "Day-" + dailyCounter + "-Wage is = "+ dailyWage;
}
let mapDayWithWageArr = empDailyWageArr.map(mapDayWithWage);
console.log("DAILY WAGE MAP :");
console.log(mapDayWithWageArr);

function fulltimeWage(dailyWage) {
    return dailyWage.includes("160");
}
let fulltimeArr = mapDayWithWageArr.filter(fulltimeWage);
console.log("DAILY WAGE WHEN FULL TIME WAS EARNED");
console.log(fulltimeArr);
console.log("FIRST FULL TIME WAGE WAS EARNED: ");
console.log(mapDayWithWageArr.find(fulltimeWage));

function isAllFulltimeWage(dailyWage) {
    return dailyWage.includes("160");
}
console.log("CHECKING ALL FULL TIME WAGE ELEMENTS:-")
console.log(fulltimeArr.every(isAllFulltimeWage));


function isAnyPartTimeWage(dailyWage) {
    return dailyWage.includes("80");
}
console.log("CEHCKING IF ANY PART TIME WAGE :");
console.log(mapDayWithWageArr.some(isAnyPartTimeWage));


function totalDaysworked(numOfDays, dailyWage) {
    if (dailyWage>0) return numOfDays+1;
    return numOfDays;
}
console.log("NUMBER OF DAYS THE EMPLOYEE WORKED:")
console.log(empDailyWageArr.reduce(totalDaysworked, 0));


const findTotal = (totalVal, dailyVal) => {
    return totalVal + dailyVal;
}

let totalHours = Array.from(empDailyHrsMap.values())
                .filter(empHrs => empHrs > 0)
                .reduce(findTotal, 0);
let totalSalary = empDailyWageArr
                .filter(dailyWage => dailyWage > 0)
                .reduce(findTotal, 0);

console.log(`TOTAL HOURS: ${totalHours}, TOTAL SALARY: ${totalSalary}`);

let nonWorkingDays = new Array();
let partWorkingDays = new Array();
let fullWorkingDays = new Array();

empDailyHrsMap.forEach((value, key, map) => {
    if(value==4) partWorkingDays.push(key);
    else if(value==8) fullWorkingDays.push(key);
    else nonWorkingDays.push(key);
});

console.log("Full working days: "+ fullWorkingDays);
console.log("Part working days: "+ partWorkingDays);
console.log("Non working days: "+ nonWorkingDays);

console.log("Showing daily hours and wage: "+empDailyHrsAndWageArray);

totalSalary = empDailyHrsAndWageArray
                .filter(empDailyHrsAndWage => empDailyHrsAndWage.dailyWage > 0) 
                .reduce((totalWage, dailyHrsAndWage) => totalWage+= dailyHrsAndWage.dailyWage, 0);

totalHours = empDailyHrsAndWageArray
                .filter(empDailyHrsAndWage => empDailyHrsAndWage.dailyHours > 0) 
                .reduce((totalHours, dailyHrsAndWage) => totalHours+= dailyHrsAndWage.dailyHours, 0);

console.log(`Total Hours: ${totalHours}, total Salary: ${totalSalary}`);

console.log("Logging full working days: ");
empDailyHrsAndWageArray.filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours == 8)
                       .forEach(dailyHrsAndWage => process.stdout.write(dailyHrsAndWage.toString()));

partWorkingDays = empDailyHrsAndWageArray
                  .filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours == 4)
                  .map(dailyHrsAndWage => dailyHrsAndWage.toString());

console.log("\nPart Working days string "+partWorkingDays);

nonWorkingDays = empDailyHrsAndWageArray
                  .filter(dailyHrsAndWage => dailyHrsAndWage.dailyHours == 0)
                  .map(dailyHrsAndWage => dailyHrsAndWage.dayNum);

console.log("Non Working days string "+nonWorkingDays);