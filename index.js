let form = document.getElementById("login-form");
const dobInput = document.getElementById('dob');

dobInput.addEventListener('input', (event) => {
    const dob = new Date(event.target.value);
    const now = new Date();
    const age = now.getFullYear() - dob.getFullYear();

    if ((age < 18) || age > 55) {
        dobInput.setCustomValidity('Please enter a valid date of birth between ages 18 and 55.');
    }
    else{
        dobInput.setCustomValidity('');
    }
});

const getentries = ()=>{
    let entries = localStorage.getItem("user-entries");
    if(entries){
        entries = JSON.parse(entries);
    }
    else{
        entries = [];
    } 
    return entries;
}
let data = getentries();

const showentries =()=>{
    const entries = getentries();
    const tabentries = entries.map((entry)=>{
        const nameCell = `<td>${entry.nm}</td>`;
        const emailCell = `<td>${entry.eml}</td>`;
        const passwordCell = `<td>${entry.pas}</td>`;
        const dobCell = `<td>${entry.db}</td>`;
        const acceptTermsCell = `<td>${entry.ch}</td>`;
        const row = `<tr>${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
        return row;
    }).join("\n");

    const table = 
    `<table class="table-auto w-full">
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>dob</th>
            <th>accepted terms?</th>
        </tr>${tabentries}
    </table>`;

    let details = document.getElementById("user-entries");
    details.innerHTML = table;
}
const saveform = (event)=>{
    event.preventDefault();
    const nm = document.getElementById("name").value; 
    const eml = document.getElementById("email").value;
    const pas = document.getElementById("password").value;
    const db = document.getElementById("dob").value;
    const ch = document.getElementById("acceptTerms").checked;
    const entry = {
        nm,
        eml,
        pas,
        db,
        ch
    }
    data.push(entry);
    localStorage.setItem("user-entries",JSON.stringify(data));
    showentries();
}

form.addEventListener("submit",saveform); 

showentries();
