//Link to codefortulsa api that only includes park data for parks with restrooms, drinking fountains, and playgrounds
//API is set to 20 rows, but only has 12 parks that meet the criteria
const BASE_URL = "https://codefortulsa.opendatasoft.com/api/records/1.0/search/?dataset=parks-and-recreation-areas&q=&rows=20&facet=operdays&facet=operhours&facet=restroom&facet=adacomply&facet=camping&facet=swimming&facet=swimmingjr&facet=waterplayg&facet=splashpad&facet=hiking&facet=fishing&facet=picnic&facet=boating&facet=hunting&facet=roadcycle&facet=mtbcycle&facet=playground&facet=golf&facet=ski&facet=soccer&facet=baseball&facet=basketball&facet=basketba_1&facet=tennis&facet=tennislit&facet=dogpark&facet=discgolf&facet=drinkingfo&facet=outdoorfit&facet=reccenter&refine.playground=Yes&refine.restroom=Yes&refine.drinkingfo=Yes";

let currentParkArray = [];

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
    fetch(BASE_URL + `&refine.${sportIdOrKeyName}=Yes`)
    .then(resp => resp.json())
    .then(json => renderParkCards(json.records))
    //.then(renderParkCards);
}

//display parkCards in middle div
//!!!WORKING - CAN USE INIT --> CLICK A FEATURE BUTTON --> WILL RETURN THOSE PARKS
function renderParkCards(parksWithFeature){
    debugger;
}