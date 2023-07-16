

const employeesList = document.querySelector("table#employees");
const submitCreateBtn = document.querySelector('#createSaveBtn')
const exitCreateBtn = document.querySelector('#exitCreate')
const exitEditBtn = document.querySelector('#exitEdit')
const saveEditBtn = document.querySelector ('#saveEdit')
const confirmDeleteBtn = document.querySelector('#confirmDelete')
const declineDeleteBtn = document.querySelector ('#declineDelete')

let idToDelete;
let paramsToEdit=[];



submitCreateBtn.addEventListener("click", create)
saveEditBtn.addEventListener("click", update)
confirmDeleteBtn.addEventListener("click", onDelete)




let employeesArr=[]



fetch("http://localhost:3000/api/employees")
    .then(res => res.json())
    .then(employees => {
        console.log(employees)
       
        employees.forEach(employee => {
          
            employeesArr.push(employee)
          
        });
        displayEmployees();
    });

    

    function displayEmployees(){

        employeesArr.forEach(employee => {
            
            employeesList.innerHTML += `
            <tr>
            <th >${employee.id}</th>
            <td><img class="rounded" src= "https://randomuser.me/api/portraits/men/${employee.id}.jpg" /></td>
            <td>${employee.first_name ? employee.first_name : ''}</td>
            <td>${employee.last_name ? employee.last_name : ''}</td>
            <td>${employee.home_phone ? employee.home_phone : ''}</td>
            <td>${employee.address ? employee.address : ''}</td>
            <td>
                <button id="edit${employee.id}" data-id="${employee.id}" class="editBtn btn btn-warning"data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                <button id="delete${employee.id}" data-id="${employee.id}" class="deleteBtn btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
            </td>
          </tr>
            `
        });
        employeesArr.forEach(employee => {
            const deleteBtn = document.querySelector(`#delete${employee.id}`);
            const editBtn = document.querySelector(`#edit${employee.id}`)
            deleteBtn.addEventListener("click", () => setParams(employee.id));
            editBtn.addEventListener("click",()=>( setParamsEdit(employee.id, employee.first_name, employee.last_name, employee.home_phone, employee.address)))
        });


    }
    function setParams(id){
        console.log(`setting params ${id}`)
        idToDelete = id;
    }
    function setParamsEdit(id, firstName, lastName,phone, adress){
        console.log(`setting params id:${id}, first:${firstName}, last: ${lastName}, phone:${phone}, adress:${adress}`)
      
        paramsToEdit.push(id);
        paramsToEdit.push(firstName);
        paramsToEdit.push(lastName);
        paramsToEdit.push(phone);
        paramsToEdit.push(adress);
        
        
     
    }


    function create(event) {
       
        event.preventDefault()
        console.log('create event')
        
        const id = employeesArr.length +1
        console.log(id)
        const firstName = document.querySelector('#firstNameCreate').value
        console.log(firstName)

        console.log(event)
        const lastName = document.querySelector('#lastNameCreate').value
        const phone = document.querySelector('#phoneCreate').value
        const adress = document.querySelector('#adressCreate').value
        const data = {id, firstName, lastName, phone, adress}

        fetch("http://localhost:3000/api/employees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            
            body: JSON.stringify({
                "id": id,
           "company":" company",
           "last_name": lastName,
           "first_name": firstName,
           "email_address": "emailA",
           "job_title": "job",
           "business_phone": "(123)555-0100",
           "home_phone": phone,
           "fax_number": "(123)555-0103",
           "address":adress,
           "city": "city",
           "state_province": "WA",
           "zip_postal_code": 9999,
           "country_region": "country",
           "web_page": "http://northwindtraders.com#http://northwindtraders.com/#",
           "notes": "notes",
           "salary": 0
            }

            )
            .then
        })
            
    }

    function onDelete(event) {

        console.log(idToDelete)
    
        fetch(`http://localhost:3000/api/employees/${idToDelete}`, {
            method: "DELETE"
        })
            .then(res => res.json())
    
            .then(res => {
                
                employeesList.innerHTML="";
                displayEmployees();
                
            });
    
    }

    function update (){
        const firstNameInput = document.querySelector(`#firstNameEdit`).value;
        const lastNameInput = document.querySelector(`#lastNameEdit`).value;
        const phoneInput = document.querySelector(`#phoneEdit`).value;
        const adressInput = document.querySelector(`#adressEdit`).value;
        console.log(`first: ${firstNameInput}`)

        fetch(`http://localhost:3000/api/employees/${paramsToEdit[0]}`, {
            method: "PATCH",
        
        body: JSON.stringify({
            "id":paramsToEdit[0],
       "company":" company",
       "last_name": lastNameInput,
       "first_name": firstNameInput,
       "email_address": "emailA",
       "job_title": "job",
       "business_phone": "(123)555-0100",
       "home_phone": phoneInput,
       "fax_number": "(123)555-0103",
       "address":adressInput,
       "city": "city",
       "state_province": "WA",
       "zip_postal_code": 9999,
       "country_region": "country",
       "web_page": "http://northwindtraders.com#http://northwindtraders.com/#",
       "notes": "notes",
       "salary": 0
        }
        )})
    }
    paramsToEdit= [];
    displayEmployees();

  