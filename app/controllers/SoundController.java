package controllers;

import com.avaje.ebean.Model;
import com.google.gson.Gson;
import models.Sound;
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



    public Result addSound(){

        Sound sound = new Sound("hej.wav");
        sound.save();

        response().setHeader("Access-Control-Allow-Origin", "*");

        return redirect(routes.HomeController.index());
    }

    // Previous setSound() method, commented out rather than removed / replaced in case I fuck up. -- Thea
/*    public Result setSound(){
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
    public Result setSound(){
        Http.RequestBody body = request().body();
        Map<String, String[]> map = body.asFormUrlEncoded();
        String[] trackID = map.get("trackDrop.value");
        int ID = Integer.parseInt(trackID[0]);
        String[] name = map.get("tracksDrop.text");
        String[] assignedTower = map.get("towerDrop.value");
        String[] assignedCharacter = map.get("characterField");
        Sound sound = new Sound(ID, name[0], assignedTower[0], assignedCharacter[0]);
        sound.save();

        response().setHeader("Access-Control-Allow-Origin", "*");

        return ok(adminAddSound.render("Success"));
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
