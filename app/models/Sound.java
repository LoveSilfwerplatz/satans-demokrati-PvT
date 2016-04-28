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

    public void setCharacter(){ this.character = character; };

    public String getSoundLink(){ return soundLink; };

    public void setSoundLink(){ this.soundLink = soundLink; };

}
