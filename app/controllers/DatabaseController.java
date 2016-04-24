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

        List<Map<String, String>> result = new ArrayList<>();

        try {
            conn = DB.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT file, filepath FROM "+source+" WHERE file = '"+file+"'";
            ResultSet rs = stmt.executeQuery(sql);

            HashMap<String, String> map = new HashMap<>();
            map.put("File", rs.getString(file));
            map.put("filepath", rs.getString("filepath"));
            result.add(map);


        } catch (Exception e) {
            System.out.println(e);
        }

        // important!!! for allowing cross domain requests
        response().setHeader("Access-Control-Allow-Origin", "*");

        // Gson converts Java collections to/from Json
        return ok(new Gson().toJson(result));
    }

}
