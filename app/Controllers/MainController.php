<?php namespace Controllers;


use Zephyrus\Application\Session;

class MainController extends SecurityController
{
    public function initializeRoutes()
    {
        $this->get("/accueil", "renderMain");
        $this->get("/logout", "logMeOut");
    }

    public function renderMain()
    {
        $user = (object) array("username" => "monsieurTest", "sex" => "Homme", "color" => "Bleu", "age" => "22" ); //DUMMY USER
        return $this->render("index", ["title" => "Chatroom", "user" => $user]);
    }

    public function logMeOut()
    {
        Session::getInstance()->destroy();
        return $this->redirect("/");
    }

}