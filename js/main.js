<!--//DATE AND TIME PICKER FUNCTION//--!>
$(document).ready(function() {
  $('#datetimepicker').datetimepicker({
        format: 'dd/MM/yyyy hh:mm:ss',
        language: 'pt-BR'
      });
});

<!-- Firebase support -->
var myDataRef = new Firebase('https://tastyplanetse.firebaseio.com/');