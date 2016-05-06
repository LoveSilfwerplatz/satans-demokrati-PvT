package controllers;

import com.avaje.ebean.Model;
import com.google.gson.Gson;
import models.Tower;
import play.api.libs.json.Json;
import play.mvc.*;
import play.db.*;
import scala.tools.fusesource_embedded.jansi.AnsiConsole;
import scala.util.parsing.json.JSONArray;
import views.html.adminAddTower;
import play.Logger;
import java.math.BigDecimal;
import java.sql.*;
import java.util.*;

import static play.libs.Json.toJson;

public class TowerController extends Controller {

    public Result getTowers() {
        Model.Finder<Integer, Tower> finder = new Model.Finder<>(Tower.class);
        List<Tower> allTowers = finder.all();

        response().setHeader("Access-Control-Allow-Origin", "*");

        return ok(toJson(allTowers));
        //return ok(new Gson().toJson(result));

    }

    public Result setTower(){


        Http.RequestBody body = request().body();
        Map<String, String[]> map = body.asFormUrlEncoded();
        String[] towerName = map.get("towerName");
        String[] towerRadius = map.get("towerRadius");
        String[] towerLat = map.get("latitude");
        String[] towerLog = map.get("longitude");
        BigDecimal lat = new BigDecimal(towerLat[0]);
        BigDecimal log = new BigDecimal(towerLog[0]);
        Tower tower = new Tower(towerName[0],  log, lat);
        tower.save();


        response().setHeader("Access-Control-Allow-Origin", "*");

        return ok(adminAddTower.render("Success"));

    }

    public Result nyTower(){
        return ok(adminAddTower.render("Success"));

    }


}
