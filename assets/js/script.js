var timeBlocks = $('.time-block')
var momentInstance = moment();
var currentDate = momentInstance.format('dddd, MMM Do YYYY');
var currentHour  = momentInstance.format('H');
console.log(currentDate, currentHour);

$(".saveBtn").on("click", function () {
    var timeBlockId = $(this).parent().attr("id");
    var textArea = $('#' + timeBlockId).find('textarea');
    var description = textArea.val();
    localStorage.setItem(currentHour, description);
})

$.each( timeBlocks, function( key, timeBlock ) {
    var hourCheck = parseInt(timeBlock.id.replace('hour', ''));
    var timeBlockId = timeBlock.id;
    var textArea = $('#' + timeBlockId).find('textarea');
    console.log($('#'+timeBlockId).find('textarea'));
    console.log(key, timeBlock.id, hourCheck, currentHour);
    textArea.val(localStorage.getItem(timeBlockId));
    if (currentHour == hourCheck) {
        $('#'+timeBlockId).addClass('present');
    } else if (currentHour > hourCheck) {        
        textArea.prop('readonly', true);
        $('#'+timeBlockId).addClass('past');
    } else {
        $('#'+timeBlockId).addClass('future').prop( "disabled", false );
    }
});