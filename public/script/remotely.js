const inputs = Array.from(document.querySelectorAll("label ~ [name]"));
const data = Array.from(document.querySelectorAll("[data-information]"));

const props = inputs.filter((input) => {
  let val = data.find((node) => {
    return node.getAttribute("data-information") === input.name;
  });
  if (val) return val;
});

props.forEach((prop) => {
  if (prop.type !== "file") {
    prop.addEventListener("keyup", (e) => {
      let val = data.filter((node) => {
        return node.getAttribute("data-information") === prop.name;
      });
      val.forEach((source) => {
        if (source.classList.contains("tags")) {
          source.innerHTML = e.target.value.split(",").reduce((acc, curr) => {
            return (acc += `<button>${curr}</button>`);
          }, ``);
        } else {
          source.innerText = e.target.value;
        }
      });
    });
  } else {
    prop.addEventListener("change", (e) => {
      const [file] = e.target.files;
      if (file.type.startsWith("image")) {
        const imageUrl = URL.createObjectURL(file);
        let val = data.filter((node) => {
          return node.getAttribute("data-information") === prop.name;
        });
        val.forEach((img) => (img.src = imageUrl));
      }
    });
  }
});
