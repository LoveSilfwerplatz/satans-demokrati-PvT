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

    public Result setSound(){
        Http.RequestBody body = request().body();
        Map<String, String[]> map = body.asFormUrlEncoded();
        //String[] character = map.get("character");
        String[] name = map.get("name");

        Sound sound = new Sound(name[0]);
        sound.save();

        response().setHeader("Access-Control-Allow-Origin", "*");

        return ok(adminAddSound.render("Success"));

    }

    public Result soundcloud() {
        response().setHeader("Access-Control-Allow-Origin", "*");
        return ok(sctest.render());
    }




}
