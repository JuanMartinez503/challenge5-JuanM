
$(function () {
  
  var currentHour = dayjs().format("H");
  //this variable is used to get the current hour of the day
  var currentDay = dayjs().format("dddd, MMMM D");

  function init() {
    $(".time-block").each(function () {
      var timeBlockIds = $(this).attr("id");
      var storedInput = localStorage.getItem(timeBlockIds);
      //this if statement checks if the time block has been saved in local storage, if it has, it will use the stored input to populate the time blocks
      if (storedInput !== null) {
        $(this).find(".description").val(storedInput);
      }
    });
  }
//this adds a listener to the save button
  $(".saveBtn").on("click", function () {
    // get the user input for this time-block
    var userInput = $(this).siblings(".description").val();
    console.log(userInput);
    // get the id of the time-block containing this button
    var timeBlockId = $(this).parent(".time-block").attr("id");
    // save the user input in local storage using the time-block id as the key
    localStorage.setItem(timeBlockId, userInput);
  });


  console.log(currentHour);
//this checks to see to see what hour it currently is and adds the class specified below
  function checkHour() {
    $(".time-block").each(function () {
      var blockHour = $(this).data("time");
      console.log(blockHour);
      // Compare the time block hour to the current hour and add CSS class
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour == currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }

  $("#currentDay").text(currentDay);
  console.log(currentDay);
  init();
  //the init function is called when the page loads and checks to see if there is any input saved in local storage
  setInterval(checkHour, 1000);
  //checks for the current time and updates it inside an interval
});
