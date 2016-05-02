package models;
import com.avaje.ebean.Model;
import javax.persistence.*;

@Entity
public class Sound extends Model{

    public String name;
    private String towerName;

    @Id
    public int ID;

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


    public Sound(String name) {
        this.name = name;
    }
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
