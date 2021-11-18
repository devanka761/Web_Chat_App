/////////////////////////////////////////////////////////////////////////////////////////////
/// INI PENGATURAN MODEL PENGIRIMAN PESAN - SILAKAN CUSTOM REFERENSINYA
/////////////////////////////////////////////////////////////////////////////////////////////
setInterval(() => {
    document.querySelector(".message-body").style.height =
      window.innerHeight - 110 + "px";
  }, 100);
  var me = userMe;
      document
        .querySelector(".message-input")
        .addEventListener("keypress", (e) => {
          if (e.key === "Enter") {
            firebase.database().ref("Chat").push({
                user: me,
                msg: document.querySelector(".message-input, .imageFile").value.trim().replace(/</g, "&lt;"),
              });
            document.querySelector(".message-input").value = "";
            }
        });
      var id = "";
      firebase.database().ref("Chat").on("child_added", (s) => {
          document.querySelector(".loader").style.opacity = "0";
          if (s.val().user === me) {
            if (id !== s.val().user)
            // DI BAWAH INI BISA GANTI MODELNYA SESUKA HATI (JANGAN LUPA SESUAIKAN JUGA CSSNYA)
              document.querySelector(".message-body").innerHTML +=
                '<div class="my-name">Kamu</div><div class="message-holder"><div class="my-text" onclick="deleteMsg(\'' +
                s.key +"')\" id=" +s.key +" >" +s.val().msg +
                "</div></div>";
            else
              document.querySelector(".message-body").innerHTML +=
                '<div class="message-holder"><div class="my-text" onclick="deleteMsg(\'' +
                s.key +"')\" id=" +s.key +">" +s.val().msg +
                "</div></div>";
          } else {
            if (id !== s.val().user)
              document.querySelector(".message-body").innerHTML +=
                '<div class="their-name">' +s.val().user +'</div><div class="message-holder"><div class="their-text" id=' +
                s.key +">" +s.val().msg +
                "</div></div>";
            else
              document.querySelector(".message-body").innerHTML +=
                '<div class="message-holder"><div class="their-text" id=' +
                s.key +">" +s.val().msg +
                "</div></div>";
          }
          document.querySelector(".message-body").scrollBy(0, 1000);
          id = s.val().user;
          firebase.database().ref("Chat/" + s.key).on("child_changed", (s) => {
              document.querySelector("#" + s.key).innerHTML =
                `<i font-weight: bolder;'>Pesan telah dihapus</i>`;
            });
        });
        function deleteMsg(key) {
          console.log(key);
          swal({
            title: "Apa kamu yakin?",
            text: "Pesan tidak dapat kembali ketika dihapus!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((e) => {
            // DI BAWAH INI BISA GANTI MODELNYA SESUKA HATI (JANGAN LUPA SESUAIKAN JUGA CSSNYA)
            if (e)
              firebase.database().ref("Chat/" + key).set({ 
                user: me,
                msg: `<i font-weight: bolder;'>Pesan telah dihapus</i>`
              });
          });
        }
/////////////////////////////////////////////////////////////////////////////////////////////
/// INI BUAT KIRIM GAMBAR - SILAKAN CUSTOM REFERENSINYA
/////////////////////////////////////////////////////////////////////////////////////////////

function pilihGambar(){
  document.getElementById('imageFile').click();
}
function SendImage(event){
  var file = event.files[0];
  if(!file.type.match("image.*")){
    alert("Tolong pilih file tipe gambar ya")
  }
  else{
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      firebase.database().ref("Chat").push({
              user: me,
              msg: '<img src="'+reader.result+'"/>'
            });
    }, false);
    if(file){
      reader.readAsDataURL(file);
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////
/// INI BUAT KIRIM REKAMAN SUARA - SILAKAN CUSTOM REFERENSINYA
///////////////////////////////////////////////////////////////////////////////////////////// 
let chunks = [];
let recorder;
var timeout;
function record(control) {
    let device = navigator.mediaDevices.getUserMedia({ audio: true });
    device.then(stream => {
        if (recorder === undefined) {
            recorder = new MediaRecorder(stream);
            recorder.ondataavailable = e => {
                chunks.push(e.data);

                if (recorder.state === 'inactive') {
                    let blob = new Blob(chunks, { type: 'audio/webm' });
                    var reader = new FileReader();
                    reader.addEventListener("load", function () {
                        firebase.database().ref("Chat").push({
                            user: me,
                            msg: `<p class="deskripsi">Rekaman Suara</p><audio controls controlsList="nodownload">
                                  <source src="`+reader.result+`" type="video/webm" />
                                  </audio>`
                        });
                    }, false);

                    reader.readAsDataURL(blob);
                }
            }
            recorder.start();
            control.setAttribute('class', 'stop');
        }
    });
    if (recorder !== undefined) {
        if (control.getAttribute('class').indexOf('stop') !== -1) {
            recorder.stop();
            control.setAttribute('class', 'fa fa-microphone');
        }
        else {
            chunks = [];
            recorder.start();
            control.setAttribute('class', 'stop');
        }
    }
}
/////////////////////////////////////////////////////////////////////////////////////////////
/// INI BUAT KIRIM AUDIO FILE - SILAKAN CUSTOM REFERENSINYA
/////////////////////////////////////////////////////////////////////////////////////////////
function pilihAudio(){
  document.getElementById('audioFile').click();
}
function SendAudio(event){
  var file = event.files[0];
  if(!file.type.match("audio.*")){
    alert("Tolong pilih file tipe audio ya")
  }
  else{
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      firebase.database().ref("Chat").push({
              user: me,
              msg: `<p class="deskripsi">Audio File</p><audio controls controlsList="nodownload">
                    <source src="`+reader.result+`" type="video/webm" />
                    </audio>`
            });
    }, false);
    if(file){
      reader.readAsDataURL(file);
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////
/// INI BUAT KIRIM VIDEO - SILAKAN CUSTOM REFERENSINYA
/////////////////////////////////////////////////////////////////////////////////////////////
function pilihVideo(){
  document.getElementById('videoFile').click();
}
function SendVideo(event){
  var file = event.files[0];
  if(!file.type.match("video.*")){
    alert("Tolong pilih file tipe video ya")
  }
  else{
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      firebase.database().ref("Chat").push({
              user: me,
              msg: `<video controls controlsList="nodownload"><source src="`+reader.result+`" type="video/mp4">Gagal memuat video.</video>`
            });
    }, false);
    if(file){
      reader.readAsDataURL(file);
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////
/// INI BUAT MENU MENU DROPDOWN
/////////////////////////////////////////////////////////////////////////////////////////////
function menu() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('#bukak')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////
/// INI BUAT RELOAD - OPSIONAL (BISA DIHAPUS JUGA PADA HTML DAN CSS)
/////////////////////////////////////////////////////////////////////////////////////////////
function refresh() {
  window.location.reload();
}
/////////////////////////////////////////////////////////////////////////////////////////////
/// INI BUAT TOOGLE MODE GELAP DAN TERANG
/////////////////////////////////////////////////////////////////////////////////////////////
function tema() {
  const body = document.querySelector('body');
  body.classList.toggle('gelap')
}