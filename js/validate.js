// Doi tung Validator
function Validator(options) {
  let selecterRules = {};
  let arrayUser = [];
  // Ham thuc hien validate
  function validate(inputElement, rule) {
    const errorElement = inputElement.parentElement.querySelector(
      options.errorSelector
    );
    let errorMessage;
    // Lay ra cac rules cua selector
    let rules = selecterRules[rule.selector];

    // Lay ra cac rules cua selector
    // Lap qua tung rule va kiem tra. Neu co loi thi dung viec kiem tra
    for (var i = 0; i < rules.length; i++) {
      errorMessage = rules[i](inputElement.value);
      if (errorMessage) {
        break;
      }
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage;
      inputElement.parentElement.classList.add("invalid");
    } else {
      errorElement.innerText = "";
      inputElement.parentElement.classList.remove("invalid");
    }

    return !errorMessage;
  }

  // Lay element cua form
  const formElement = document.querySelector(options.form);

  if (formElement) {
    // Khi submit form

    formElement.onsubmit = function (e) {
      e.preventDefault();

      let isFormValid = true;

      // Lap qua tung rules va validate
      options.rules.forEach(function (rule) {
        const inputElement = formElement.querySelector(rule.selector);
        let isValid = validate(inputElement, rule);

        if (!isValid) {
          isFormValid = false;
        }
      });

      if (isFormValid) {
        if (typeof options.onSubmit === "function") {
          const enableInputs = formElement.querySelectorAll(
            "[name]:not([disabled])"
          );
          const formValues = Array.from(enableInputs).reduce(function (
            values,
            input
          ) {
            return (values[input.name] = input.value) && values;
          },
          {});
          arrayUser.push(formValues);

          options.onSubmit(formValues);
          localStorage.setItem("users", JSON.stringify(arrayUser));
        }
      }
    };

    options.rules.forEach(function (rule) {
      // Luu lai cac rules cho moi input

      if (Array.isArray(selecterRules[rule.selector])) {
        selecterRules[rule.selector].push(rule.test);
      } else {
        selecterRules[rule.selector] = [rule.test];
      }

      // selecterRules[rule.selector] = rule.test;

      const inputElement = formElement.querySelector(rule.selector);

      if (inputElement) {
        // Xu ly truong hop blur khoi input
        inputElement.onblur = function () {
          validate(inputElement, rule);
        };
        // Xu ly truong hop nguoi dung nhap vao input
        inputElement.oninput = function () {
          const errorElement = inputElement.parentElement.querySelector(
            options.errorSelector
          );

          errorElement.innerText = "";
          inputElement.parentElement.classList.remove("invalid");
        };
      }
    });
  }
}

// Dinh nghia cac rules
// Nguyen tac cua cac rules:
// 1. Khi co loi => Tra ra loi message
// 2. Khi hop le => Khong tra ra cai gi ca (undifined)
Validator.isRequired = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      return value.trim() ? undefined : "Vui long nhap truong nay";
    },
  };
};

Validator.isConfirm = function (selector, getConfirmValue) {
  return {
    selector: selector,
    test: function (value) {
      return value === getConfirmValue()
        ? undefined
        : "Gia tri nhap vao khong chinh xac";
    },
  };
};

Validator.isUserName = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      const regexUserName = /^[a-zA-Z0-9@._]+$/;
      if (value.length < 6) {
        return "User name phai lon hon 6 ky tu";
      } else if (value.length > 20) {
        return "User name phai nho hon 20 ky tu";
      } else if (!regexUserName.test(value)) {
        return "User name khong dung dinh dang";
      } else {
        return undefined;
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
        return "Password tu 6 den 12 ky tu";
      } else if (!regexPassword.test(value)) {
        return "Password khong dung dinh dang";
      } else {
        return undefined;
      }
    },
  };
};

Validator.isPhone = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      const regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

      if (!regexPhone.test(value)) {
        return "Phone phai la dang so va phai du 10 chu so";
      }
    },
  };
};

Validator.isAddress = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      if (value.trim().length === 0) {
        return undefined;
      } else if (value.length < 20) {
        return "Dia chi phai lon hon 20 ky tu";
      }
    },
  };
};
