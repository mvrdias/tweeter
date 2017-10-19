// alert('Hello !!!!');

$(function(){
  let textarea = $('.new-tweet textarea');
  const characterLimit = 140;
  textarea.on('input', function (event) {
    // console.log('textarea event:', event.type);
    // console.log('this:', this);
    //console.log('textarea content length:', $(this).val().length);
    let remainingLimit = characterLimit - $(this).val().length;
    //console.log('remaining characters limit:', remainingLimit);
    $(this).parent().find('.counter').text(remainingLimit);
    if (remainingLimit < 0) {
            $(this).parent().find('.counter').css('color', 'red');

     }
  });
  // console.log('textarea:', textarea);
});


// function contarCaracteres(box,valor,campospan){
//  var conta = valor - box.length;
//  document.getElementById(campospan).innerHTML = "Você ainda pode digitar " + conta + " caracteres";
//  if(box.length >= valor){
//  document.getElementById(campospan).innerHTML = "Opss.. você não pode mais digitar..";
//  document.getElementById("campo").value = document.getElementById("campo").value.substr(0,valor);
//  }
// }