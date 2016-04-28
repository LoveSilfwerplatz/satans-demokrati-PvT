package controllers;

import com.avaje.ebean.Model;
import play.mvc.*;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import models.User;
import static play.libs.Json.toJson;


public class UserController extends Controller{


    // Metod enbart för att hårdkoda en "användare" för att underlätta testning,
    public Result addUser(){

        User user = new User("mail@google,com", "hidden", "Arne Anka");
        user.save();

        response().setHeader("Access-Control-Allow-Origin", "*");

        return redirect(routes.HomeController.index());
    }




    public Result signin(){
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
