package controllers;

import com.avaje.ebean.Model;
import com.fasterxml.jackson.databind.JsonNode;
import play.mvc.*;

import java.util.*;

import models.User;

import static play.libs.Json.toJson;


public class UserController extends Controller {


    // Metod enbart för att hårdkoda en "användare" för att underlätta testning,
    public Result addUser() {

        User user = new User("mail@google,com", "hidden", "Arne Anka");
        user.save();

        response().setHeader("Access-Control-Allow-Origin", "*");

        return redirect(routes.HomeController.index());
    }



    public User authenticate(String username, String password) {


        Model.Finder<Integer, User> finders = new Model.Finder<>(User.class);
        return finders.where().eq("name", username).eq("password", password).findUnique();

    }

    public Result login() {
        //Funkar inte, ger alltid null user.
        Http.RequestBody body = request().body();
        Map<String, String[]> map = body.asFormUrlEncoded();
        String[] password = map.get("password");
        String[] name = map.get("name");

        String pw = Arrays.toString(password);
        String nm = Arrays.toString(name);


        User authUser = authenticate(nm, pw);
        if(authUser != null){
            return ok();
        } else {
            return redirect(routes.HomeController.index());
        }

    }



    public Result signin() {
        //kan göras snyggare
        Http.RequestBody body = request().body();
        Map<String, String[]> map = body.asFormUrlEncoded();
        String[] email = map.get("email");
        String[] password = map.get("password");
        String[] name = map.get("name");
        User user = new User(email[0], password[0], name[0]);
        user.save();

        response().setHeader("Access-Control-Allow-Origin", "*");

        return redirect(routes.HomeController.index());
        //return redirect("http://localhost:9000/signin");
    }


    public Result getUsers() {


        Model.Finder<Integer, User> finder = new Model.Finder<>(User.class);
        List<User> allUsers = finder.all();

        response().setHeader("Access-Control-Allow-Origin", "*");

        // Gson converts Java collections to/from Json
        return ok(toJson(allUsers));

    }


}
