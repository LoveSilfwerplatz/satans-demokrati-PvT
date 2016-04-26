

package controllers;


import models.User;
import com.avaje.ebean.Model;
import play.mvc.*;
import java.util.List;
import static play.libs.Json.toJson;


public class UserController extends Controller{

    public Result addUsers(){
        //Fungerar hårdkodat

        User user = new User(235,"bob@se.se", "sshemligthemligt", "hoasdrsasdasdeface");
        user.save();

        response().setHeader("Access-Control-Allow-Origin", "*");

        return redirect(routes.HomeController.index());
    }
    public Result getUsers() {



        Model.Finder<Integer, User> finder = new Model.Finder<>(User.class);
        List<User> allUsers = finder.all();

        response().setHeader("Access-Control-Allow-Origin", "*");

        // Gson converts Java collections to/from Json
        return ok(toJson(allUsers));

    }


}
