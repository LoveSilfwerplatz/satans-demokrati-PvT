package controllers;


import com.google.gson.Gson;
import models.Users;
import play.*;
import com.avaje.ebean.Model;
import play.data.Form;
import play.mvc.*;
import views.html.*;
import java.util.List;
import play.data.FormFactory;
import static play.libs.Json.toJson;

/**
 * Created by andre on 2016-04-22.
 */
public class UserController extends Controller {

    public static Result addUser(){
        //Users person = Form.form(Users.class).bindFromRequest().get();
        Form<Users> userForm = Form.form(Users.class);
        userForm.fill(new Users("bob@se.se","hej", "hemligthemligt" ));
        Users user = userForm.bindFromRequest().get();
        user.save();

        return redirect(routes.HomeController.index());
    }
    public Result getUsers() {
        Model.Finder<Integer, Users> finder = new Model.Finder<>(Users.class);
        List<Users> users = finder.all();

        response().setHeader("Access-Control-Allow-Origin", "*");

        // Gson converts Java collections to/from Json
        return ok(new Gson().toJson(users));
    }

}
