

package controllers;


import models.User;
import com.avaje.ebean.Model;
import play.mvc.*;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import static play.libs.Json.toJson;


public class UserController extends Controller{

    public Result addUsers(){
        //Fungerar hårdkodat

        User user = new User("bob@se.se", "hemligt", "Bob");
        user.save();

        response().setHeader("Access-Control-Allow-Origin", "*");

        return redirect(routes.HomeController.index());
    }

    public Result signUp(String email, String password, String name){
        User user = new User(email, password, name);
        user.save();

        response().setHeader("Access-Control-Allow-Origin", "*");

        return redirect(routes.HomeController.index());

    }
    public Result signin(){
        Http.RequestBody body = request().body();
        Map<String, String[]> map = body.asFormUrlEncoded();
        String[] email = map.get("email");
        String[] password = map.get("password");
        String[] name = map.get("name");
        User user = new User(email[0], password[0], name[0]);
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
