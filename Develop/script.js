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
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

  // apply the past, present, or future class to each time block by comparing the id to the current hour
  // get current time in 24 hour format usin day.js
  const currentTime = parseInt(dayjs().format("H"));

  $("#hour-" + currentTime).addClass("present");

  for (let i = 7; i < currentTime; i++) {
    $("#hour-" + i).addClass("past");
  }
  
  for (let i = currentTime + 1; i <= 17; i++) {
    $("#hour-" + i).addClass("future");
  }


  // display the current date in the header of the page; format sample: Monday, September 13th
  const currentDay = parseInt(dayjs().format("D")) % 10;
  const ordinal = currentDay === 1 ? "st" : currentDay === 2 ? "nd" : currentDay === 3 ? "rd" : "th";
  $("#currentDay").text(dayjs().format("dddd, MMMM D") + ordinal);

  // listener for click events on the save button
  $(".saveBtn").on("click", function () {
    // get the id of the time block containing the button that was clicked
    const id = $(this).parent().attr("id");
    // get the text area value
    const value = $(this).siblings(".description").val();
    // save the text area value in local storage
    localStorage.setItem(id, value);
    // make status message visible
    $("#status").css("visibility", "visible");
    // clear status message after 5 seconds
    setTimeout(function () {
      $("#status").css("visibility", "hidden");
    }, 5000);
  });

  // get any user input that was saved in localStorage and set the values of the corresponding textarea elements
  for (let i = 7; i <= 17; i++) {
    $("#hour-" + i + " .description").val(localStorage.getItem("hour-" + i));
  }

  $("#status").css("visibility", "hidden");
});
