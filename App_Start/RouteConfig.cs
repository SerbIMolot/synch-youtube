using System.Web.Mvc;
using System.Web.Routing;

namespace Chat
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapMvcAttributeRoutes();
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
            //routes.MapRoute("Chat", url: "Chat/{id}", defaults: new { controller = "Room", action = "Chat", id = "" });
            //routes.MapRoute("Join", url: "Join/{id}", defaults: new { controller = "Room", action = "JoinRoom", id = "" }, new { httpMethod = new HttpMethodConstraint("POST") });
            //routes.MapRoute("Create", url: "Create/{id}", defaults: new { controller = "Room", action = "CreateRoom", id = "" }, new { httpMethod = new HttpMethodConstraint("POST") });

        }
    }
}
