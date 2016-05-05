package controllers;

import actions.ActionAuthenticator;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;

@Security.Authenticated(ActionAuthenticator.class)
public class SecureController extends Controller {

    public Result securedContent() {

        response().setHeader("Access-Control-Allow-Origin", "*");

        return ok("Inne.");
    }

    // Implementera metoderna här som bara ska vara för inloggat läge. Döp om till ngt context baserat istället för securecontroller
}
