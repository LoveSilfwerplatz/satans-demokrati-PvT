package controllers;


import models.Users;
import play.*;
import com.avaje.ebean.Model;
import play.data.Form;
import play.mvc.*;
import views.html.*;
import java.util.List
import static play.libs.Json.toJson;

/**
 * Created by andre on 2016-04-22.
 */
public class UserController extends Controller {


    public static Result addPerson(){
        Users person = Form.form(Users.class).bindFromRequest().get();
        person.save();
        return redirect(routes.HomeController.index());
    }
    public Result getUsers() {
        Model.Finder<Integer, Users> finder = new Model.Finder<>(Users.class);
        List<Users> users = finder.all();
        return ok(toJson(users));
    }

}
