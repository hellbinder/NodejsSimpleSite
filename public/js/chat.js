var username, currentUserName, socket;
function ConnectToChat() {
    var messages = [];
    socket = io.connect();
    var field = document.getElementById("messageInput");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("chatEntries");

    socket.on('message', function (data) {
        console.log(data);
        if(data.message) {;
            CreateMessage(data.username, data.message);
            $(content).animate({
                scrollTop: content.scrollHeight
            });
        } else {
            console.log("There is a problem:", data);
        }
    });
 
    $("#messageForm").on("submit", function(e)
    {
        e.preventDefault();
        var text = field.value;
        var fromUser = username;
        field.value = "";
        field.focus();
        console.log("sending " + text);
        socket.emit('send', { username: fromUser, message: text });
    });
    // for (var i = 0; i <= 30; i++) {
        socket.emit('send', {username: "Server", message: 'The user ' + username + ' has connected!' });
    // };

}

$(document).ready(function() {
  //Event triggered when modal is shown
  $('#usernameModal').on('shown.bs.modal', function(){
    $("#username").focus();
  });
  $('#usernameModal').modal('show');
  $("#usernameForm").submit(function(e){
    e.preventDefault(); //Prevent default of form (which is to postback)
    currentUserName = $("#username").val();
    if(currentUserName != "")
      {
        // debugger;
        username = $("#username").val();
        $('#usernameModal').modal('hide');
        ConnectToChat();
        $("#messageInput").focus();
      }
  });

  //Do for testing
  SetUpInitalLogin();

  //Put custom scrollbar
  // NOT WORKING
   //$("#chatEntries").mCustomScrollbar();

});

function CreateMessage(username, message)
{
    var userMessage = $('<li class="message" style="display:none"><strong>' + username + '</strong>: ' + message + '</li>');
    var messageClass;
    switch(username)
    {
      case "Server":
        messageClass = "messageServer"
        break;
      case currentUserName:
        messageClass = "messageSelf"
        break;
      default:
        messageClass = "messageOther"
    }
    userMessage.addClass(messageClass);
    $("#messages ul").append(userMessage);
    userMessage.fadeIn();
}

function SetUpInitalLogin () {
  $("#username").val("Mickey");
  $("#btnUsername").trigger("click");
  socket.emit('send', { username: "Mickey", message: "WAZAAAAAAAAA" });
  socket.emit('send', { username: "Hilox", message: "Well this is working. For now." });
  socket.emit('send', { username: "Berthlax", message: 'Well as it should. DUH' });
  socket.emit('send', { username: "Hilox", message: "No it shouldnt!. THIS IS A TEST!" });
  socket.emit('send', { username: "Mickey", message: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fama timiditatem habeatur epicuri percipitur nemore attingere sequitur quidem fecisse "});
}