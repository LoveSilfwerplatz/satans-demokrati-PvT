package models;
import com.avaje.ebean.Model;
import com.sun.org.apache.xpath.internal.operations.String;
import java.util.*;
import javax.persistence.*;

@Entity
public class Tower {

    public String tower;
    public String character;
    public float latitude;
    public float longitude;
    List<Sound> towerSounds = new ArrayList();


    public Tower(String tower, String character, float latitude, float longitude){
        this.tower = tower;
        this.character = character;
        this.latitude = latitude;
        this.longitude = longitude;

    }

    @Id
    public int ID;

    public String getTower(){ return tower; }

    public void setTower(String tower){ this.tower = tower; };

    public String getCharacter(){ return character; };

    public void setCharacter(String character){ this.character = character; };

    public float getLatitude(){ return latitude; };

    public void setLatitude(float latitude){ this.latitude = latitude; };

    public float getLongitude(){ return longitude; };

    public void setLongitude(float longitude){ this.longitude = longitude; };

    public List<Sound> getTowerSounds(){ return towerSounds; };

    public void setTowerSounds(Sound object){ towerSounds.add(object); };

}
