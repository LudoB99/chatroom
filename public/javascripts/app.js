// MAIN


var serverName = "Général";
var input = "";
var message = "";

$( document ).ready(function () {
    setUpModal();
    updateClicks();
    let userName = $("#userName");
    $("#inputText").keyup(function(event) {
        let key  = (event.keyCode ? event.keyCode : event.which);
        let input = $("#inputText");
        if (key === 13) {
            let text = input.val();
            if (text === "") {
                return;
            }
            input.val("");
            let timestamp = new Date().toLocaleTimeString();
            message = "(" + timestamp + ") " + userName.text() + ": " + text;
            sendUserMessagesToServer();
            message = "";
        }
    });
});

function pollServer() {
    chatPoll();
    restPoll();
}

// UPDATE

function updateLists() {
    updateUsersList();
    updateServerList();
}

function updateClicks() {
    $("li").on('click', function (event) {
        event.preventDefault();
        changeServer(event.target);
    });
}


// CHAT LIST

function updateChatList(){
    getMessagesFromServer();
}

function getMessagesFromServer() {
    $.ajax({
        url: ("server?method=4&server=" + serverName),
        context: document.body
    }).done(function (messages) {
        let chat = $("#chat")[0];
        let response = JSON.parse(messages);
        while( chat.firstChild ){
            chat.removeChild( chat.firstChild ); //Clear the list for update
        }
        for (let i = 0; i < response.length; i++) {
            let message = response[i].messages;
            let li = $("<li>" + message + "</li>");
            chat.append(li[0]);
        }
        updateScroll();
    });
}

function sendUserMessagesToServer(){
    if(message.length !== 0){
        $.ajax({
            url: "server?method=3&message=" + message +"&server=" + serverName,
            context: document.body
        });
    }
}

// SERVER LIST

function updateServerList() {
    $.ajax({
        url: "server?method=2",
        context: document.body
    }).done(function(onlineServers) {
        populateServerList(JSON.parse(onlineServers));
        updateClicks();
    });
}

function changeServer(newServerName) {
    if(true){ //Vérification mot de passe / age
        serverName = trimName(newServerName.textContent);
        addUserToServer(serverName);
        $("#serverName").html(serverName);
        let chat = $("#chat");
        while(chat.firstChild ){
            chat.removeChild( chat.firstChild );
        }
    }
}

function addUserToServer(newServerName) {
    $.ajax({
        url: "server?method=5&serverName=" + newServerName,
        context: document.body
    });
}

function populateServerList(onlineServers) {
    let list = $("#onlineServers")[0];
    let counter = $("#serverCounter");
    counter.html("Il y a " + onlineServers.length + " serveurs disponibles.");
    while (list.firstChild) {
        list.removeChild(list.firstChild); //Clear the list for update
    }
    for(let i = 0; i < onlineServers.length; i++) {
        let server = onlineServers[i];
        let text = server.name;
        text += server.minAge === "" ? "" : " (" + server.minAge + "+)";
        let li = $("<li>" + text + "</li>");
        list.append(li[0]);
    }
}

// ONLINE USERS

function updateUsersList() {
    $.ajax({
       url: "server?method=1&serverName=" + serverName,
        context: document.body
    }).done(function (onlineUsers) {
        populateUserList(JSON.parse(onlineUsers));
    });
}

function populateUserList(onlineUsers) {
    let list = $("#onlineUsers")[0];
    let counter = $("#onlineCounter");
    counter.html("Il y a " + onlineUsers.length + " utilisateurs dans la salle.");
    while( list.firstChild ){
        list.removeChild( list.firstChild ); //Clear the list for update
    }
    for(let i = 0; i < onlineUsers.length; i++) {
        let user = onlineUsers[i];
        let li = $("<li>" + user.username + "</li>");
        li.css('color', '#' + user.color);
        list.append(li[0]);
    }
}

// POLLING (MODIFIABLE SELON SI ÇA EXPLOSE OU NON...)

function restPoll() {
    setInterval("updateLists()", 1000);
}

function chatPoll() {
    setInterval("updateChatList()", 1000);
}

//  CHAT SCROLL

function updateScroll() {
    var chat = $('#chat')[0];
    chat.scrollTop = chat.scrollHeight;
}

// MODAL

function setUpModal() {



    $("#myBtn").on('click',  function() {
        $("#myModal").css('display', 'block');
    });

    $(window).on('click', function(event) {
        if (event.target == $("#myModal")[0]) {
            $("#myModal").css('display', 'none');
        }
    });
}

// OTHER

function trimName(str){
    if ((str===null) || (str==='')){
        return false;
    }
    return str.substr(0, str.length - 5);
}

