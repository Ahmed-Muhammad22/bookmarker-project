var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var closeBtn = document.getElementById("closeBtn");
var message = document.getElementById("message");
var box = document.getElementById("box");
var bookMarkList = [];
if (localStorage.getItem("bookMarkContainer") !== null) {
  bookMarkList = JSON.parse(localStorage.getItem("bookMarkContainer"));
  displayData();
}
function addData() {
  if (allValidation(siteName, "msgName") && allValidation(siteUrl, "msgUrl")) {
    var bookMark = {
      name: siteName.value,
      url: siteUrl.value,
    };
    bookMarkList.push(bookMark);
    localStorage.setItem("bookMarkContainer", JSON.stringify(bookMarkList));
    console.log(bookMarkList);
    displayData();
    clearData();
  } else {
    message.classList.remove("d-none");
    box.classList.remove("d-none");
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
                   ${bookMarkList[i].name}
                </td>
                <td>
                    <button onclick="window.open('${
                      bookMarkList[i].url}','_blank')" class="btn site-visit pe-2">
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
  siteName.value = "";
  siteUrl.value = "";
  siteName.classList.remove("is-valid", "is-invalid");
  siteUrl.classList.remove("is-valid", "is-invalid");
}

function deleteData(index) {
  bookMarkList.splice(index, 1);
  localStorage.setItem("bookMarkContainer", JSON.stringify(bookMarkList));
  displayData();
}

function allValidation(element, msgId) {
  let msg = document.getElementById(msgId);

  var regex = {
    siteName: /^\w{3,}(\s+\w+)*$/,
    siteUrl:
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)$/gi,
  };
  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    msg.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    msg.classList.remove("d-none");
    return false;
  }
}
closeBtn.addEventListener("click", function () {
  box.classList.add("d-none");
});
