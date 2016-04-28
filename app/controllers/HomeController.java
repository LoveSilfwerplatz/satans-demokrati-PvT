package controllers;

import play.mvc.*;
import play.db.*;
import java.sql.*;

import views.html.*;

/**
 * This controller contains an action to handle HTTP requests
 * to the application's home page.
 */
public class HomeController extends Controller {

    /**
     * An action that renders an HTML page with a welcome message.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/</code>.
     */
    public Result index() {
        Connection conn = null;
        Statement stmt = null;

        String result = "";

        try {
            conn = DB.getConnection();
            stmt = conn.createStatement();
            String sql = "SELECT * FROM Soundtest";
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                result += rs.getString("name");
                result += ": ";
                result += rs.getString("filepath");
                result += "\n";
            }
        } catch (Exception e) {
            System.out.println(e);
        }

        return ok(index.render(result));
    }


    public Result admin(){
        return ok(admin.render());
    }
}
