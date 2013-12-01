var username;
function ConnectToChat() {
    var messages = [];
    var socket = io.connect();
    var field = document.getElementById("messageInput");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("messages");

    socket.on('message', function (data) {
        console.log(data);
        if(data.message) {
            messages.push([data.username, data.message]);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += messages[i][0] +": " + messages[i][1] + '<br />';
            }
            content.innerHTML = html;
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

jQuery(document).ready(function($) {
    $('#modalUsername').modal('show');
    $("#username").focus();
    $("#usernameForm").submit(function(e){
        e.preventDefault(); //Prevent default of form (which is to postback)
        var currentUserName = $("#username").val();
        if(currentUserName != "")
        {
            // debugger;
            username = $("#username").val();
            $('#modalUsername').modal('hide');
            ConnectToChat();
            $("#messageInput").focus();
        }
    });
});