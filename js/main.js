let listUser = [];

function $(element) {
  return document.getElementById(element);
}

function main() {
  toogleModal();
  userRegister();
}

main();

function toogleModal() {
  const btn = $("test");
  const modal = $("modal");
  const overlay = document.querySelector(".over-lay");
  const clickModal = document.querySelector(".modal-login__hide");

  btn.addEventListener("click", function (event) {
    event.preventDefault();

    modal.style.transform = "translateY(0)";
    modal.style.animation = "shaDownElement 1s 1";
    modal.style.opacity = 1;
    overlay.style.display = "block";
    overlay.style.animation = "overlay 1s 1";
  });

  function hideModal() {
    modal.style.transform = "translateY(-120%)";
    overlay.style.display = "none";

    setTimeout(function () {
      modal.style.opacity = 0;
      modal.style.transform = "translateY(120%)";
    }, 100);
  }

  overlay.addEventListener("click", hideModal);
  clickModal.addEventListener("click", hideModal);
}

function userRegister() {
  const btnRegister = document.querySelector(".btn.btn--primary.btn--register");
  btnRegister.addEventListener("click", function (event) {
    event.preventDefault();
    console.log($("register-username"));
    const userName = $("register-username").value;
    const passWord = $("register-password").value;
    const confirmPassword = $("register-confirm").value;
    const phone = $("register-phone").value;
    const address = $("register-address").value;
    const form = $("register-form");

    const newUser = {
      username: userName,
      password: passWord,
      confirm: confirmPassword,
      phone: phone,
      address: address,
    };

    listUser.push(newUser);

    localStorage.setItem("users", JSON.stringify(listUser));
    form.reset();
  });
}
