$(function () {
  // Current day using dayjs:
  var today = dayjs();
  var currentDay = dayjs(today).format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDay);

  // Block colours for each hour:
  function hourColour () {
    // Current time using dayjs: 
    var time = dayjs();
    var currentTime = dayjs(time).format("HH");

    var timeBlock = $(".time-block");
    timeBlock.each(function () {
      // "this" will target the ".time-block" element, and it will parse and return the integer from the "hour-x" id
      var hourBlock = parseInt($(this).attr("id").split("hour-")[1]);
  
      // If current time is less than the hour block, it will have the future class
      if (currentTime < hourBlock) {
        $(this).addClass("future");
      // Else if current time is greater than the hour block, it will have the past class
      } else if (currentTime > hourBlock) { 
        $(this).addClass("past"); 
      // Else if current time is equal to the hour block, it will have the present class
      } else { 
        $(this).addClass("present");
      }
    });
  }

  // Retrieves and loads up the text in the specific hour block from the local storage
  function loadText() {
    var hour = ["9", "10", "11", "12", "13", "14", "15", "16", "17"];
    for (i = 0; i <= hour.length; i++) {
      // 
      var storedText = localStorage.getItem("hour-" + hour);
      $("#hour-" + hour + " .description").val(storedText);
    }
  }

hourColour();
loadText();

  // When the save button is clicked, it will store the text in local storage
  var saveBtnEl = $(".saveBtn");
  saveBtnEl.on("click", function () {
    // Textarea and button are siblings, so you want to target the sibling with ".description" class
    var text = $(this).siblings(".description").val();
    var hour = $(this).parent().attr("id");
    localStorage.setItem(hour, text);
  
  });
});