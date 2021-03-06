package actions;

import models.User;
import play.mvc.Http;
import play.mvc.Result;
import play.mvc.Security;


public class ActionAuthenticator extends Security.Authenticator {

    @Override
    public String getUsername(Http.Context ctx) {
        String token = getTokenFromHeader(ctx);
        if (token != null) {
            User user = User.find.where().eq("token", token).findUnique();
            if (user != null) {

                return user.name;
            }
        }
        return null;
    }

    @Override
    public Result onUnauthorized(Http.Context context) {
        return unauthorized();
    }

    private String getTokenFromHeader(Http.Context ctx) {
        String[] authTokenHeaderValues = ctx.request().headers().get("X-AUTH-TOKEN");
        if ((authTokenHeaderValues != null) && (authTokenHeaderValues.length == 1) && (authTokenHeaderValues[0] != null)) {
            return authTokenHeaderValues[0];
        }
        return null;
    }
}
