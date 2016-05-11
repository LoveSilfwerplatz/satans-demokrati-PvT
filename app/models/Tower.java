package models;
import com.avaje.ebean.Model;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.UUID;

/**
 * Created by Theo on 29/04/2016.
 *
 * Basically just a copy of Sound.java right now, format-wise.
 */
@Entity
public class Tower extends Model {

    private String towerName;
    private int range;

    @Column(precision = 9, scale = 6)
    private BigDecimal latCoordDD, longCoordDD;

    public Tower( String towerName, BigDecimal latCoordDD, BigDecimal longCoordDD, int range) {

        this.towerName = towerName;
        this.longCoordDD = longCoordDD;
        this.latCoordDD = latCoordDD;
        this.range = range;
    }

    public static Finder<Integer, Tower> find
            = new Model.Finder<>(Integer.class, Tower.class);

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

    public int getRange() { return range; }

    public void setRange(int range) { this.range = range; }

    public BigDecimal getLatCoordDD(){ return latCoordDD; }

    public void setLatCoordDD(BigDecimal latCoordDD){ this.latCoordDD = latCoordDD; }

    public BigDecimal getLongCoordDD(){ return longCoordDD; }

    public void setLongCoordDD(BigDecimal longCoordDD){ this.longCoordDD = longCoordDD; }

}
