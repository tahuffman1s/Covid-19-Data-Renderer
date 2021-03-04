export function GetTodaysDate(): Date {
    var d = new Date()
    d.setDate(d.getDate())
    return d
}

export function SubtractDaysFromTodaysDate(sub: number): Date {
    var d = new Date()
    d.setDate(d.getDate() - sub)
    return d
}

export function AddDaysToTodaysDate(sub: number): Date {
    var d = new Date()
    d.setDate(d.getDate() + sub)
    return d
}

export function ToYYYYMMDD(date: Date, joiner: string, zeros: boolean): string {
    var month = '' + (date.getMonth() + 1)
    var day = '' + date.getDate()
    var year = '' + date.getFullYear()
    if (zeros == true) {
        if (month.length < 2) {
            month = '0' + month
        }
        if (day.length < 2) {
            day = '0' + day
        }
    }
    var returnstr = [year, month, day].join(joiner)
    return returnstr
}

export function ToMMDDYYYY(date: Date, joiner: string, zeros: boolean): string {
    var month = '' + (date.getMonth() + 1)
    var day = '' + date.getDate()
    var year = '' + date.getFullYear()
    if (zeros == true) {
        if (month.length < 2) {
            month = '0' + month
        }
        if (day.length < 2) {
            day = '0' + day
        }
    }
    var returnstr = [month, day, year].join(joiner)
    return returnstr
}

export function AddDayToDate(date: Date, num: number): Date {
    var d = date
    d.setDate(date.getDate() + num)
    return d
}

export function IncrimentalDateArray(Days: number, StartDate: Date): string[] {
    var ret: string[] = [];
    var d = StartDate;
    var counter = 0;
    while (counter != Days) {
        d = AddDayToDate(d, 1);
        ret.push(ToYYYYMMDD(d, '-', true))
        counter = counter + 1
    }
    return ret;
}

export function CalculateDifferenceBetweenDates(StartDate: Date, EndDate: Date): number {
    var difference = Math.abs(StartDate.getTime() - EndDate.getTime());
    var ret = Math.ceil(difference / (1000 * 3600 * 24))
    return ret
}