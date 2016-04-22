package models;

/**
 * Created by andre on 2016-04-21.
 */



import com.avaje.ebean.Model;
import javax.persistence.*;


@Entity
public class Users extends Model {

    public String name;
    public String email;
    public String password;
    public boolean isAdmin;



    public Users(String email, String password, String name) {
        this.email = email;
        this.password = password;
        this.name = name;
    }
}
