window.setTimeout(() => {
  const buttom = document.querySelectorAll("#buttomId");
    const form = document.querySelector("#formEdit")
    buttom.forEach((buttons)=>{
        buttons.addEventListener("click",()=>{
            form.setAttribute("action", `/row-edit/${buttons.value}`)
        })
    })

},1000);
