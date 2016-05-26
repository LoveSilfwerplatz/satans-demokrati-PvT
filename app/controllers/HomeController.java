package controllers;

import com.avaje.ebean.Model;
import com.avaje.ebean.annotation.Transactional;
import models.Tower;
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


    public Result map() { return ok(map.render());}


    /**
     * An action that renders an HTML page with a welcome message.
     * The configuration in the <code>routes</code> file means that
     * this method will be called when the application receives a
     * <code>GET</code> request with a path of <code>/</code>.
     */
    @Transactional
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


    @Transactional
    public Result formattedUsers(){
        String tabs = "\t\t\t\t\t";
        String result = "Användare\nID:" + "\t\t" + "Namn:\n";

        Model.Finder<Integer, User> finder = new Model.Finder<>(User.class);
        List<User> allUsers = finder.all();

        for(User u: allUsers){
            result += u.getID() + "\t\t" + u.getName() + "\n";
        }


        return ok(adminTEMP.render(result));

    }


    @Transactional
    public Result formattedSounds(){
        String tabs = "\t\t\t\t\t";
        String result = "Ljudfiler\nID:" + "\t\t\t\t" + "Namn:" + "\n";

        Model.Finder<Integer, Sound> finder = new Model.Finder<>(Sound.class);
        List<Sound> allSounds = finder.all();

        for(Sound s: allSounds){


            result += s.getID() + "\t\t" + s.getName() + "\t("+s.getAssignedCharacter()+")"+"\n";

        }


        return ok(adminTEMP.render(result));

    }

    @Transactional
    public Result formattedTowers(){
        String tabs = "\t\t";
        String result = "Radiotorn\nID:" + "\t\t" + "Range:" + tabs + "Longitude:" + tabs + "Latitude:" + tabs + "\t\t\tName:" + tabs + "\n";


        Model.Finder<Integer, Tower> finder = new Model.Finder<>(Tower.class);
        List<Tower> allTowers = finder.all();

        for(Tower t: allTowers){
            result += t.getID() + "\t\t" + t.getRange() + tabs + "\t" + t.getLongCoordDD() + tabs + t.getLatCoordDD() + tabs + "\t\t" + t.getName() + "\n";
        }


        return ok(adminTEMP.render(result));


    }




    public Result addSound(){ return ok(adminAddSound.render(""));
    }

    public Result addTower() { return ok(adminAddTower.render("hej"));}

}
