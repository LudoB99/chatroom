<?php


namespace Models\Brokers;

class serverBroker extends \Zephyrus\Database\Broker
{
    public function insertTempUser($user)
    {
        $sql = "INSERT INTO `User` VALUES (DEFAULT, ?,?,?,?) ";
        $this->query($sql, [
            $user->username,
            $user->sex,
            $user->color,
            $user->age
        ]);
        $id = $this->getIdByUsername($user->username);
        $sql = "INSERT INTO `UserServer` VALUES (?, ?)";
        $this->query($sql, [$id, 3]); //GENERAL CHANNEL
        return $id;
    }

    public function getMessages($server)
    {
        $serverId = $this->selectServerIdByName($server);
        $sql = "SELECT `messages` FROM `Logs` where serverID = ? ";
        $response =  $this->select($sql, [$serverId]);
        return $response;
    }

    public function sendMessage($server, $message)
    {
        $serverId = $this->selectServerIdByName($server);
        $sql = "INSERT INTO `Logs` VALUES(?,?)";
        $this->query($sql, [$serverId,$message]);
    }

    public function selectServers()
    {
        $sql = "SELECT * FROM `Server`";
        return $this->select($sql);
    }

    public function selectServerIdByName($name)
    {
        $sql = "SELECT `id` FROM `Server` WHERE `name` = ?";
        $id =  $this->selectSingle($sql, [$name]);
        return $id->id;
    }

    public function selectUsersIn($serverID)
    {
        $sql = "SELECT * FROM `User` WHERE `id` IN ( SELECT `userID` FROM `UserServer` WHERE `serverID` = ?) ";
        return $this->select($sql, [$serverID]);
    }

    public function selectUserById($id)
    {
        $sql = "SELECT * FROM `User` WHERE `id` = ?";
        $user = $this->selectSingle($sql, [$id]);
        return $user;
    }

    public function addUserToServer($userId, $serverId)
    {
        $sql = "INSERT INTO `UserServer` VALUES(?,?) ";
        $this->query($sql, [$userId, $serverId]);
    }

    public function removeUserFromServer($userId)
    {
        $sql = "DELETE FROM `UserServer` WHERE `userID` = ?";
        $this->query($sql, [$userId]);
    }

    public function getIdByUsername($username)
    {
        $sql = "SELECT `id` FROM `User` WHERE `username` = ?";
        $id = $this->selectSingle($sql, [$username]);
        return $id->id;
    }

    public function getUsernameById($id)
    {
        $sql = "SELECT `username` FROM `User` WHERE `id` = ?";
        $username = $this->selectSingle($sql, [$id]);
        return $username->username;
    }

    public function isUsernameAvailable($username)
    {
        $sql = "SELECT * FROM `User` WHERE `username` = ? ";
        return is_null($this->selectSingle($sql, [$username]));
    }

    public function deleteUser($id)
    {
        $sql = "DELETE FROM User WHERE `id` = ?";
        $this->query($sql, [$id]);
    }

    public function createServer($server, $userID)
    {
        $sql = "INSERT INTO `Server` VALUES (DEFAULT,?,?,?,?) ";
        $this->query($sql, [
            $server->name,
            $server->age,
            $server->pass,
            $server->max
        ]);
    }
}