package filters;

/**
 * Created by andre on 2016-05-11.
 */
import play.mvc.EssentialFilter;
import play.filters.cors.CORSFilter;
import play.http.HttpFilters;

import javax.inject.Inject;

public class Filters implements HttpFilters {

    @Inject
    private CORSFilter corsFilter;

    public EssentialFilter[] filters() {
        return new EssentialFilter[] {
                corsFilter.asJava()
        };
    }

}
