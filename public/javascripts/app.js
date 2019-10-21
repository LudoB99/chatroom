// MAIN


var serverName = "Général";
var userName = "";
var firstLog = true;
var input = "";
var message = "";

document.onreadystatechange = function () {
    setUpModal();
    updateClicks();
    userName = document.getElementById("userName").textContent;

    input = document.getElementById("inputText");
    input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            let text = input.value;
            if(text === ""){
                return;
            }
            input.value = '';
            let timestamp = new Date().toLocaleTimeString();
            fullText = "(" + timestamp + ") " + userName + ": " + text;
            message = fullText;
            sendUserMessagesToServer();
            message = "";
        }
    });
};

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
    document.addEventListener('click', function (event) {
        if (!event.target.matches('#onlineServers li')) return;
        event.preventDefault();
        changeServer(event.target);
    }, false);
}


// CHAT LIST

function updateChatList(){
    getMessagesFromServer();
}

function getMessagesFromServer() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            let chat = document.getElementById("chat");
            let response = JSON.parse(this.response);
            if(!firstLog){
                while(chat.firstChild ){
                    chat.removeChild( chat.firstChild ); //Clear the list for update
                }
            }
            firstLog = false;
            for(let i = 0; i < response.length; i++) {
                let message = response[i];
                let li = document.createElement("li");
                let text = message.messages;
                li.appendChild(document.createTextNode(text));
                chat.appendChild(li);
            }
            updateScroll();
        }
    };
    let url = "server?method=4&server=" + serverName;
    req.open("GET", url);
    req.send();
}

function sendUserMessagesToServer(){
    if(message === ""){
        return;
    }
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
        }
    };
    let url = "server?method=3&message=" + message
        +"&server=" + serverName;
    req.open("GET", url);
    req.send();
}

// SERVER LIST

function updateServerList() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            let onlineServers = this.response;
            populateServerList(JSON.parse(onlineServers));
            updateClicks();
        }
    };
    let url = "server?method=2";
    req.open("GET", url);
    req.send();
}

function changeServer(newServerName) {
    if(true){ //Vérification mot de passe / age
        addUserToServer(newServerName);
        serverName = trimName(newServerName.textContent);
        document.getElementById("serverName").innerHTML = serverName;
        let chat = document.getElementById("chat");
        while(chat.firstChild ){
            chat.removeChild( chat.firstChild );
        }
    }
}

function addUserToServer(newServerName) {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
        }
    };
    req.open("GET", "server?method=5&serverName=" + newServerName + "&userName=" + userName);
    req.send();
}

function populateServerList(onlineServers) {
    let list = document.getElementById("onlineServers");
    let counter = document.getElementById("serverCounter");
    counter.innerHTML = "Il y a " + onlineServers.length + " serveurs disponibles.";
    while( list.firstChild ){
        list.removeChild( list.firstChild ); //Clear the list for update
    }

    for(let i = 0; i < onlineServers.length; i++) {
        let server = onlineServers[i];
        let li = document.createElement("li");
        let text = server.name;
        text += server.minAge === "" ? "" : " (" + server.minAge + "+)";
        li.appendChild(document.createTextNode(text));
        list.appendChild(li);
    }
}

// ONLINE USERS

function updateUsersList() {
    let req = new XMLHttpRequest();
    req.onreadystatechange = function () {
        if (req.readyState === 4 && req.status === 200) {
            let onlineUsers = this.response;
            populateUserList(JSON.parse(onlineUsers));
        }
    };
    req.open("GET", "server?method=1&serverName=" + serverName);
    req.send();
}

function populateUserList(onlineUsers) {
    let list = document.getElementById("onlineUsers");
    let counter = document.getElementById("onlineCounter");
    counter.innerHTML = "Il y a " + onlineUsers.length + " utilisateurs dans la salle.";
    while( list.firstChild ){
        list.removeChild( list.firstChild ); //Clear the list for update
    }
    for(let i = 0; i < onlineUsers.length; i++) {
        let user = onlineUsers[i];
        let li = document.createElement("li");
        let tooltip = document.createElement("span");
        let tooltiptext = (" " + user.age + "/" + user.sex);
        li.appendChild(document.createTextNode(user.username));
        tooltip.appendChild(document.createTextNode(tooltiptext));
        li.appendChild(tooltip);
        li.style.color = "#" + user.color;
        //li.classList.add("tooltip");
        tooltip.setAttribute("class", "tooltiptext");
        list.appendChild(li);
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
    var element = document.getElementById("chat");
    element.scrollTop = element.scrollHeight;
}

// MODAL

function setUpModal() {

    var modal = document.getElementById("myModal");
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    };

    span.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
}

// OTHER

function trimName(str){
    if ((str===null) || (str==='')){
        return false;
    }
    return str.substr(0, str.length - 5);
}

