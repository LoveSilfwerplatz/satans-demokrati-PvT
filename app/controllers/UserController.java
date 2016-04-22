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

    public Result addUsers(){
        //Fungerar hårdkodat

        Users user = new Users(3,"bob@se.se", "sshemligthemligt", "hoasdrseface");
        user.save();

        return redirect(routes.HomeController.index());
    }
    public Result getUsers() {
        //Fungerar hårdkodat
        Model.Finder<Integer, Users> finder = new Model.Finder<>(Users.class);
        List<Users> allUsers = finder.all();

        response().setHeader("Access-Control-Allow-Origin", "*");

        // Gson converts Java collections to/from Json
        return ok(toJson(allUsers));


    }

}
