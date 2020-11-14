const inputs = document.querySelectorAll("label ~ [name]");

inputs.forEach((input) => {
  input.addEventListener("change", (e) => {
    console.log(e.target.value);
  });
});
