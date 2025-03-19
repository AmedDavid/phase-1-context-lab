/* Your Code Here */

// Create an employee record from an array
function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(employeeData => createEmployeeRecord(employeeData));

}

function createTimeInEvent(dateStamp) {
    if (!dateStamp || typeof dateStamp !== 'string') {
        return this;
    }
    
    const [date, hour] = dateStamp.split(' ');
    if (!date || !hour) {
        return this;
    }
    
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });
    return this;
}


function createTimeOutEvent(dateStamp) {
    if (!dateStamp || typeof dateStamp !== 'string') {
        return this;
    }
    
    const [date, hour] = dateStamp.split(' ');
    if (!date || !hour) {
        return this;
    }
    
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    return this;
}


function hoursWorkedOnDate(date) {
    const timeIn = this.timeInEvents.find(event => event.date === date);
    const timeOut = this.timeOutEvents.find(event => event.date === date);
    
    if (!timeIn || !timeOut || !timeIn.hour || !timeOut.hour) {
        return 0;
    }
    
    return (timeOut.hour - timeIn.hour) / 100;
}

// wages earned
function wagesEarnedOnDate(date) {
    const hours = hoursWorkedOnDate.call(this, date);
    return hours * this.payPerHour;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable;
};


function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
}

// Calculate total payroll for all employees
function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
        return total + allWagesFor.call(employee);
    }, 0);
}