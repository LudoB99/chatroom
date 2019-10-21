<?php

use Models\Brokers\ServerBroker;
use Zephyrus\Application\Session;
use function Clue\StreamFilter\append;

$method = $_REQUEST["method"];

switch ($method) {
    case 1 :  updateOnlineUsers(); break;
    case 2 :  updateServerList(); break;
    case 3 :  addMessageToServer(); break;
    case 4 :  getMessagesFromServer(); break;
    case 5 :  adduserToServer(); break;
}

function addUserToServer()
{
    $username = $_REQUEST['userName'];
    $serverName = $_REQUEST['serverName'];
    $broker = new ServerBroker();
    $userID = $broker->getIdByUsername($username);
    $serverID = $broker->selectServerIdByName($serverName);
    $broker->addUserToServer($userID, $serverID);
}

function getMessagesFromServer()
{
    $server = $_REQUEST["server"];
    $broker = new ServerBroker();
    $messages = $broker->getMessages($server);
    echo json_encode($messages);
}

function addMessageToServer()
{
    $server = $_REQUEST["server"];
    $message = $_REQUEST["message"];
    $broker = new ServerBroker();
    $broker->sendMessage($server, $message);
    echo "message: " . $message . " ... has been sent.";
}

function updateServerList()
{
    $broker = new serverBroker();
    $onlineServers = $broker->selectServers();
    echo json_encode($onlineServers);
}

function updateOnlineUsers()
{
    $serverName = $_REQUEST["serverName"];
    $broker = new serverBroker();
    $serverID = $broker->selectServerIdByName($serverName);
    $onlineUsers = $broker->selectUsersIn($serverID);
    echo json_encode($onlineUsers);
}