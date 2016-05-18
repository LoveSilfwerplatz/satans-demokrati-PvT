package models;
import com.avaje.ebean.Model;

import javax.persistence.*;
import java.util.UUID;

@Entity
public class User extends Model{

    public String name;
    public String email;
    public String password;
    public String token;
    public boolean isAdmin;
    public boolean isFbUser;

    @Id
    public int ID;

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }

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

    public boolean isFbUser() {
        return isFbUser;
    }

    public void setFbUser(boolean fbUser) {
        isFbUser = fbUser;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User(String email, String password, String name, boolean fbUser) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.isFbUser = fbUser;
        this.token = UUID.randomUUID().toString();
    }

    public static Finder<Integer, User> find
            = new Model.Finder<>(Integer.class, User.class);
}
