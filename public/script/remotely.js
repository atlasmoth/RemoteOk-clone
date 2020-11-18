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
        } else if (
          source.getAttribute("data-information") === "jobDescription"
        ) {
          let val = data.filter((node) => {
            return node.getAttribute("data-information") === prop.name;
          });
          val.forEach((node) => {
            node.innerHTML = marked(e.target.value);
          });
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

const stripe = Stripe(
  "pk_test_51HLV5FE5bGjCBEBnb3nIZF8b8wxWp3pLRWgtvfpUoPWBcjb53lvXG3M399Jb48ZRvw4c3eO4YR4sP7LkXUfmCvlj00HPBBdQBL"
);
const elements = stripe.elements();

const style = {
  base: {
    fontSize: "16px",
    color: "#32325d",
  },
};

const card = elements.create("card", { style });

card.mount("#card-element");

const stripeTokenHandler = (token) => {
  // Insert the token ID into the form so it gets submitted to the server
  const form = document.getElementById("payment-form");
  const hiddenInput = document.createElement("input");
  hiddenInput.setAttribute("type", "hidden");
  hiddenInput.setAttribute("name", "stripeToken");
  hiddenInput.setAttribute("value", token.id);
  form.appendChild(hiddenInput);

  // Submit the form
  form.submit();
};

const form = document.getElementById("payment-form");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const { token } = await stripe.createToken(card);

  // Send the token to your server.
  stripeTokenHandler(token);
});
