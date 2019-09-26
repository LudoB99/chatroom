<?php namespace Controllers;


class LoginController extends SecurityController
{
    public function initializeRoutes()
    {
        $this->get("/", "renderLogin");
    }

    public function renderLogin()
    {
        return $this->render("login", ["title" => "Chatroom - Login"]);
    }
}