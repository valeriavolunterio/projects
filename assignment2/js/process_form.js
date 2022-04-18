function init() {
  let personalInfo = document.getElementById("personalInfo");
  let inputFields = personalInfo.getElementsByTagName("input");
  let survey = document.getElementById("survey");
  survey.remove();
  let results = document.getElementById("results");
  results.remove();
  submitBtn = document.getElementById("submitBtn");
  submitBtn.remove();

  let form = document.querySelector("form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    submitBtn.remove();
    processResult();
  });
  // user info vars
  var firstName = "";
  var lastName = "";
  var phone = "";
  var email = "";
  var address = "";

  function disable(i) {
    i.setAttribute("disabled", "");
  }

  for (let i = 0; i < inputFields.length; i++) {
    let hints = personalInfo.getElementsByClassName("hint");

    inputFields[i].addEventListener("focus", function showHint() {
      hints[i].style.opacity = "100";
    });

    inputFields[i].addEventListener("blur", function validateData() {
      let userInput = inputFields[i].value;

      function validate() {
        let icon = hints[i].querySelector("#icon");
        if (icon) {
          icon.src = "img/valid.png";
        } else {
          let img = document.createElement("img");
          img.id = "icon";
          img.src = "img/valid.png";
          hints[i].insertAdjacentElement("afterbegin", img);
        }
        hints[i].lastElementChild.style.opacity = "0";
        allValid();
      }
      function invalidate() {
        let icon = hints[i].querySelector("#icon");
        if (icon) {
          icon.src = "img/invalid.png";
        } else {
          let img = document.createElement("img");
          img.id = "icon";
          img.src = "img/invalid.png";
          hints[i].insertAdjacentElement("afterbegin", img);
        }
        hints[i].lastElementChild.style.opacity = "100";
        hints[i].style.color = "red";
      }
      if (inputFields[i].id == "firstName") {
        let valid = /^[a-zA-Z]+$/;
        if (userInput.match(valid)) {
          firstName = inputFields[i].value;
          validate();
        } else {
          invalidate();
          firstName = "";
          hints[i].lastElementChild.textContent = "Not a valid first name";
        }
      } else if (inputFields[i].id == "lastName") {
        let valid = /^[a-zA-Z]+$/;
        if (userInput.match(valid)) {
          lastName = inputFields[i].value;
          validate();
        } else {
          invalidate();
          lastName = "";
          hints[i].lastElementChild.textContent = "Not a valid last name";
        }
      } else if (inputFields[i].id == "phone") {
        let valid = /^\d\d\d-\d\d\d-\d\d\d\d$/;
        if (userInput.match(valid)) {
          phone = inputFields[i].value;
          validate();
        } else {
          invalidate();
          phone = "";
          hints[i].lastElementChild.textContent = "Not a valid phone number";
        }
      } else if (inputFields[i].id == "email") {
        let valid = /^\S+@\S+\.\S+$/;
        if (userInput.match(valid)) {
          email = inputFields[i].value;
          validate();
        } else {
          invalidate();
          email = "";
          hints[i].lastElementChild.textContent = "Not a valid e-mail address";
        }
      } else {
        let valid = /^https?:\/\/\S+~\S+$/;
        if (userInput.match(valid)) {
          address = inputFields[i].value;
          validate();
        } else {
          invalidate();
          address = "";
          hints[i].lastElementChild.textContent =
            "Not a valid Students address";
        }
      }
    });
  }
  function allValid() {
    if (
      firstName != "" &&
      lastName != "" &&
      phone != "" &&
      email != "" &&
      address != ""
    ) {
      let inputArr = Array.from(inputFields);
      inputArr.forEach(disable);
      addSurvey();
    }
  }
  function addSurvey() {
    // survey
    personalInfo.insertAdjacentElement("afterend", survey);
    survey.insertAdjacentElement("afterend", submitBtn);
    let questions = survey.getElementsByClassName("question");
    let questionsArr = Array.from(questions);

    questionsArr.forEach(listen);
    function listen(i) {
      i.addEventListener("change", function processResult() {
        let checked = survey.querySelectorAll("input[type=radio]:checked");
        let checkedArr = Array.from(checked);

        if (checkedArr.length == 3) {
          submitBtn.removeAttribute("disabled");
        }
      });
    }
  }
  function processResult() {
    let radio = survey.getElementsByTagName("input");
    let radioArr = Array.from(radio);
    radioArr.forEach(disable);

    survey.insertAdjacentElement("afterend", results);

    let userInfo = document.getElementById("userInfo");
    let text = document.createTextNode(firstName);
    userInfo.children[1].appendChild(text);
    text = document.createTextNode(lastName);
    userInfo.children[2].appendChild(text);
    text = document.createTextNode(phone);
    userInfo.children[3].appendChild(text);
    text = document.createTextNode(email);
    userInfo.children[4].appendChild(text);
    text = document.createTextNode(address);
    userInfo.children[5].appendChild(text);

    let checked = survey.querySelectorAll("input[type=radio]:checked");
    let checkedArr = Array.from(checked);

    let labels = [];
    checkedArr.forEach(getLabel);
    function getLabel(i) {
      let label = i.nextElementSibling.textContent;
      labels.push(label);
    }
    let userSelect = document.getElementById("userSelect");
    userSelect.children[2].textContent = labels[0];
    userSelect.children[4].textContent = labels[1];
    userSelect.children[6].textContent = labels[2];

    let sukiResult = document.getElementById("sukiResult");
    let h2 = sukiResult.firstElementChild;
    let figure = document.querySelector("figure");
    let figcaption = figure.querySelector("figcaption");
    let link = figcaption.querySelector("a");

    let img = document.createElement("img");
    img.id = "sukiImg";
    figure.insertAdjacentElement("afterbegin", img);

    let valArr = [];
    checkedArr.forEach(takeValues);
    function takeValues(index) {
      valArr.push(index.value);
    }
    if (valArr.indexOf("grumpy") != valArr.lastIndexOf("grumpy")) {
      h2.textContent = "You got: Grumpy Suki!";
      img.src = "img/grumpy.jpg";
      link.href =
        "https://valeriavolunterio.github.io/projects/assignment2/img/grumpy.jpg";
    } else if (valArr.indexOf("happy") != valArr.lastIndexOf("happy")) {
      h2.textContent = "You got: Happy Suki!";
      img.src = "img/happy.jpg";
      link.href =
        "https://valeriavolunterio.github.io/projects/assignment2/img/happy.jpg";
    } else {
      h2.textContent = "You got: Ambivalent Suki!";
      img.src = "img/ok.jpg";
      link.href =
        "https://valeriavolunterio.github.io/projects/assignment2/img/ok.jpg";
    }
  }
}
window.addEventListener("load", init, false);
