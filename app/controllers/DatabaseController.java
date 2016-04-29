package controllers;

import com.google.gson.Gson;
import play.api.libs.json.Json;
import play.mvc.*;
import play.db.*;
import scala.tools.fusesource_embedded.jansi.AnsiConsole;
import scala.util.parsing.json.JSONArray;

import java.sql.*;
import java.util.*;


public class DatabaseController extends Controller {

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

    public Result getTowers(String source){
        Connection conn = null;
        Statement stmt = null;
        boolean alreadyExecuted = false;

        List<Map<String, float, float, int>> result = new ArrayList<>();

        try {
            conn = DB.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM "+source;
            ResultSet rs = stmt.executeQuery(sql);
            rs.next();

            if (!alreadyExecuted){
                HashMap<String, float, float, int> map = new HashMap<>();
                map.put("Tower name ", rs.getString("towerName"));
                map.put("Latitude ", rs.getFloat("latCoordDD"));
                map.put("Longitude ", rs.getFloat("longCoordDD"));
                map.put("Range ", rs.getFloat("range"));
                results.add(map);
                alreadyExecuted = true;
            }

        } catch (Exception e) {
            System.out.println(e);
        }

        response.setHeader("Access-Control-Allow-Origin", "*");

        return ok(new Gson().toJson(result));
    }



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
