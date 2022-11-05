const dowImg = document.querySelector(".dow-image");
const fileName = document.querySelector(".file-name");
const defaultBtn = document.querySelector("#default-btn");
const customBtn = document.querySelector("#custom-btn");
const cancelBtn = document.querySelector("#cancel-btn i");
const loadLogo = document.querySelector("#load-logo");
let regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
function defaultBtnActive(){
  defaultBtn.click();
}
defaultBtn.addEventListener("change", function(){
  const file = this.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = function(){
      const result = reader.result;
      loadLogo.src = result;
      dowImg.classList.add("active");
    }
    cancelBtn.addEventListener("click", function(){
      loadLogo.src = "";
      dowImg.classList.remove("active");
    })
    reader.readAsDataURL(file);
  }
  if(this.value){
    let valueStore = this.value.match(regExp);
    fileName.textContent = valueStore;
  }
});
