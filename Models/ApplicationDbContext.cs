using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Collections.Generic;
using System.Data.Entity;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Chat.Models
{

    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            Rooms = new List<ConversationRoom>();
            sentMessages = new List<Message>();
            ConnectionIds = new List<string>();
            Connections = new List<Connection>();
        }
        public List<string> ConnectionIds { get; set; }
        public string currentConnectionId { get; set; }
        public List<Connection> Connections { get; set; }
        public virtual List<ConversationRoom> Rooms { get; set; }
        public virtual List<Message> sentMessages { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager)
        {
            ClaimsIdentity userIdentity = await manager.CreateIdentityAsync(this, DefaultAuthenticationTypes.ApplicationCookie);
            return userIdentity;
        }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Message> Messages { get; set; }
        public DbSet<Connection> Connections { get; set; }
        public DbSet<ConversationRoom> Rooms { get; set; }
        public DbSet<YoutubeVideo> Videos { get; set; }

        public ApplicationDbContext()
            : base("SQLTubeConnection", throwIfV1Schema: false)
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

        }
        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }
    }
}