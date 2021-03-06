package controllers;

import com.avaje.ebean.annotation.Transactional;
import com.google.gson.Gson;
import play.api.libs.json.Json;
import play.api.*;
import play.mvc.*;
import play.db.*;
import scala.util.parsing.json.JSONArray;

import java.sql.*;
import java.util.*;

/**
 * Created by carl-johanlindblad on 2016-04-19.
 */
public class TestController extends Controller {

    private String clientId = "6a0f1d47b7df82417d31a6947ab0032c";

    @Transactional
    public Result test() {

        Connection conn = null;
        Statement stmt = null;

        List<Map<String, String>> result = new ArrayList<>();

        /*try {
            conn = DB.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM Soundtest";
            ResultSet rs = stmt.executeQuery(sql);

            while (rs.next()) {
                HashMap<String, String> map = new HashMap<>();
                map.put("name", rs.getString("name"));
                map.put("filepath", rs.getString("filepath"));
                result.add(map);
            }*/
        try {
            conn = DB.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM sound";
            ResultSet rs = stmt.executeQuery(sql);

            while (rs.next()) {
                HashMap<String, String> map = new HashMap<>();
                String filepath = "http://api.soundcloud.com/tracks/" + rs.getInt("id") + "/stream?client_id=" + clientId;
                map.put("name", rs.getString("name"));
                map.put("filepath", filepath);
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
