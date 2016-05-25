package controllers;

import com.avaje.ebean.*;
import com.avaje.ebean.annotation.Transactional;
import com.google.gson.Gson;
import models.Sound;
import models.Tower;
import models.User;
import play.Logger;
import play.api.libs.json.Json;
import play.mvc.*;
import play.db.*;
import scala.tools.fusesource_embedded.jansi.AnsiConsole;
import scala.util.parsing.json.JSONArray;
import views.html.adminAddSound;
import views.html.*;

import java.math.BigDecimal;
import java.sql.*;
import java.util.*;

import static play.libs.Json.toJson;


public class SoundController extends Controller{

    @Transactional
    public Result addSound(){

        Sound sound = new Sound("hej.wav");
        sound.save();

        response().setHeader("Access-Control-Allow-Origin", "*");

        return redirect(routes.HomeController.index());
    }

    // Previous setSound() method, commented out rather than removed / replaced in case I fuck up. -- Thea
/*      public Result setSound(){
        Http.RequestBody body = request().body();
        Map<String, String[]> map = body.asFormUrlEncoded();
        //String[] character = map.get("character");
        String[] name = map.get("name");

        Sound sound = new Sound(name[0]);
        sound.save();

        response().setHeader("Access-Control-Allow-Origin", "*");

        return ok(adminAddSound.render("Success"));
    }*/

    // Currently in-progress setSound method.
    @Transactional
    public Result setSound(){
        Http.RequestBody body = request().body();
        Map<String, String[]> map = body.asFormUrlEncoded();
        String[] trackID = map.get("trackID");
        int ID = Integer.parseInt(trackID[0]);
        String[] name = map.get("trackName");
        String[] assignedTower = map.get("towerName");
        String[] assignedCharacter = map.get("characterField");

        // check if sound exists in DB
        Sound sound = Sound.find.select("ID")
                .where().eq("ID", ID)
                .findUnique();

        // save sound to DB if it doesn't exist
        if (sound == null) {
            sound = new Sound(ID, name[0], assignedCharacter[0]);
            sound.save();
        }

        // make connection between sound and tower
        Tower tower = Tower.find
                .select("ID")
                .where().eq("tower_name", assignedTower[0])
                .findUnique();
        int towerId = tower.getID();
        String update =  "insert into sound_tower (sound, tower) " +
                        "values (" + ID + ", " + towerId + ")";

        try {
            SqlUpdate sqlUpdate = Ebean.createSqlUpdate(update);
            sqlUpdate.execute();
        } catch (Exception e) {
            // this happens when connection already exists
            Logger.error(e.toString() + " - caused by: " + update);
        }

        response().setHeader("Access-Control-Allow-Origin", "*");

        return ok(adminAddSound.render("Success"));
    }

    @Transactional
    public Result getTowerSounds(int towerId) {

        // get all sounds by junction table
        String query =  "select distinct sound.id, sound.name " +
                        "from sound_tower " +
                        "join sound on sound_tower.sound = sound.id " +
                        "join tower on sound_tower.tower = tower.id " +
                        "where tower.id = " + towerId;

        SqlQuery sqlQuery = Ebean.createSqlQuery(query);
        List<SqlRow> towerList = sqlQuery.findList();

        response().setHeader("Access-Control-Allow-Origin", "*");

        return ok(new Gson().toJson(towerList));
    }

    @Transactional
    public Result getUserSounds(String userName) {

        // get user id by user name (email)
        User user = User.find.where().eq("email", userName).findUnique();
        int userId = user.getID();

        // get all sounds from user by the two junction tables
        String query =  "SELECT id, name " +
                        "FROM sound " +
                        "WHERE id IN ( " +
                            "SELECT DISTINCT sound " +
                            "FROM sound_tower " +
                            "WHERE tower IN ( " +
                                "SELECT DISTINCT tower.id " +
                                "FROM user_tower " +
                                    "JOIN user ON user_tower.user = user.id " +
                                    "JOIN tower ON user_tower.tower = tower.id " +
                                "WHERE user.id = " + userId +
                            ")" +
                        ")";

        SqlQuery sqlQuery = Ebean.createSqlQuery(query);
        List<SqlRow> soundList = sqlQuery.findList();

        response().setHeader("Access-Control-Allow-Origin", "*");

        return ok(new Gson().toJson(soundList));
    }

    // Hardcoded test to add sound. Proves that submit functionality is working even if something else isn't.
/*    public Result setSound() {
        Sound sound = new Sound(262784112, "Test Recording 1", "hea", "Theo");
        sound.save();

        response().setHeader("Access-Control-Allow-Origin", "*");

        return redirect(routes.HomeController.index());
    }*/


    public Result soundcloud() {
        response().setHeader("Access-Control-Allow-Origin", "*");
        return ok(sctest.render());
    }

    public Result callback(){
        response().setHeader("Access-Control-Allow-Origin", "*");
        return ok(callback.render());
    }




}
