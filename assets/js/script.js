// Creating variables of HTML elements this in order to manipulate and or get the elements info
var currentDay = $('#currentDay');
var timeBlocks = $('.time-block');
// Create the moment instance so I can start manipulate the formart 
var momentInstance = moment();
// Set the format to display on the info
var currentDate = momentInstance.format('dddd, MMM Do YYYY');
// To get the current Hour 
var currentHour = momentInstance.format('H');
// Set a new variable that I will use in order to have multiple information storage for day
var saveFormatDate = momentInstance.format('YYYYMMDD');
// Set the current date format on the HTML
currentDay.html(currentDate);


//The function of the button that will save the information of the description and I can check if the hour already is on the past,present or future 
$(".saveBtn").on("click", function () {
    // I get the id of the element
    var timeBlockId = $(this).parent().attr("id");
    // I search the textarea and I saved as variable 
    var textArea = $('#' + timeBlockId).find('textarea');
    // Get the information that was wrote on the textarea
    var description = textArea.val();
    //Save the information on the localStorage what I do is to create an unique ID so if you are on another day you can set new items and if you can check previous days the information can stay there
    localStorage.setItem(saveFormatDate+timeBlockId, description);
})
//With this I do an iteracion to check the elements I have
$.each(timeBlocks, function (key, timeBlock) {
    // Here I check what hour and I will use that to compare with the current hour
    var hourCheck = parseInt(timeBlock.id.replace('hour', ''));
    // Get the id of the time block elemnt
    var timeBlockId = timeBlock.id;
    // Get the element of textarea so I can manipulate that later
    var textArea = $('#' + timeBlockId).find('textarea');
    // Here I check if the hour slot have information on the localstorage
    textArea.val(localStorage.getItem(saveFormatDate + timeBlockId));
    // Here I check if is present, past or future , the HTML dont have any class of this so I dont need to remove it and when the page reload it will past here and add the correct class 
    if (currentHour == hourCheck) {
        $('#'+timeBlockId).addClass('present');
    } else if (currentHour > hourCheck) {
        // If is on the past I set the textarea to be readonly
        textArea.prop('readonly', true);
        $('#'+timeBlockId).addClass('past');
    } else {
        $('#'+timeBlockId).addClass('future').prop( "disabled", false );
    }
});