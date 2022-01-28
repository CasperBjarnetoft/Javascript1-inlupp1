// Makes an array for persons
let persons = [
    {
        id: "1",
        firstname: 'First name',
        lastname: 'Last name',
        email: 'Email',
        completed: false
    }
]

// Getting all values
const regForm = document.querySelector('#regform')
const email = document.querySelector('#email')
const firstname = document.querySelector('#firstName')
const lastname = document.querySelector('#lastName')
const output = document.querySelector('#person')
const valid = document.querySelector('#validmail')

// values to change a user
let userIndex;
let changeuser = false;

// Validation for text
const validateText = (id) => {
    let input = document.querySelector(id)

    if(input.value === '' || input.value.length < 3) {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid')
        input.focus();
        return false;
    }
    else {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
        return true;
    }
}

// Validation for email
const validateEmail = (emailInput) => {
    let regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(regEx.test(emailInput.value)) {
        emailInput.classList.remove('is-invalid')
        emailInput.classList.add('is-valid')  
        return true;   
    }
    else {
        emailInput.classList.remove('is-valid')
        emailInput.classList.add('is-invalid')  
        emailInput.focus();  
        return false
    }

}

//  Makes HTML for each person
const listPersons = () => {
    output.innerHTML = '';
    persons.forEach(person => {
        output.innerHTML += `
        <div  id="${person.id}"class="output">
        <div class="wrap">
            <p>${person.firstname} ${person.lastname}</p>
            <a href="mailto:email@simple.com" class="email">${person.email}</a>
        </div>

        <div>
            <button type="submit" id="changevalue" class="btnchange">Change</button>
            <button type="button" id="resetbutton" class="btndelete">X</button>
        </div>
        `
    })
}

// Show the array on website
listPersons();

// What is going to happen when you click the submit button in form
regForm.addEventListener('submit', e => {
    e.preventDefault();
    const errors = [];

    // Validation for inputs on submit
    for (let i = 0; i< e.currentTarget.length; i++) {
        if (e.currentTarget[i].type === 'text') {
            errors[i] = validateText('#' + e.currentTarget[i].id)
        }
        else if(e.currentTarget[i].type === 'email') {
            errors[i] = validateEmail(email)
        }
    }

    // if statment to check what to do if the inputs are true or false
    if(errors.includes(false)) {

    }
    else {
        // if statment to check if it is a new user or change user
        if (changeuser) {
            const newperson = {
                id: Date.now().toString(),
                firstname: firstname.value,
                lastname: lastname.value,
                email: email.value,
                completed: false,
            }
            persons.splice(userIndex, 1,  newperson)
            let unique = [];
            let distinct = [];
            for( let i = 0; i < persons.length; i++ ){
            if( !unique[persons[i].email]){
                distinct.push(persons[i].email);
                unique[persons[i].email] = 2;
            }
            }
                        
            if (distinct.length === persons.length) {
                listPersons();
                email.classList.remove('is-invalid')
                firstname.value = ''
                lastname.value = ''
                email.value = ''
                changeuser = false;
            }
            else {
                email.classList.add('is-invalid')
                valid.innerHTML = `<p>email already exist</p>`
                email.value = ''
            }   
                                                           
        }
        else {
            const person = {
                id: Date.now().toString(),
                firstname: firstname.value,
                lastname: lastname.value,
                email: email.value,
                completed: false,
            }
                persons.push(person)
                let unique = [];
                let distinct = [];
                for( let i = 0; i < persons.length; i++ ){
                if( !unique[persons[i].email]){
                    distinct.push(persons[i].email);
                    unique[persons[i].email] = 2;
                }
                }
                
                if (distinct.length === persons.length) {
                    listPersons();
                    email.classList.remove('is-invalid')
                    firstname.value = ''
                    lastname.value = ''
                    email.value = ''
                }
                else {
                    persons.pop();
                    email.classList.add('is-invalid')
                    valid.innerHTML = `<p>email already exist</p>`
                    email.value = ''
                }   
            }
        }
    console.log(persons)
})

// what is going to happen when you click on a button type: button or submit
output.addEventListener('click', e => {
    
    // if statment to see with type it is on the button
    if(e.target.type == 'button') {
        // thi is for when you want to delete a user
        persons = persons.filter(person => person.id !== e.target.parentNode.parentNode.id);
        listPersons()
    }
    else if (e.target.type == 'submit') {
        // this is for when you want to change a user
        refuser = persons.find(person => person.id === e.target.parentNode.parentNode.id);
        userIndex = persons.findIndex(person => person.id === e.target.parentNode.parentNode.id)
        firstname.value = refuser.firstname;
        lastname.value = refuser.lastname;
        email.value = refuser.email;
        changeuser = true;     
    }
})


