function main() {
  toogleModal();
}

main();

function toogleModal() {
  const btn = document.getElementById("test");
  const modal = document.getElementById("modal");
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
