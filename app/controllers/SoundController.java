package controllers;

import com.avaje.ebean.Model;
import play.mvc.*;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import models.Sound;
import static play.libs.Json.toJson;


public class SoundController extends Controller{


    // Metod enbart för att hårdkoda ett "ljud" för att underlätta testning,
    public Result addSound(){

        Sound sound = new Sound("hej.wav");
        sound.save();

        response().setHeader("Access-Control-Allow-Origin", "*");

        return redirect(routes.HomeController.index());
    }




}
