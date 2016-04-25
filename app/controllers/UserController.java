

package controllers;


import com.google.gson.Gson;
import models.User;
import play.*;
import com.avaje.ebean.Model;
import play.data.Form;
import play.db.DB;
import play.mvc.*;
import views.html.*;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import play.data.FormFactory;
import static play.libs.Json.toJson;


public class UserController extends Controller{

    public Result addUsers(){
        //Fungerar hårdkodat

        User user = new User(4,"bob@se.se", "sshemligthemligt", "hoasdrsasdasdeface");
        user.save();

        response().setHeader("Access-Control-Allow-Origin", "*");

        return redirect(routes.HomeController.index());
    }
    public Result getUsers() {
        //Fungerar hårdkodat
        User user = new User(4,"bob@se.se", "sshemligthemligt", "hoasdrsasdasdeface");
        user.save();

        Model.Finder<Integer, User> finder = new Model.Finder<>(User.class);
        List<User> allUsers = finder.all();

        response().setHeader("Access-Control-Allow-Origin", "*");

        // Gson converts Java collections to/from Json
        return ok(toJson(allUsers));


    }

    public Result test() {

        Connection conn = null;
        Statement stmt = null;

        List<Map<String, String>> result = new ArrayList<>();

        try {
            conn = DB.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM Soundtest";
            ResultSet rs = stmt.executeQuery(sql);

            while (rs.next()) {
                HashMap<String, String> map = new HashMap<>();
                map.put("name", rs.getString("name"));
                map.put("filepath", rs.getString("filepath"));
                result.add(map);
            }

        } catch (Exception e) {
            System.out.println(e);
        }

        // important!!! for allowing cross domain requests
        response().setHeader("Access-Control-Allow-Origin", "*");

        // Gson converts Java collections to/from Json
        return ok(new Gson().toJson(result));
    }


}