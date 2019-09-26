<?php namespace Controllers;


class MainController extends SecurityController
{
    public function initializeRoutes()
    {
        $this->get("/accueil", "renderMain");
    }

    public function renderMain()
    {
        $this->render("index", ["title" => "Chatroom"]);
    }

}