let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});



const toyCollection = document.getElementById("toy-collection")

const grabAllToys = async () => {
  let req = await fetch("http://localhost:3000/toys")
  let res = await req.json()

  res.forEach(toy => renderToys(toy))
}




const renderToys = (toy) => {
  let div = document.createElement("div")
  div.classList.add("card")
  let img = document.createElement("img")
  img.src = toy.image
  img.classList.add("toy-avatar")
  let h2 = document.createElement("h2")
  h2.textContent = toy.name
  let p = document.createElement("p")
  p.textContent = toy.likes + " likes"
  let btn = document.createElement("button")
  btn.textContent = "like ❤️"
  btn.addEventListener("click", async () => {
    toy.likes = toy.likes + 1
    p.textContent = toy.likes + " likes"

    let req = await fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        likes: toy.likes
      })
    })
  })

  btn.classList.add("like-btn")
  toyCollection.append(div)
  div.append(h2, img, p, btn)
}

const form = document.getElementById("form")



form.addEventListener("submit", async (e) => {
  e.preventDefault()
  const formData = {
    name: form.name.value,
    image: form.image.value,
    likes: 0
  }
  let req = await fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)

  })
  const res = await req.json();
  renderToys(res);
})


// const likeButton = document.getElementsByClassName("like-btn")


// fetch(`http://localhost:3000/toys/${selectedToy}`, {
//   method: "PATCH",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     likes: toy.likes
//   })
// })



grabAllToys();