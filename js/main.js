$(document).ready(function() {



$("#removeTodo").click(function confirmation(){
  var answer = confirm("Are you sure you want to delete?")
    if (answer){
      $("li").remove();
    }
    else{
      alert("Good choice")
    }
});

$('#datetimepicker').datetimepicker({
        format: 'dd/MM/yyyy hh:mm:ss',
        language: 'pt-BR'
      });



});


