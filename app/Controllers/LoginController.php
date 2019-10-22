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
        $user = $this->createUser($form);
        if(!is_null($user->id))
        {
            Session::getInstance()->set("user", $user);
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
            $user->id = $id;
            return $user;
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
        $user = Session::getInstance()->read('user');
        if(isset($user)){
            return $this->redirect("/accueil");
        }
        return $this->render("login", ["title" => "Chatroom - Login"]);
    }
}
