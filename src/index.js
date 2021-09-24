//Link to codefortulsa api that only includes park data for parks with restrooms, drinking fountains, and playgrounds
//API is set to 20 rows, but only has 12 parks that meet the criteria
const BASE_URL = "https://codefortulsa.opendatasoft.com/api/records/1.0/search/?dataset=parks-and-recreation-areas&q=&rows=20&facet=operdays&facet=operhours&facet=restroom&facet=adacomply&facet=camping&facet=swimming&facet=swimmingjr&facet=waterplayg&facet=splashpad&facet=hiking&facet=fishing&facet=picnic&facet=boating&facet=hunting&facet=roadcycle&facet=mtbcycle&facet=playground&facet=golf&facet=ski&facet=soccer&facet=baseball&facet=basketball&facet=basketba_1&facet=tennis&facet=tennislit&facet=dogpark&facet=discgolf&facet=drinkingfo&facet=outdoorfit&facet=reccenter&refine.playground=Yes&refine.restroom=Yes&refine.drinkingfo=Yes";

const parkCardsContainer = document.querySelector('#middle-container');
const deleteParkNote = document.getElementsByClassName('delete-note-button');


function init(){
    //returned an HTML collection - used spread operator saved to a variable
    const buttons = [...document.getElementsByClassName('feature-button')];

    buttons.forEach(e => e.addEventListener('click', () => {getParks(e.id)}));
}

//Working API!! - should it be in global tho? ;/
/* function getParks(){
    fetch(BASE_URL)
    .then(resp => resp.json())
    .then(json => currentParkArray = json.records);  
} */

function getParks(sportIdOrKeyName){
    //debugger;
    parkCardsContainer.innerHTML = ''
    fetch(BASE_URL + `&refine.${sportIdOrKeyName}=Yes`)
    .then(resp => resp.json())
    .then(json => json.records.forEach(renderParkCards))
    //.then(renderParkCards);
}

//display parkCards in middle div
//!!!WORKING - CAN USE INIT --> CLICK A FEATURE BUTTON --> WILL RETURN THOSE PARKS
function renderParkCards(parksWithFeature){
    //debugger;
    document.querySelector('#middle-div-heading').textContent = 'All parks have restrooms, drinking fountains, and a playground';
    
    ///*****************CREATE********************* */
    //Card display elements to feature API info
    ///create park card, heading, and summary of the features, create form with input field and submit button
    const parkCard = document.createElement('span');
    parkCard.className = "park-card"
    const cardHeading = document.createElement('h2');
    const cardSummary = document.createElement('p');
    //input form to post to db.json??
    const noteForm = document.createElement('form');
    //notesForm.setAttribute('method', 'POST');
    //notesForm.setAttribute('action', ######)
    const noteInput = document.createElement('input');
    const noteSubmit = document.createElement('input');
    

    //*****************FILL********************* */
    //Is there a way to return all of these variable values in lower case without calling .toLowerCase below??
    const {name, baseball, basketball, operdays, operhours, discgolf, fulladdr, soccer, waterplayg, tennislit} = parksWithFeature.fields;

    cardHeading.textContent = name.toLowerCase();
    cardSummary.innerHTML = 
    `
    days of operations: ${operdays.toLowerCase()}<br>
    hours open: ${operhours.toLowerCase()}<br>
    address: ${fulladdr.toLowerCase()}<br>
    features: <br>
    baseball: ${baseball.toLowerCase()}<br>
    basketball: ${basketball.toLowerCase()}<br>
    disc golf: ${discgolf.toLowerCase()}<br>
    soccer: ${soccer.toLowerCase()}<br>
    splash pad: ${waterplayg.toLowerCase()}<br>
    tennis: ${tennislit.toLowerCase()}<br>
    `
    //Build note form
    noteInput.setAttribute('type', 'text');
    noteInput.setAttribute('id', `${name}-note-input`);
    noteInput.setAttribute('placeholder', 'add a note');
    
    //submit button
    noteSubmit.setAttribute('type', 'submit');
    noteSubmit.setAttribute('value', 'Submit');

    //*****************APPEND********************* */
    parkCard.append(cardHeading, cardSummary, noteForm);  
    parkCardsContainer.append(parkCard);
    noteForm.append(noteInput, noteSubmit);

    noteSubmit.addEventListener('click', function(e){
        handleNoteInput(noteForm, name);
        e.preventDefault();});
    

}

function handleNoteInput(note, name){
    debugger;
    const noteInput = document.getElementById(`${name}-note-input`);
    const parkName = name.toLowerCase();
    renderParkNote(noteInput.value, parkName);
    note.reset();
    //WHY IS THE PAGE REFRESHING?? -- moved the event prevent default to the callback function!
}

function renderParkNote(note, park){
    debugger;
    const bottomContainer = document.querySelector('#bottom-container');
    const parkNoteDiv = document.createElement('span');
    parkNoteDiv.id = 'park-note-div'
    const parkNote = document.createElement('p');
    parkNote.id = 'park-note';
    const deleteParkNote = document.createElement('button');
    deleteParkNote.className = 'delete-note-button';

    console.log(note)

    parkNote.textContent = `notes for ${park}: ${note} `;
    deleteParkNote.textContent = 'x';
    parkNote.appendChild(deleteParkNote);
    bottomContainer.appendChild(parkNote);

    ////WWWWWWWWWWWHHHHHHHHHHHHHHHYYYYYYYYYYYY THE EVENT LISTENER NEEDS TO GO SOMEWHERE???
    deleteParkNote.addEventListener('click', handleDelete);
}

function handleDelete(e){
    debugger;
    e.target.parentNode.remove();
}

init();