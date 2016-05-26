package controllers;

import com.avaje.ebean.Ebean;
import com.avaje.ebean.Model;
import com.avaje.ebean.SqlQuery;
import com.avaje.ebean.SqlRow;
import com.avaje.ebean.annotation.Transactional;
import com.google.gson.Gson;
import models.Tower;
import models.User;
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

    @Transactional
    public Result getTowers() {
        Model.Finder<Integer, Tower> finder = new Model.Finder<>(Tower.class);
        List<Tower> allTowers = finder.all();

        response().setHeader("Access-Control-Allow-Origin", "*");

        return ok(toJson(allTowers));
        //return ok(new Gson().toJson(result));

    }

    @Transactional
    public Result getTowerByName(String name) {

        List<Tower> tower = Tower.find.select("longCoordDD").select("latCoordDD")
                .where().eq("towerName", name)
                .findList();

        response().setHeader("Access-Control-Allow-Origin", "*");

        return ok(toJson(tower));
        //return ok(new Gson().toJson(result));

    }

    @Transactional
    public Result getUserTowers(String userName) {

        // TODO refactor to separate method (filter/service?), used by getUserSounds
        // get user id by user name (email)
        User user = User.find.where().eq("email", userName).findUnique();
        int userId = user.getID();

        // get all towers by junction table
        String query = "select distinct tower.id, tower.tower_name " +
                "from user_tower " +
                "join user on user_tower.user = user.id " +
                "join tower on user_tower.tower = tower.id " +
                "where user.id = " + userId;
        SqlQuery sqlQuery = Ebean.createSqlQuery(query);
        List<SqlRow> list = sqlQuery.findList();

        response().setHeader("Access-Control-Allow-Origin", "*");

        return ok(new Gson().toJson(list));
    }

    @Transactional
    public Result setTower(){


        Http.RequestBody body = request().body();
        Map<String, String[]> map = body.asFormUrlEncoded();
        String[] towerName = map.get("towerName");
        String[] towerRadius = map.get("towerRadius");
        String[] towerLat = map.get("latitude");
        String[] towerLog = map.get("longitude");
        BigDecimal lat = new BigDecimal(towerLat[0]);
        BigDecimal log = new BigDecimal(towerLog[0]);
        int range = Integer.parseInt(towerRadius[0]);
        Tower tower = new Tower(towerName[0], lat, log, range);
        tower.save();


        response().setHeader("Access-Control-Allow-Origin", "*");

        return ok(adminAddTower.render("Success"));

    }

    public Result nyTower(){
        return ok(adminAddTower.render("Success"));

    }


}
