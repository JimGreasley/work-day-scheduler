
    $(document).ready(function () {

        // set current day within jumbotron
        $("#currentDay").text(moment().format("dddd, MMMM Do"));
  
        // capture the current hour (0 - 23)
        var currentHour = moment().format("HH");
        
        //var cHtype      = typeof currentHour;
        //console.log(currentHour, cHtype);
  
        // for testing, override currentHourNum
        //var currentHourNum = 12;
        var currentHourNum = parseInt(currentHour);
        
  
        // get Work Day Schedule data from local storage
  
        var data        = localStorage.getItem("WorkDaySchedule");
  
        if (!data) {
            // create new 'empty' Work Day Schedule array
            var work_day_schedule = ["", "", "", "", "", "", "", "", ""];
  /*          var work_day_schedule = [
              "office hours and check in to class on bootcamp spot",
              "intense learning activity",
              "30 minute break for lunch at 11:30",
              "class resumes",
              "drink from firehose",
              "office hours starting at 2:30",
              "head home",
              "homework",
              "more homework"];
  */
        } else {
            var work_day_schedule = JSON.parse(data);
        }
  
        //console.log(work_day_schedule);
  
        // capture parent node for schedule data
        var $container = $(".container");
  
        // create time slot row for each entry in Work Day Schedule array
        work_day_schedule.forEach(createRow);
  
  
        // set Event to save text when corresponding save button is clicked
        $(".saveBtn").click(saveText);
  
  
        //-----------------------------------------------------------------------------------------
        //  function to create a row for a given timeslot
        //-----------------------------------------------------------------------------------------
  
        function createRow(rowText, index) {
  
          var elementHour   = index + 9;
          var elementHourPM = 0;
  
          var newRow = $("<div>").addClass("row time-block");
  
          // create the columns to hold the timeslot hour, text and save button
  
          var colHour = $("<div>").addClass("col-1 hour");
  
          if (elementHour > 12) {
             elementHourPM = elementHour - 12;
             colHour.text(elementHourPM + " PM");
          } else if (elementHour < 12) {
             colHour.text(elementHour + " AM");
          } else {
             colHour.text(elementHour + " Noon");
          }
          
          // create textarea element and set its value to the text ("rowText") passed in
  
          var colText = $("<textarea>").addClass("col-10 textarea");
          colText.val(rowText);
          
          // add class to textarea to indicate whether this timeslot is in the past, present or
          // future compared to the current hour
          if (elementHour < currentHourNum) {
            colText.addClass("past");
            console.log("past");
          } 
          else if (elementHour > currentHourNum) {
            colText.addClass("future");
            console.log("future");
          } 
          else {
            colText.addClass("present");
            console.log("present");
          }
          
          // create button element and set its value to the text ("rowText") passed in
          var colBtn = $("<button>").addClass("col-1 saveBtn");
          colBtn.text("Save text");
  
          // include 'index' as attr in button element
          colBtn.attr("data-index", index); 
  
  
          // Append the column elements to the new timeslot row
          newRow.append(colHour, colText, colBtn);
  
          // Append the new timeslot row to the page (Container element)
          $container.append(newRow);
        }
  
  
        //-----------------------------------------------------------------------------------------
        //  function to capture updated text when its corresponding save button is clicked
        //-----------------------------------------------------------------------------------------
  
        function saveText(e) {
          event.preventDefault();  
  
          //console.log($(this).siblings(".textarea").val());
          //console.log($(this).attr("data-index"));
  
          // capture index (typeof 'string') into work-day-schedule array 
          var idx = $(this).attr("data-index");
          //console.log(typeof idx);
  
          // save updated text in work_day_schedule array
          work_day_schedule[parseInt(idx)] = $(this).siblings(".textarea").val();
  
          // Save updated work_day_schedule array in local storage
          localStorage.setItem("WorkDaySchedule", JSON.stringify(work_day_schedule));
              
        }
  
      });
      