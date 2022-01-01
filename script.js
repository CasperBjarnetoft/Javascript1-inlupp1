let persons = [
    {
        id: 1,
        firstname: 'First name',
        lastname: 'Last name',
        email: 'Email',
        completed: false
    }
]



const regForm = document.querySelector('#regform')
const email = document.querySelector('#email')
const firstname = document.querySelector('#firstName')
const lastname = document.querySelector('#lastName')
const output = document.querySelector('#person')

const validateText = (id) => {
    let input = document.querySelector(id)

    if(input.value === '' || input.value.length < 2) {
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

const listPersons = () => {
    output.innerHTML = '';
    persons.forEach(person => {
        output.innerHTML += `
        <div  id="${person.id}"class="output">
        <div class="wrap">
            <p>${person.firstname} ${person.lastname}</p>
            <a href="mailto:email@simple.com" class="email">${person.email}</a>
        </div>

        <button type="button" id="resetbutton" class="btndelete">X</button>
        </div>
        `
        return;
    })
}

listPersons();

regForm.addEventListener('submit', e => {
    e.preventDefault();
    const errors = [];

    for (let i = 0; i< e.currentTarget.length; i++) {
        if (e.currentTarget[i].type === 'text') {
            errors[i] = validateText('#' + e.currentTarget[i].id)
        }
        else if(e.currentTarget[i].type === 'email') {
            errors[i] = validateEmail(email)
        }
    }

    if(errors.includes(false)) {

    }
    else {
        const person = {
            id: Date.now().toString(),
            firstname: firstname.value,
            lastname: lastname.value,
            email: email.value,
            completed: false,
            
        }
        persons.push(person);
        let unique = [];
        let distinct = [];
        for( let i = 0; i < persons.length; i++ ){
        if( !unique[persons[i].email]){
            distinct.push(persons[i].email);
            unique[persons[i].email] = 1;
        }
        }

        if (distinct.length < persons.length) {

        }
        else {
            listPersons();
            firstname.value = ''
            lastname.value = ''
            email.value = ''
            console.log(distinct)
        }   
        console.log(persons.length)
    }

})


output.addEventListener('click', e => {
    if(e.target.type == 'button') {
        persons = persons.filter(person => person.id !== e.target.parentNode.id);
        listPersons()
    }
})