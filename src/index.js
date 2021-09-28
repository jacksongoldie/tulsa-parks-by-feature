//Link to codefortulsa api that only includes park data for parks with restrooms, drinking fountains, and playgrounds
//API is set to 20 rows, but only has 12 parks that meet the criteria
const BASE_URL = "https://codefortulsa.opendatasoft.com/api/records/1.0/search/?dataset=parks-and-recreation-areas&q=&rows=20&facet=operdays&facet=operhours&facet=restroom&facet=adacomply&facet=camping&facet=swimming&facet=swimmingjr&facet=waterplayg&facet=splashpad&facet=hiking&facet=fishing&facet=picnic&facet=boating&facet=hunting&facet=roadcycle&facet=mtbcycle&facet=playground&facet=golf&facet=ski&facet=soccer&facet=baseball&facet=basketball&facet=basketba_1&facet=tennis&facet=tennislit&facet=dogpark&facet=discgolf&facet=drinkingfo&facet=outdoorfit&facet=reccenter&refine.playground=Yes&refine.restroom=Yes&refine.drinkingfo=Yes";
const LOCAL_DB_URL = "http://localhost:3000/comments/";

const parkCardsContainer = document.querySelector('#middle-container');
const deleteParkNote = document.getElementsByClassName('delete-note-button');


function init(){
    //returned an HTML collection - used spread operator saved to a variable
    const buttons = [...document.getElementsByClassName('feature-button')];

    //FETCH DB.JSON to display any current comments 
    fetch(LOCAL_DB_URL)
    .then(resp => resp.json())
    .then(json => json.forEach(function (e){renderParkNote(e["note"], e["park"], e['id'])}));

    //
    buttons.forEach(e => e.addEventListener('click', () => {getParks(e.id)}));
}

function getParks(sportIdOrKeyName){
    parkCardsContainer.innerHTML = ''
    fetch(BASE_URL + `&refine.${sportIdOrKeyName}=Yes`)
    .then(resp => resp.json())
    .then(json => json.records.forEach(renderParkCards))
    
}

//display parkCards in middle div
function renderParkCards(parksWithFeature){
    //debugger;
    document.querySelector('#middle-div-heading').textContent = 'All parks have restrooms, drinking fountains, and a playground';
    
    ///*****************CREATE********************* */
    //Card display elements to feature API info
    ///create park card, heading, and summary of the features, create form with input field and submit button
    const parkCard = document.createElement('span');
    parkCard.className = "park-card";
    const cardHeading = document.createElement('h2');
    const cardSummary = document.createElement('p');

    //input form
    const noteForm = document.createElement('form');
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
    address: ${fulladdr.toLowerCase()}<br><br>
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
    noteInput.setAttribute('placeholder', 'add a comment');
    
    //submit button
    noteSubmit.setAttribute('type', 'submit');
    noteSubmit.setAttribute('value', 'Submit');

    //*****************APPEND**********************/
    parkCard.append(cardHeading, cardSummary, noteForm);  
    parkCardsContainer.append(parkCard);
    noteForm.append(noteInput, noteSubmit);

    noteSubmit.addEventListener('click', function(e){
        handleNoteInput(noteForm, name);
        e.preventDefault();});
    

}

function handleNoteInput(note, park){
    const noteInput = document.getElementById(`${park}-note-input`);
    const parkName = park.toLowerCase();
    renderParkNote(noteInput.value, parkName);
    
    const pojoPark = {
        note: noteInput.value,
        park: parkName
    }
    
    //post request
    fetch(LOCAL_DB_URL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pojoPark)
        });

    note.reset();
    //moved the event prevent default to the callback function to keep page from refreshing
}

function renderParkNote(note, park, id){
    //get container
    const bottomContainer = document.querySelector('#bottom-container');
    //create new note container, note, and delete button
    const parkNoteDiv = document.createElement('span');
    parkNoteDiv.id = 'park-note-div'
    const parkNote = document.createElement('p');
    parkNote.className = 'park-note';
    parkNote.id = id;
    const deleteParkNote = document.createElement('button');
    deleteParkNote.className = 'delete-note-button';

    //fill note
    parkNote.textContent = `comment about ${park} park: ${note} `;
    deleteParkNote.textContent = 'x';

    //append note
    parkNote.appendChild(deleteParkNote);
    bottomContainer.appendChild(parkNote);

    //add event listener to delete button
    deleteParkNote.addEventListener('click', (e) => {handleDelete(e, id)});
}

function handleDelete(e, id){
    //delete the note from page
    e.target.parentNode.remove();

    //delete request
    fetch(LOCAL_DB_URL + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.json())
        .then(json => json)
};

init();