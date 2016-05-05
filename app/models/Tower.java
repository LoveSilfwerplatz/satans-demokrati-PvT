package models;
import com.avaje.ebean.Model;
import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by Theo on 29/04/2016.
 *
 * Basically just a copy of Sound.java right now, format-wise.
 */
@Entity
public class Tower extends Model {

    private String towerName;
    private int broadcastRange;

    @Column(precision = 9, scale = 6)
    private BigDecimal latCoordDD, longCoordDD;

    public Tower( String towerName, BigDecimal latCoordDD, BigDecimal longCoordDD) {

        this.towerName = towerName;
        this.longCoordDD = longCoordDD;
        this.latCoordDD = latCoordDD;
    }

    @Id
    public int ID;

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }



    public String getName(){ return towerName; }

    public void setName(String towerName) { this.towerName = towerName; }

    public int getRange() { return broadcastRange; }

    public void setRange(int broadcastRange) { this.broadcastRange = broadcastRange; }

    public BigDecimal getLatCoordDD(){ return latCoordDD; }

    public void setLatCoordDD(BigDecimal latCoordDD){ this.latCoordDD = latCoordDD; }

    public BigDecimal getLongCoordDD(){ return longCoordDD; }

    public void setLongCoordDD(BigDecimal longCoordDD){ this.longCoordDD = longCoordDD; }

}
