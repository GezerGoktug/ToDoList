//! DOM ACCESS
const todoinput = document.getElementById("todos");
const todobutton = document.getElementById("todosbtn");
const todolist = document.getElementById("todoslist");
const btnClearDOM = document.querySelector("#clear");
//! DOM ACCESS

let todos = []; //! Todoları saklamak için dizi

//! todo class:Todo nesnesi oluşturan class

class todo {
  constructor(todolistid, todolistvalue) {
    this.todolistid = todolistid;
    this.todolistvalue = todolistvalue;
  }
}

//! UI class: Kullanıcı arayüzünü güncelleyen static metotlar içeren class
class UI {
  //! TODO SİLME METODU: Kullanıcıdan alınan todo ID'sine göre todo'yu siler
  static clear(e) {
    let btnID = e.target.dataset.id;
    UI.alert(`${e.target.value} listeden silindi.`);
    e.target.parentElement.parentElement.remove();
    UI.removeTodoArr(btnID); //! Diziden todo'yu kaldır
    const data = {
      todos,
    };
    UI.display();
    localStorage.setItem("data", JSON.stringify(data)); //!Veriyi localStorage'a kaydet
  }
  //! TODO LİSTESİNİ GÖSTERME METODU: Todos dizisindeki verileri alarak arayüzü günceller.
  static display() {
    let result = "";
    if (todos.length === 0) {
      todolist.innerHTML = "Liste boş";
    } else {
      todos.forEach((item) => {
        result += `<div id="todolist"  class="d-flex flex justify-content-between align-items-center p-3" > <div>${item.todolistvalue}</div>
        <div class="d-flex gap-2"><button data-id="${item.todolistid}" onclick="update(event)" class="btn btn-outline-danger w-100 fs-4  my-2 " >Update</button><button data-id="${item.todolistid}" value="${item.todolistvalue}" class="btn btn-outline-danger w-100 fs-2 my-2 " onclick="UI.clear(event)">Sil</button></div></div>
        </div>`;
      });
      todolist.innerHTML = result;
    }
  }
  //! TODO'YU DİZİDEN KALDIRMA METODU: Belirtilen ID'ye sahip todo'yu diziden kaldırır.

  static removeTodoArr(id) {
    todos = todos.filter((item) => item.todolistid != id);
  }
  //! TODO LİSTESİNİ TEMİZLEME METODU: Tüm todo'ları temizler ve arayüzü günceller.

  static clearTodoList() {
    todos = [];
    UI.display();
    localStorage.removeItem("data"); //!Local storage dan veriyi siler.
  }
   //! TODO LİSTESİNİ GÜNCELLEME METODU:  Seçilen todoyu inputtan aldığı value ya göre  günceller.
  static updateToDoObject(e){
  e.preventDefault();
  if(todoinput.value==""){
  UI.alert("Please enter one todo ");
  return;
  }

  todos.forEach((item)=>{
  if(item.todolistid==e.target.dataset.id){
    UI.alert(`${item.todolistvalue} updated.`);
    item.todolistvalue=todoinput.value;
  }
  });
  const data = {
  todos,
  };
  UI.display();
  localStorage.setItem("data", JSON.stringify(data)); //!Veriyi localStorage'a kaydet

  }
  //! KULLANICI BİLDİRİMİ METODU: Kullanıcıya bildirim gösterir.
  static alert(message) {
    window.alert(message);
  }
}
//! SAYFA YÜKLENDİĞİNDE kaydedilmiş veriyi yükler.
window.addEventListener("load", () => {
  const savedData = JSON.parse(localStorage.getItem("data"));
  if (savedData) {
    todos = savedData.todos;
  }
  UI.display();
});
//! LİSTEYİ TEMİZLEME BUTONUNA TIKLANDIĞINDA: Listeyi temizle ve bildirim göster

btnClearDOM.addEventListener("click", (e) => {
  e.preventDefault();
  UI.alert("Liste temizlendi");
  UI.clearTodoList();
});
//! TODO EKLEME BUTONUNA TIKLANDIĞINDA: Yeni todo ekleyerek arayüzü güncelle

todobutton.addEventListener("click", (e) => {
  e.preventDefault();
  let todoid = todos.length + 1;
  let todovalue = todoinput.value;
  if (todovalue==""){
  UI.alert("Please enter one todo.");
  return;
  }
  const todoslist = new todo(todoid, todovalue);
  todos.push(todoslist);
  UI.display();
  UI.alert(`${todovalue} eklendi`);
  //console.log(todos);
  const data = {
    todos,
  };
  localStorage.setItem("data", JSON.stringify(data));
});

 const update=(e)=>{UI.updateToDoObject(e)};