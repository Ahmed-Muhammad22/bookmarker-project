var siteNameInput = document.getElementById("book-name"); 
var siteUrlInput = document.getElementById("book-url");
var closeBtn = document.getElementById("closeBtn");
var message = document.getElementById("message");
var box = document.getElementById("box");
var bookMarkList = [];
if (localStorage.getItem("bookMarkContainer") !== null) {
    bookMarkList = JSON.parse(localStorage.getItem("bookMarkContainer"));
    displayData();
}
function addData() {
    if (validationName() && validationUrl()) {
        var bookMark = {
            siteName: siteNameInput.value,
            siteUrl: siteUrlInput.value,
        };
        bookMarkList.push(bookMark);
        localStorage.setItem("bookMarkContainer", JSON.stringify(bookMarkList));
        console.log(bookMarkList);
        displayData();
        clearData();
    }
    else {
        message.classList.remove("d-none");
        box.classList.remove("d-none")
       document.addEventListener("click", function (e) {
                if (e.target == box) {
                    box.classList.add("d-none");
                   }
                 });
    }
}
function displayData() {
    var cartoona = "";
    for (let i = 0; i < bookMarkList.length; i++) {
        cartoona += `
             <tr>
                <td>
                    ${i + 1}
                </td>
                <td>
                   ${bookMarkList[i].siteName}
                </td>
                <td>
                    <button onclick="visitData(${i})" class="btn site-visit pe-2">
                        <i class="fa-regular fa-eye pe-1"></i>
                        Visit
                    </button>
                </td>
                <td>
                    <button onclick="deleteData(${i})" class="btn  site-delete pe-2">
                        <i class="fa-solid fa-trash-can pe-1"></i>
                        Delete
                    </button>
                </td>
               </tr>
        `;
        
    }
    document.getElementById("tbody").innerHTML = cartoona;
}

function clearData() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
  siteNameInput.classList.remove("is-valid");
  siteUrlInput.classList.remove("is-valid");
}

function visitData(index) {
    var website= bookMarkList[index].siteUrl;
    var regex =
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/gi;

    if (regex.test(website)) {
        window.open(website, "_blank")
    }
}

function deleteData(index) {
    bookMarkList.splice(index, 1);
    localStorage.setItem("bookMarkContainer", JSON.stringify(bookMarkList));
    displayData();
}

function validationName() {
    var text = siteNameInput.value;
    var regex = /^\w{3,}(\s+\w+)*$/;
    if (regex.test(text)) {
        siteNameInput.classList.add("is-valid");
        siteNameInput.classList.remove("is-invalid");
        return true;
    }
    else {
         siteNameInput.classList.add("is-invalid");
         siteNameInput.classList.remove("is-valid");
        return false;
    }
}

function validationUrl() {
    var url = siteUrlInput.value;
    var regex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)$/gi;

    if (regex.test(url)) {
        siteUrlInput.classList.add("is-valid");
        siteUrlInput.classList.remove("is-invalid");
        return true;
    } else {
        siteUrlInput.classList.remove("is-valid");
        siteUrlInput.classList.add("is-invalid");
        return false;
    }
}

closeBtn.addEventListener("click", function () {
    box.classList.add("d-none");
});