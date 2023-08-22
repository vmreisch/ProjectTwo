console.log("Blending for life");

let order = {
  smoothies: [],
};

const allButtons = document.querySelectorAll(".addToOrderBtn");

allButtons?.forEach((button) => {
  button.addEventListener("click", (e) => {
    const smoothieId = e.srcElement.id;
    order.smoothies.push(smoothieId);
  });
});

const submit = document.querySelector("#submit");

submit.addEventListener("click", async (e) => {
  let res = await fetch("/smoothie/order", {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json",
    },
  });
  let response = await res.json();
  if (response) {
    order = {
      smoothies: [],
    };
    window.location = `/smoothie/order/${response._id}`;
  }
});
