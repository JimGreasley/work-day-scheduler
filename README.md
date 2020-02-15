# work-day-scheduler


## Algorithm

The page starts by getting the current day using Momentjs.
It also gets the current hour in 24-hr format (0 - 23).

The current WorkDaySchedule, in JSON format, is retrieved from local storage.
If no data is returned then an empty work-day-schedule array is created.

The data in the work-day-schedule array is used to create the current day's activities - from 9 AM to 5 PM.
As each hourly timeslot is dynamically loaded to the page, it is color coded (using special CSS class selectors)to visually designate which timeslots are in the past, in the future, or the current one.

Text may be updated in any of the timeslots and saved by clicking its corresponding save button.

All updated text is stored, in JSON format, in local storage.

Refresing the page will re-display the current day's scheduled activities.


## Link
https://jimgreasley.github.io/work-day-scheduler/

