package models;
import com.avaje.ebean.Model;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.UUID;


@Entity
public class Tower extends Model {

    private String towerName;
    private int broadcastRange;

    @Column(precision = 9, scale = 6)
    private BigDecimal latCoordDD, longCoordDD;

    public Tower( String towerName, BigDecimal latCoordDD, BigDecimal longCoordDD, int range) {

        this.towerName = towerName;
        this.longCoordDD = longCoordDD;
        this.latCoordDD = latCoordDD;
        this.broadcastRange = range;
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

    public int getRange() { return broadcastRange; }

    public void setRange(int broadcastRange) { this.broadcastRange = broadcastRange; }

    public BigDecimal getLatCoordDD(){ return latCoordDD; }

    public void setLatCoordDD(BigDecimal latCoordDD){ this.latCoordDD = latCoordDD; }

    public BigDecimal getLongCoordDD(){ return longCoordDD; }

    public void setLongCoordDD(BigDecimal longCoordDD){ this.longCoordDD = longCoordDD; }

}
