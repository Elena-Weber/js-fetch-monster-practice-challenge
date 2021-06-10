// save json url into a constant
const URL_PREFIX = 'http://localhost:3000/';

// set first page counter
let page = 1;

// 
const getMonsters = a => {
    console.log('get monsters function'),
    // send request to url (db with monsters), limit 50 monsters per page
    fetch(URL_PREFIX + `monsters/?_limit=50&_page=${a}`)
    // convert response to json
    .then(b => b.json())
    // choose container with all monsters and set it to empty string
    .then(b => {
        document.querySelector('#monster-container').innerHTML = '';
        // iterate over monsters array
        for(let c = 0; c < b.length; c++)
        console.log('monster', b[c]),
        // display each monster card (see below)
        createMonsterCard(b[c])
    })
},
// display each monster (create monster card)
createMonsterCard = a => {
    // create div
    let b = document.createElement('div'),
    // create 3 tags (name, age, bio)
    c = document.createElement('h2'),
    d = document.createElement('h4'),
    e = document.createElement('p');
    // what to show in each tag (name, age, bio)
    c.innerHTML = `${a.name}`,
    d.innerHTML = `Age: ${a.age}`,
    e.innerHTML = `Bio: ${a.description}`,
    // insert h2, h4, p into div
    b.appendChild(c),
    b.appendChild(d),
    b.appendChild(e),
    // insert div into container
    document.querySelector('#monster-container').appendChild(b)
},

// create form for new monster
createMonsterForm = () => {
    // create form
    const a = document.createElement('form'),
    // create 3 inputs
    b = document.createElement('input'),
    c = document.createElement('input'),
    d = document.createElement('input'),
    // create button
    e = document.createElement('button');
    // assign ids to form and 3 inputs
    a.id = 'monster-form',
    b.id = 'name',
    c.id = 'age',
    d.id = 'description',
    // assign placeholders to 3 inputs
    b.placeholder = 'name...',
    c.placeholder = 'age...',
    d.placeholder = 'description...',
    // assign text to button
    e.innerHTML = 'Create',
    // insert 3 inputs and button into form
    a.appendChild(b),
    a.appendChild(c),
    a.appendChild(d),
    a.appendChild(e),
    // insert form into div-container
    document.getElementById('create-monster').appendChild(a),
    // listen to submit button (next function)
    addSubmitEventListener()
},

// what happens on submit button
addSubmitEventListener = () => {
    document.querySelector('#monster-form').addEventListener('submit', a => {
        // prevent reloading
        a.preventDefault(),
        console.log('submitted', getFormData()),
        // save new monster to db
        postNewMonster(getFormData()),
        // clear inputs in form
        clearForm()
    })
},

// 
getFormData = () => {
    let a = document.querySelector('#name'),
    b = document.querySelector('#age'),
    c = document.querySelector('#description');
    return{
        name:a.value,
        age:parseFloat(b.value),
        description:c.value}
},

// save monster to db
postNewMonster = a => {
    // set up url with db
    let b = URL_PREFIX + `monsters`,
    //sending data to server
    c = {
        method:'POST',
        headers: {
            'Content-type': 'application/json',
            Accept: 'application/json'
        },
    body: JSON.stringify(a)
    };
    // send url and method
    fetch(b,c)
    // convert response to json
    .then(d => d.json())
    // display monster in console
    .then(d => console.log('new monster', d))
},

// delete data in form
clearForm = () => {
    document.querySelector('#monster-form').reset()
},

// listen to 2 arrow-buttons
addNavListeners = () => {
    // assign back arrow button
    let a = document.querySelector('#back'),
    // assign forward arrow button
    b = document.querySelector('#forward');
    // listen for clicks on them and start 2 functions below on click
    a.addEventListener('click', () => {pageDown()}),
    b.addEventListener('click', () => {pageUp()})
},

// increment page by 1 and show page with monsters
pageUp = () => {
    page++, getMonsters(page)
},

// // decrement page by 1 and show page with monsters else show error
pageDown = () => {
    1<page ? (page--, getMonsters(page)) : alert('Aint no monsters here')
},

// this will happen when DOM is fully loaded: show all monsters (on page 1), show create monsters form, show button arrows
init = () => {
    getMonsters(),
    createMonsterForm(),
    addNavListeners()
};

// what to do when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
