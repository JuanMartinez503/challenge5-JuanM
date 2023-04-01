// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  var currentHour = dayjs().format("H");
  var currentDay = dayjs().format("dddd, MMMM D");

  function init() {
    $(".time-block").each(function () {
      var timeBlockIds = $(this).attr("id");
      var storedInput = localStorage.getItem(timeBlockIds);
      if (storedInput !== null) {
        $(this).find(".description").val(storedInput);
      }
    });
  }

  $(".saveBtn").on("click", function () {
    // get the user input for this time-block
    var userInput = $(this).siblings(".description").val();
    console.log(userInput);
    // get the id of the time-block containing this button
    var timeBlockId = $(this).closest(".time-block").attr("id");
    // save the user input in local storage using the time-block id as the key
    localStorage.setItem(timeBlockId, userInput);
  });

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  console.log(currentHour);

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

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
  $("#currentDay").text(currentDay);
  console.log(currentDay);
  init();
  setInterval(checkHour, 1000);
  //checks for the current time and updates it inside an interval
});
