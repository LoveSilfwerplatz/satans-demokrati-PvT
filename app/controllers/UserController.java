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
        User user = new User("mail@google,com", "hidden", "Arne Anka", false);
        user.save();

        response().setHeader("Access-Control-Allow-Origin", "*");

        return redirect(routes.HomeController.index());
    }

    public User authenticate(String username, String password) {
        return User.find.where().eq("name", username).eq("password", password).findUnique();
    }

    public Result login() {
        Http.RequestBody body = request().body();

        Map<String, String[]> map = body.asFormUrlEncoded();
        String[] password = map.get("password");
        String[] name = map.get("name");
        String pw = password[0];
        String nm = name[0];

        User authUser = authenticate(nm, pw);

        response().setHeader("Access-Control-Allow-Origin", "*");

        if (authUser == null) {
            return notFound();
        } // ta upp din cmd

        return ok(authUser.token);
    }

    public Result signin() {
        //kan göras snyggare
        Http.RequestBody body = request().body();
        Map<String, String[]> map = body.asFormUrlEncoded();
        String[] email = map.get("email");
        String[] password = map.get("password");
        String[] name = map.get("name");
        return signin(email[0], password[0], name[0], false);
    }

    public Result fbSignIn(String name, String email) {
        // we don't save passwords for fb users
        return signin(email, "", name, true);
    }

    public Result signin(String email, String password, String name, boolean isFbUser) {
        User user = new User(email, password, name, isFbUser);
        user.save();

        response().setHeader("Access-Control-Allow-Origin", "*");

        return ok(user.token);

        //return redirect(routes.HomeController.index());
        //return redirect("http://localhost:9000/signin");
    }

    public Result getUsers() {
        Model.Finder<Integer, User> finder = new Model.Finder<>(User.class);
        List<User> allUsers = finder.all();

        response().setHeader("Access-Control-Allow-Origin", "*");

        // Gson converts Java collections to/from Json
        return ok(toJson(allUsers));
    }

    public Result hasUser(String email) {
        User user = User.find.where().eq("email", email).findUnique();
        boolean hasUser = user != null;

        response().setHeader("Access-Control-Allow-Origin", "*");
        response().setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
        response().setHeader("Access-Control-Allow-Hedaers", "Content-Type, Content-Range, Content-Disposition, Content-Description");

        return ok(toJson(hasUser));
    }
}
