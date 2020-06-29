var notes = [
["Do","C"],
["Do#","C#"],
["Re","D"],
["Mi-b","E-b"],
["Mi","E"],
["Fa","F"],
["Fa#","F#"],
["Sol","G"],
["Sol#","G#"],
["La","A"],
["Si-b","B-b"],
["Si","B"]
];

var baglamaDefaultValues = [9,7,2];     //  La,Sol,Re   //
var karaDuzenDefaultValues = [0,7,2];   //  Do,Sol,Re   //
// var baglamaDifferences =[10,5]
// var karaDuzenDifferences =[7,2]

var currentInstrumentDefaultValues = baglamaDefaultValues;
// var currentInstrumentDifferences = baglamaDifferences;
var DoremiAbc = 0; // 0 = Do,Re,Mi..., 1 = A,B,C...

loadNotes();
reset();

$("#topStrings").change(function(){
     var selectedValue = $(this).children("option:selected").val();
     var difference = selectedValue - currentInstrumentDefaultValues[0];
    calculate(difference)
});

$("#middleStrings").change(function(){
    var selectedValue = $(this).children("option:selected").val();
    var difference = selectedValue - currentInstrumentDefaultValues[1];
   calculate(difference)
});

$("#bottomStrings").change(function(){
    var selectedValue = $(this).children("option:selected").val();
    var difference = selectedValue - currentInstrumentDefaultValues[2];
   calculate(difference)
});

function loadNotes()
{
    $('#topStrings').empty()
    $('#middleStrings').empty()
    $('#bottomStrings').empty()

    for(var i = 0; i<notes.length;i++) 
    {
        // UpperStrings
        $('#topStrings').append($('<option></option>').val(i).html(notes[i][DoremiAbc]));

        // middleStrins
        $('#middleStrings').append($('<option></option>').val(i).html(notes[i][DoremiAbc]));

        // bottomStrings
        $('#bottomStrings').append($('<option></option>').val(i).html(notes[i][DoremiAbc]));
    }
}

function calculate(difference){

    // Set topStrings value
    var topStringsNewValue = getTheCorrectNote(currentInstrumentDefaultValues[0] + difference)
    $("#topStrings").val(topStringsNewValue);

    // Set middleStrings value
    var middleStringsNewValue = getTheCorrectNote(currentInstrumentDefaultValues[1] + difference)
    $("#middleStrings").val(middleStringsNewValue);

    // Set bottomStrings value 
    var bottomStringsNewValue =  getTheCorrectNote(currentInstrumentDefaultValues[2] + difference)
    $("#bottomStrings").val(bottomStringsNewValue);
}

function reset()
{
    // Default values
    $("#topStrings").val(currentInstrumentDefaultValues[0]);
    $("#middleStrings").val(currentInstrumentDefaultValues[1]);
    $("#bottomStrings").val(currentInstrumentDefaultValues[2]); 
}


// Retour au début si la valeur dépasse le max.
function getTheCorrectNote(value)
{
    if(value >= notes.length)
    {
        return value - notes.length;
    }
    else if (value < 0)
    {
        return value + notes.length;
    }

    return value;
}


//======================================================================================
// Gestion visuel des elements de la page
//======================================================================================

// Gestion des radio Instrument
$("input[name='Instrument']").click(function(){

    var allInstruments =  $("input[name='Instrument']");
    allInstruments.parent().removeClass('active');
    allInstruments.removeAttr('checked');

    var checkedInstrument =  $("input[name='Instrument']:checked");
    checkedInstrument.parent().addClass('active');
    checkedInstrument.attr("checked", "checked");

    if($("#Bglm").prop("checked")){
        currentInstrumentDefaultValues = baglamaDefaultValues;
        // currentInstrumentDifferences = baglamaDifferences;
    }
    else{
        currentInstrumentDefaultValues = karaDuzenDefaultValues;
        // currentInstrumentDifferences = karaDuzenDifferences;
    }
    
    loadNotes()
    reset();
});

// Gestion des radio "type de notes"
$("input[name='notesType']").click(function(){
    $("input[name='notesType']").parent().removeClass('active');
    $("input[name='notesType']").removeAttr('checked');
    $("input[name='notesType']:checked").parent().addClass('active');
    $("input[name='notesType']:checked").attr("checked", "checked");

    // alert($("#Doremi").prop("checked"))

    if($("#Doremi").prop("checked")){
        DoremiAbc = 0
    }
    else{
        DoremiAbc = 1
    }

    loadNotes()
    reset();
});

