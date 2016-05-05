package controllers;


import com.google.gson.Gson;
import com.google.gson.JsonElement;
import play.api.libs.json.Json;
import play.mvc.*;
import play.db.*;
import scala.util.parsing.json.JSONArray;

import java.sql.*;
import java.util.*;


/**
 * Created by andre on 2016-04-22.
 */
public class ConnectionController extends Controller {

    public Connection getConnection() throws SQLException {

        Connection conn = null;
        conn = DB.getConnection();
        System.out.println("Connected to database");
        return conn;
    }
}