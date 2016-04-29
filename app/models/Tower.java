package models;
import com.avaje.ebean.Model;
import javax.persistence.*;

/**
 * Created by Theo on 29/04/2016.
 *
 * Basically just a copy of Sound.java right now, format-wise.
 */
@Entity
public class Tower extends Model {

    private String towerName;
    private int broadcastRange;
    private double latCoordDD, longCoordDD;

    public Tower(String towerName) {
        this.towerName = towerName;
    }

    public String getTowerName(){ return towerName; }

    public void setTowerName(String towerName) { this.towerName = towerName; }

    public int getRange() { return broadcastRange; }

    public void setRange(int broadcastRange) { this.broadcastRange = broadcastRange; }

    public double getLatCoordDD(){ return latCoordDD; }

    public void setLatCoordDD(int latCoordDD){ this.latCoordDD = latCoordDD; }

    public double getLongCoordDD(){ return longCoordDD; }

    public void setLongCoordDD(int longCoordDD){ this.longCoordDD = longCoordDD; }

}
