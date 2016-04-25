package models;
import com.avaje.ebean.Model;
import javax.persistence.*;

@Entity
public class User extends Model{

    public String name;
    public String email;
    public String password;

    @Id
    public int ID;

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

    public boolean isAdmin;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public void setAdmin(boolean admin) {
        isAdmin = admin;
    }

    public String getName() {

        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public User(int ID, String email, String password, String name) {

        this.ID = ID;
        this.email = email;
        this.password = password;
        this.name = name;
    }
}
