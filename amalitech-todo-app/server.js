let toggler =  document.querySelector(".toggler")


toggler.addEventListener("click",changeMode);

function changeMode(){
    document.documentElement.classList.toggle("dark-mode")
    toggler.classList.toggle("dark")
}