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

const instrumentsName = {
    BAGLAMA: 'baglama',
    KARADUZEN: 'karaduzen',
    GUITAR: 'guitar',
    VIOLIN: 'violin'
}

function Instrument(name,label,tuning){
    this.name = name;
    this.label = label;
    this.tuning = tuning;
    this.stringsCount = tuning.length;
}

var currentInstrument = baglama();

function baglama(){ 
    return new Instrument(instrumentsName.BAGLAMA,"Saz (Bağlama)",[9,7,2]);
}

function karaduzen(){ 
    return new Instrument(instrumentsName.KARADUZEN,"Saz (Kara düzen)",[0,7,2]);
}

function guitar(){ 
    return new Instrument(instrumentsName.GUITAR,"Gitar",[4,11,7,2,9,4]);
}

function violin(){ 
    return new Instrument(instrumentsName.VIOLIN,"Keman",[7,2,9,4]);
}



var DoremiAbc = 0; // 0 = Do,Re,Mi..., 1 = A,B,C...
loading();

// Click on a string [onChange]
function onChange(e)
{
    var selectedValue = parseInt(e.value,10);
    var stringNumber = parseInt(e.id.replace("string",''),10);
    var difference = selectedValue - currentInstrument.tuning[currentInstrument.stringsCount - stringNumber];
    calculate(difference)
}

function loading(){

    // Reset - ( Delete old strings )
    $('#strings').empty();

    //Update instument label
    $('#cardHeader').html(currentInstrument.label + " akordu");

    for(var i = currentInstrument.stringsCount; i>0;i--){

        var stringId ="string"+ i ;

        // Creating the string
        $('#strings').append($("<li class='list-group-item'>Tel "+ i +" : <select id='"+ stringId +"' class='btn btn-info dropdown-toggle' onchange='onChange(this);'></select></li>"));

        // Loading all notes on the string
        for(var k = 0; k<notes.length;k++) 
        {
            $('#'+stringId).append($('<option></option>').val(k).html(notes[k][DoremiAbc]));
        }        
    }

    calculate(0);
}

function calculate(difference){

    for(var i = currentInstrument.stringsCount; i>0;i--){
        var stringId ="string"+ i ;   

        // Set tring value
        var stringsNewValue =  getTheCorrectNote(currentInstrument.tuning[currentInstrument.stringsCount-i] + difference)
        $('#'+stringId).val(stringsNewValue);
    }
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
       currentInstrument = baglama();
    }
    else if($("#Krdzn").prop("checked")){
        currentInstrument = karaduzen();
    }
    else if($("#Guitar").prop("checked")){
        currentInstrument = guitar();
    }
    else if($("#Violin").prop("checked")){
        currentInstrument = violin();
    }
    
    loading();
});

// Gestion des radio "type de notes"
$("input[name='notesType']").click(function(){
    $("input[name='notesType']").parent().removeClass('active');
    $("input[name='notesType']").removeAttr('checked');
    $("input[name='notesType']:checked").parent().addClass('active');
    $("input[name='notesType']:checked").attr("checked", "checked");

    if($("#Doremi").prop("checked")){
        DoremiAbc = 0
    }
    else{
        DoremiAbc = 1
    }

    loading();
});

