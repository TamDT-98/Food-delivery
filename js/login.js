const getUserName = JSON.parse(localStorage.getItem("users"));

function $(element) {
  return document.getElementById(element);
}

const btn = $("test");
const modal = $("modal");
const overlay = document.querySelector(".over-lay");

function hideModal() {
  modal.style.transform = "translateY(-120%)";
  overlay.style.display = "none";

  setTimeout(function () {
    modal.style.opacity = 0;
    modal.style.transform = "translateY(120%)";
  }, 100);
}

const login = function () {
  // const findUser = getUserName.find(function (user) {
  //   return user.userName === userName && user.password === password;
  // });
  // console.log(findUser);
  const userName = $("user-name");
  const passWord = $("pass-word");
  const btnLogin = $("btn--login");
  const elementLoginRegister = $("test");
  const loginElement = $("logout");
  btnLogin.addEventListener("click", function () {
    const findUser = getUserName.find(function (user) {
      const userCorrect =
        user.userName === userName.value && user.password === passWord.value;
      return userCorrect;
    });

    if (findUser) {
      hideModal();
      elementLoginRegister.innerHTML = `Hello ${findUser.userName}`;
      loginElement.innerHTML = "Logout";
    } else {
      alert("Password or username is correct!");
    }
  });
};

login();
