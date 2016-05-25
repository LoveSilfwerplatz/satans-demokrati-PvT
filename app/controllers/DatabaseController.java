package controllers;

import com.avaje.ebean.Model;
import com.avaje.ebean.annotation.Transactional;
import com.google.gson.Gson;
import models.Tower;
import play.api.libs.json.Json;
import play.mvc.*;
import play.db.*;
import scala.tools.fusesource_embedded.jansi.AnsiConsole;
import scala.util.parsing.json.JSONArray;
import views.html.adminAddTower;

import java.math.BigDecimal;
import java.sql.*;
import java.util.*;

import static play.libs.Json.toJson;


public class DatabaseController extends Controller {

    @Transactional
    public Result getRadio(String file, String source) {

        Connection conn = null;
        Statement stmt = null;
        boolean alreadyExecuted = false;

        List<Map<String, String>> result = new ArrayList<>();

        try {
            conn = DB.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT name, filepath FROM "+source+" WHERE name='"+file+"';";
            ResultSet rs = stmt.executeQuery(sql);
            rs.next();

            if(!alreadyExecuted) {
                HashMap<String, String> map = new HashMap<>();
                map.put("File ", rs.getString("name"));
                map.put("Filepath ", rs.getString("filepath"));
                result.add(map);
                alreadyExecuted = true;
            }



        } catch (Exception e) {
            System.out.println(e);
        }

        // important!!! for allowing cross domain requests
        response().setHeader("Access-Control-Allow-Origin", "*");

        // Gson converts Java collections to/from Json
        return ok(new Gson().toJson(result));
    }



    @Transactional
    public Result getPod(float latitude, float longitude){
        Connection conn = null;
        Statement stmt = null;

        List<Map<String, String>> result = new ArrayList<>();
        boolean matched = false;

        try {
            conn = DB.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM SoundCoordTest;";
            ResultSet rs = stmt.executeQuery(sql);

            while(!matched){
                rs.next();

                if((latitude - rs.getFloat("latitude") < 0.000002 || latitude - rs.getFloat("latitude") > -0.000002)
                        &&(longitude - rs.getFloat("longitude") < 0.000002 || longitude - rs.getFloat("longitude") > -0.000002)){
                    HashMap<String, String> map = new HashMap<>();
                    map.put("name",rs.getString("name"));
                    map.put("filepath",rs.getString("filepath"));
                    result.add(map);
                    matched = true;
                }
                else if(rs.isLast()){
                    sql = "SELECT * FROM SoundCoordTest Where id='0';";
                    rs = stmt.executeQuery(sql);
                    rs.next();
                    HashMap<String, String> map = new HashMap<>();
                    map.put("name",rs.getString("name"));
                    map.put("filepath",rs.getString("filepath"));
                    result.add(map);
                    matched = true;

                }
            }

        } catch (Exception e) {
            System.out.println(e);
        }
        // important!!! for allowing cross domain requests
        response().setHeader("Access-Control-Allow-Origin", "*");


        return ok(new Gson().toJson(result));
    }

}
