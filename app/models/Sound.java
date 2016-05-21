package models;

import com.avaje.ebean.Model;

import javax.persistence.*;

@Entity
public class Sound extends Model {

    @Id
    public int ID;

    public String name;
    private String assignedTower, assignedCharacter;

    // Barebones constructor.
    public Sound(String name) {
        this.name = name;
    }

    // Complete constructor.
    public Sound(int ID, String name, String assignedTower, String assignedCharacter) {
        this.ID = ID;
        this.name = name;
        this.assignedCharacter = assignedCharacter;
        this.assignedTower = assignedTower;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAssignedTower() {
        return assignedTower;
    }

    public void setAssignedTower(String assignedTower) {
        this.assignedTower = assignedTower;
    }

    public String getAssignedCharacter() {
        return assignedCharacter;
    }

    public void setAssignedCharacter() {
        this.assignedCharacter = assignedCharacter;
    }

    // public static Finder<Integer, Sound> find
    //        = new Model.Finder<>(Integer.class, Sound.class);

    public static Finder<Integer, Sound> find = new Finder<>(Sound.class);

}







/*
package models;
        import com.avaje.ebean.Model;
        import com.sun.org.apache.xpath.internal.operations.String;

        import javax.persistence.*;

@Entity
public class Sound extends Model {

    public String tower;
    public String character;
    public String soundLink;
    public String message;

    public Sound(String tower, String character, String soundLink, String message){
        this.tower = tower;
        this.character = character;
        this.soundLink = soundLink;
        this.message = message;
    }

    @Id
    public int ID;

    public String getTower(){ return tower; }

    public void setTower(String tower){ this.tower = tower; };

    public String getCharacter(){ return character; };

    public void setCharacter(String character){ this.character = character; };

    public String getSoundLink(){ return soundLink; };

    public void setSoundLink(String soundLink){ this.soundLink = soundLink; };

    public String getMessage(){ return message; };

    public void setMessage(String message){ this.message = message; };

}
*/
