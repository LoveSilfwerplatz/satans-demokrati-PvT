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

}
