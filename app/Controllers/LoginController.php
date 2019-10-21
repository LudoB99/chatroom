<?php namespace Controllers;

use Models\Brokers\serverBroker;
use Zephyrus\Application\Flash;
use Zephyrus\Application\Form;
use Zephyrus\Application\Session;

class LoginController extends SecurityController
{
    public function initializeRoutes()
    {
        $this->get("/", "renderLogin");
        $this->post("/", "logIn");
    }

    public function logIn()
    {
        $form = $this->buildForm();
        $userID = $this->createUser($form);
        if(!is_null($userID))
        {
            Session::getInstance()->set("userID", $userID);
            return $this->redirect("/accueil");
        }
        Flash::error("Le nom d'utilisateur est déjà pris.");
        return $this->renderLogin();
    }

    private function createUser(Form $form)
    {
        $broker = new serverBroker();
        if($broker->isUsernameAvailable($form->getValue('inputName')))
        {
            $user = $this->generateUser($form);
            $id = $broker->insertTempUser($user);
            return $id;
        }
        return null;
    }

    private function generateUser(Form $form) : \stdClass
    {
        $user = (object) array(
            "username" => $form->getValue("inputName"),
            "sex" => $form->getValue("inputSex"),
            "color" => $form->getValue("inputColor"),
            "age" => $form->getValue("inputAge")
        );
        return $user;
    }

    public function renderLogin()
    {
        return $this->render("login", ["title" => "Chatroom - Login"]);
    }
}
