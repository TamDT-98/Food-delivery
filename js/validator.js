//Doi tuong Validator

function Validator(options) {
  const formElement = document.querySelector(options.form);

  if (formElement) {
    // Lap qua moi rules va lang nghe xy ly (Lang nghe su kien blur, input, ...)

    options.rules.forEach(function (rule) {
      const inputElement = formElement.querySelector(rule.selector);
      const errorElement = inputElement.parentElement.querySelector(
        ".form-message"
      );

      if (inputElement) {
        inputElement.onblur = function () {
          const errorMessage = rule.test(inputElement.value);

          if (errorMessage) {
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add("invalid");
          } else {
            errorElement.innerText = "";
            inputElement.parentElement.classList.remove("invalid");
          }
        };
        inputElement.oninput = function () {
          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("invalid");
        };
      }
    });
  }
}

// Dinh nghia rules
/*
  Nguyen tac cac rules:
    1. Khi co loi => Tra ra message loi.
    2. Khi hop le => Khong tra ra gi ca "undifined"
*/
Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      if (value.length === 0) {
        this.isValid = true;
        return "Field is required";
      }
    },
  };
};

Validator.isUserName = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      const regexUserName = /^[a-zA-Z0-9@._]+$/;
      let isValid = true;
      if (value.length < 6) {
        return "User name minimum 6 charecter";
      } else if (value.length > 20) {
        return "User name maximum 20 charecter";
      } else if (!regexUserName.test(value)) {
        return "User name does not match";
      }
    },
  };
};

Validator.isPassword = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

      if (value.length < 6 || value.length > 12) {
        return "Password minimum 6 charector and maximum 20 charector";
      } else if (!regexPassword.test(value)) {
        return "Password does not match";
      }
    },
  };
};

Validator.confirmPassword = function (selector, getConfirmValue, message) {
  return {
    selector: selector,
    test: function (value) {
      if (getConfirmValue() !== value) {
        return message;
      }
    },
  };
};

Validator.isPhone = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      if (value.length !== 10) {
        return "Phone get only 10 numbers";
      }
    },
  };
};

Validator.isAddress = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      if (value.length === 0) {
        return;
      } else if (value.length < 20) {
        return "Address max length 20 charectors";
      }
    },
  };
};
