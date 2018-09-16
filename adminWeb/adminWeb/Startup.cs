using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(adminWeb.Startup))]
namespace adminWeb
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
