package controllers;

import com.avaje.ebean.Model;
import models.User;
import models.Sound;
import play.mvc.*;
import play.db.*;
import java.sql.*;
import java.util.List;

import views.html.*;

import static play.libs.Json.toJson;

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


    public Result adminTemp(){
        return ok(adminTEMP.render(""));
    }


    public Result formattedUsers(){
        String result = "";
        String padding = "          ";
        Model.Finder<Integer, User> finder = new Model.Finder<>(User.class);
        List<User> allUsers = finder.all();

        for(User u: allUsers){
            result += "ID: " + u.getID() + padding + u.getName() + "\n";
        }
        if (result == ""){
            return ok(adminTEMP.render("No users to list"));
        } else {
            return ok(adminTEMP.render(result));
        }
    }


    public Result formattedSounds(){
        String result = "";
        String padding = "          ";
        Model.Finder<Integer, Sound> finder = new Model.Finder<>(Sound.class);
        List<Sound> allSounds = finder.all();

        for(Sound s: allSounds){
            result += "ID: " + s.getID() + padding + s.getName() + "\n";
        }
        if (result == ""){
            return ok(adminTEMP.render("No sounds to list"));
        } else {
            return ok(adminTEMP.render(result));
        }
    }

    public Result addSound(){
        return ok(adminTEMP.render("Ingen funktionalitet ännu"));
    }

    public Result addTower() { return ok(adminAddTower.render("To be implemented be Elias"));}

}
