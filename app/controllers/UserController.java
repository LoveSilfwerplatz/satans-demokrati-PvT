package controllers;

import com.avaje.ebean.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.google.gson.GsonBuilder;
import com.mysql.jdbc.exceptions.MySQLIntegrityConstraintViolationException;
import models.Tower;
import play.Logger;
import play.mvc.*;

import java.util.*;

import models.User;

import static play.libs.Json.newObject;
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
        response().setHeader("Access-Control-Allow-Headers", "Content-Type, Content-Range, Content-Disposition, Content-Description");

        return ok(toJson(hasUser));
    }

    public Result addTower(String userName, String towerName) {
        User user = User.find.select("ID")
                .where().eq("name", userName)
                .findUnique();
        int userId = user.getID();

        Tower tower = Tower.find.select("ID")
                .where().eq("tower_name", towerName)
                .findUnique();
        int towerId = tower.getID();

        String update = "INSERT INTO user_tower (user, tower) " +
                        "VALUES (" + userId + ", " + towerId + ")";
        try {
            SqlUpdate sqlUpdate = Ebean.createSqlUpdate(update);
            sqlUpdate.execute();
        } catch (Exception e) {
            // this happens when connection already exists
            Logger.error(e.toString() + " - caused by: " + update);
        }

        // TODO Represent error in return data?
        return ok();

    }

    public Result getFBFriendsTowers(String userName) {

        User user = User.find.select("ID, isFbUser")
                .where().eq("email", userName)
                .findUnique();

        if (user.isFbUser()) {

            String query = "SELECT tower.tower_name\n" +
                    "FROM user_tower\n" +
                    "JOIN\n" +
                    "  (SELECT users_b.id\n" +
                    "  FROM fb_friends\n" +
                    "  JOIN user AS users_a ON fb_friends.user_a = users_a.id\n" +
                    "  JOIN user AS users_b ON fb_friends.user_b = users_b.id\n" +
                    "  WHERE users_a.email = '" + userName + "') AS friends ON user_tower.user = friends.id\n" +
                    "JOIN tower ON user_tower.tower = tower.id";

            SqlQuery sqlQuery = Ebean.createSqlQuery(query);
            List<SqlRow> towerList = sqlQuery.findList();
            return ok(toJson(towerList));
        }

        return ok(toJson(user));
    }

    public Result getUserByToken(String token) {

        User user = User.find.select("email")
                .where().eq("token", token)
                .findUnique();

        return ok(toJson(user.getEmail()));
    }

}
