var hasil = document.getElementById('hasil');
var submit = document.getElementById('submit');
submit.onclick = ambilNilai;
console.log(submit)

function ambilNilai(){
    var text = document.getElementById('input').vlaue;
    hasil.innerHTML = text;
}