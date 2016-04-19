package controllers;

import com.google.gson.Gson;
import play.api.libs.json.Json;
import play.mvc.*;
import play.db.*;
import scala.util.parsing.json.JSONArray;

import java.sql.*;
import java.util.*;

/**
 * Created by carl-johanlindblad on 2016-04-19.
 */
public class TestController extends Controller {

    public Result test() {

        Connection conn = null;
        Statement stmt = null;

        List<String> result = new ArrayList<String>();

        try {
            conn = DB.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM test_data";
            ResultSet rs = stmt.executeQuery(sql);

            while (rs.next())
                result.add(rs.getString("name"));

        } catch (Exception e) {
            System.out.println(e);
        }

        response().setHeader("Access-Control-Allow-Origin", "*");

        // Gson converts Java collections to/from Json
        return ok(new Gson().toJson(result));
    }

}
