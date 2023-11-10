const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeBtn = document.getElementById("closeBtn");

loginBtn.addEventListener("click", () => {
    loginModal.style.display = "block";
});

closeBtn.addEventListener("click", () => {
    loginModal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = "none";
    }
});
