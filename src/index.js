//Link to codefortulsa api that only includes park data for parks with restrooms, drinking fountains, and playgrounds
//API is set to 20 rows, but only has 12 parks that meet the criteria
const BASE_URL = "https://codefortulsa.opendatasoft.com/api/records/1.0/search/?dataset=parks-and-recreation-areas&q=&rows=20&facet=operdays&facet=operhours&facet=restroom&facet=adacomply&facet=camping&facet=swimming&facet=swimmingjr&facet=waterplayg&facet=splashpad&facet=hiking&facet=fishing&facet=picnic&facet=boating&facet=hunting&facet=roadcycle&facet=mtbcycle&facet=playground&facet=golf&facet=ski&facet=soccer&facet=baseball&facet=basketball&facet=basketba_1&facet=tennis&facet=tennislit&facet=dogpark&facet=discgolf&facet=drinkingfo&facet=outdoorfit&facet=reccenter&refine.playground=Yes&refine.restroom=Yes&refine.drinkingfo=Yes";

function init(){
    const buttons = [...document.getElementsByClassName('feature-button')];
    buttons.forEach(e => e.addEventListener('click', console.log(e)));
}

//Working API!! - currently set up as a forEach to pass but may need to pass elsewhere
function getParks(){
    fetch(BASE_URL)
    .then(resp => resp.json())
    .then(json => json.records.forEach(renderParkCards));  
}

//function filterParks(park)

//display parkCards in middle div