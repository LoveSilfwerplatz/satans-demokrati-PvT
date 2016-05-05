package controllers;

import actions.ActionAuthenticator;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;

@Security.Authenticated(ActionAuthenticator.class)
public class SecureController extends Controller {

    public Result securedContent() {
        return ok("SECURE SOM FAN");
    }

    // Implementera metoderna här som bara ska vara för inloggat läge. Döp om till ngt context baserat istället för securecontroller
}
