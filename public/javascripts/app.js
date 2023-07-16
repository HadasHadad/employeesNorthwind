

const employeesList = document.querySelector("table#employees");
const submitCreateBtn = document.querySelector('#createSaveBtn')
const exitCreateBtn = document.querySelector('#exitCreate')
const exitEditBtn = document.querySelector('#exitEdit')
const saveEditBtn = document.querySelector ('#saveEdit')
const confirmDeleteBtn = document.querySelector('#confirmDelete')
const declineDeleteBtn = document.querySelector ('#declineDelete')



submitCreateBtn.addEventListener("click", create)
saveEditBtn.addEventListener("click", update)
confirmDeleteBtn.addEventListener("click", onDelete)




let employeesArr=[]
function displayEmployees(){



fetch("http://localhost:3000/api/employees")
    .then(res => res.json())
    .then(employees => {
        console.log(employees)
       
        employees.forEach(employee => {
            const id = employee.id
            employeesArr.push(employee)
          
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
        const deleteBtn = document.querySelector(`#delete${employee.id}`)
        deleteBtn.addEventListener("click",()=> setParams(id))
        });
        // addListeners();
    })
    function setParams(id){
        console.log(`setting params ${id}`)
    }
    function addListeners(){
        const deleteBtn = document.querySelectorAll('.deleteBtn')
        deleteBtns.forEach(deleteBtn => {
            deleteBtn.addEventListener("click",()=>function (event){
                 const id= event.target.dataset.id  
                  console.log(id)})
          
        });
        deleteBtns.addEventListener("click",()=>function (event){ event.target.dataset.id})
console.log(deleteBtns)
    }
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
        })
            
    }

    function onDelete(event) {

        console.log(event)
    
        // fetch(`http://localhost:3000/api/cars/${id}`, {
        //     method: "DELETE"
        // })
        //     .then(res => res.json())
    
        //     .then(res => {
                
        //         const cardDiv = document.getElementById(res.message);
        //         cardDiv.style.display = "none"
        //         console.log( cardDiv)
        //         console.log( res.message)
        //     });
    
    }

    function update (){
        console.log("update")
    }

    
displayEmployees();
  