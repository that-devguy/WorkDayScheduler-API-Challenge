// Extends API to supply more format options
dayjs.extend(window.dayjs_plugin_advancedFormat)
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  let currentDayEl = $("#currentDay");
  let currentDate = dayjs().format("dddd, MMMM Do YYYY");
  let timeBlocks = $(".time-block");

  //Displays the current Date in the header of the page
  currentDayEl.text(currentDate);

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  //Sets the color of the time-block by checking compairing the current time to the id of the time-block
  function setColor() {
    let currentHour = dayjs().hour();
    timeBlocks.each(function () {
      let blockHour = parseInt($(this).attr("id"));
      if (blockHour < currentHour) {
        $(this).removeClass("future");
        $(this).removeClass("present");
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("future");
        $(this).removeClass("past");
        $(this).addClass("present");
      } else {
        $(this).removeClass("present");
        $(this).removeClass("past");
        $(this).addClass("future");
      }
    });
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  setColor();
});
