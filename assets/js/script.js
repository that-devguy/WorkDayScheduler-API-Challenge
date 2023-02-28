// Extends API to supply more format options
dayjs.extend(window.dayjs_plugin_advancedFormat)

$(function () {
  let currentDayEl = $("#currentDay");
  //Uses dayjs advanced format to provide the correct date
  let currentDate = dayjs().format("dddd, MMMM Do YYYY");
  let timeBlocks = $(".time-block");

  //Displays the current Date in the header of the page
  currentDayEl.text(currentDate);

  //Gets the id of the parent div and the value of the sibling textarea to save the value of the textarea to the current block 
  $(".saveBtn").on("click", function () {
    let currentBlock = $(this).parent().attr("id");
    let eventText = $(this).siblings("textarea").val();
    localStorage.setItem(currentBlock, eventText);
    $(this).siblings(".deleteBtn").css("visibility", "visible");
  });

  //Deletes the value of the textarea from the current block
  $(".deleteBtn").on("click", function() {
    let currentBlock = $(this).parent().attr("id");
    localStorage.removeItem(currentBlock);
    $(this).siblings("textarea").val("");
    $(this).css("visibility", "hidden");
  });


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

  //Loads the textarea values for each timeBlockEl from local storage 
  function loadEvents() {
    $(".time-block").each(function () {
      let currentBlock = $(this).attr("id");
      let eventText = localStorage.getItem(currentBlock);
      $(this).find("textarea").val(eventText);
      //changes visibility of the delete button when there is data in the textarea
      if (eventText) {
        $(this).find("textarea").val(eventText);
        $(this).find(".deleteBtn").css("visibility", "visible");
      } else {
        $(this).find(".deleteBtn").css("visibility", "hidden");
      }
    });
  }

  setColor();
  loadEvents();
});
