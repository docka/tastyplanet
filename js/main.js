<!--//DATE AND TIME PICKER FUNCTION//--!>
$(document).ready(function() {
  $('#datetimepicker').datetimepicker({
        format: 'dd/MM/yyyy hh:mm:ss',
        language: 'pt-BR'
      });
});

<!-- Firebase support -->
var myDataRef = new Firebase('https://tastyplanetse.firebaseio.com/');
$('#messageInput').keypress(function (e) {
        if (e.keyCode == 13) {
          var name = $('#nameInput').val();
          var text = $('#messageInput').val();
          myDataRef.push({name: name, text: text});
          $('#messageInput').val('');
        }
      });
      myDataRef.on('child_added', function(snapshot) {
        [MESSAGE CALLBACK CODE GOES HERE]
      });
      function displayChatMessage(name, text) {
        $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
        $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
      };