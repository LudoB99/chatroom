<?php namespace Controllers;

use Models\Brokers\serverBroker;
use Zephyrus\Application\Form;
use Zephyrus\Application\Session;

class MainController extends SecurityController
{
    public function initializeRoutes()
    {
        $this->get("/accueil", "renderMain");
        $this->get("/logout", "logMeOut");
        $this->get("/server", "refresh");
        $this->post("/accueil", "createServer");
    }

    public function refresh()
    {
        return $this->render("server");
    }

    public function renderMain()
    {
        $user = Session::getInstance()->read("user");
        return $this->render("index", ["title" => "Chatroom", "user" => $user]);
    }

    public function createServer()
    {
        $user = Session::getInstance()->read("user");
        $form = $this->buildForm();
        $server = $this->generateServer($form);
        $broker = new serverBroker();
        $broker->createServer($server, $user->id);
        $serverID = $broker->selectServerIdByName($server->name);
        $broker->addUserToServer($user->id, $serverID);
        return $this->renderMain();
    }

    public function generateServer(Form $form) : \stdClass
    {
        $name = $form->getValue("sName");
        $pass = hash("sha256", $form->getValue("sPass"));
        $age = $form->getValue("sAge");
        $max = $form->getValue("sMax");

        $server = (object) array(
            "name" => $name,
            "pass" => $pass,
            "age" => $age,
            "max" => $max
        );
        return $server;
    }

    public function logMeOut()
    {
        $user = Session::getInstance()->read("user");
        $broker = new serverBroker();
        $broker->removeUserFromServer($user->id);
        $broker->deleteUser($user->id);
        Session::getInstance()->destroy();
        return $this->redirect("/");
    }

}