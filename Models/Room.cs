using Microsoft.AspNet.Identity;
using Microsoft.AspNet.SignalR;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace Chat.Models
{
    [Authorize]
    public class Room : Hub
    {
        [Key]
        public string id { get; set; }
        public ICollection<ApplicationUser> users { get; set; }
        private static readonly ConcurrentDictionary<string, ApplicationUser> Users
    = new ConcurrentDictionary<string, ApplicationUser>();
        public override Task OnConnected()
        {
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                // Retrieve user.

                //var user = db.Users.Include( u => u.Ro ).SingleOrDefault( u => u.UserName == Context.User.Identity.Name );
                ApplicationUser user = db.Users.Find(Context.User.Identity.GetUserId());
                //.Include(u => u.RoomsT)
                //.SingleOrDefault(u => u.UserName == Context.User.Identity.Name);

                // If user does not exist in database, must add.
                if (user == null)
                {
                    TaskCanceledException exception = new TaskCanceledException("Please log in");
                    return exception.Task;
                    //user = new ApplicationUser()
                    //{
                    //    UserName = Context.User.Identity.Name
                    //};
                    //db.Users.Add(user);
                    //db.SaveChanges();
                }
                else
                {
                    Debug.WriteLine(Context.User.Identity.GetUserId());
                    Debug.WriteLine(Context.ConnectionId);
                    // Add to each assigned group.
                    user.ConnectionIds.Add(Context.ConnectionId);
                    foreach (ConversationRoom item in user.Rooms)
                    {
                        Groups.Add(Context.User.Identity.GetUserId(), item.RoomName);
                    }
                }
            }
            return base.OnConnected();
        }

        public void JoinRoom(string roomName)
        {
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                // Retrieve room.
                ConversationRoom room = db.Rooms.Find(roomName);

                if (room != null)
                {
                    ApplicationUser user = db.Users.Find(Context.User.Identity.GetUserId());
                    //db.Users.Attach(user);

                    room.Users.Add(user);
                    db.SaveChanges();
                    Groups.Add(Context.User.Identity.GetUserId(), roomName);
                }
            }
        }

        public void RemoveFromRoom(string roomName)
        {
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                // Retrieve room.
                ConversationRoom room = db.Rooms.Find(roomName);
                if (room != null)
                {
                    ApplicationUser user = db.Users.Include(u => u.Rooms).SingleOrDefault(u => u.UserName == Context.User.Identity.Name);

                    room.Users.Remove(user);
                    db.SaveChanges();

                    Groups.Remove(Context.User.Identity.GetUserId(), roomName);
                }
            }
        }
        //public async Task JoinRoom( string roomName )
        //{
        //    
        //    string id = HttpContext.Current.User.Identity.GetUserId();
        //
        //    using (var db = new ApplicationDbContext())
        //    {
        //
        //    }
        //    if ( !users.Any( x => x.Id == id ))
        //    {
        //        await Groups.Add(Context.ConnectionId, roomName);
        //
        //        Clients.Group(roomName).addChatMessage(Context.User.Identity.Name + " joined.");
        //    }
        //}
        //public void Send( Message message )
        //{
        //    
        //    using ( var db = new ApplicationDbContext() )
        //    {
        //    try
        //    { 
        //        //Message msg = new Message();
        //        ////msg.roomId = groupName;
        //        //msg.Room = message.Room;
        //        //ApplicationUser user = db.Users.Find( Context.User.Identity.GetUserId() );
        //        //msg.SenderUserId = message.SenderUser;
        //        //msg.SenderUser = user;
        //        //msg.message = message;
        //        db.Messages.Add(msg);
        //
        //        db.SaveChanges();
        //
        //        Clients.Group(groupName).addMessage( user.UserName , message);
        //    }
        //    catch (DbEntityValidationException e)
        //    {
        //        foreach (var eve in e.EntityValidationErrors)
        //        {
        //            Debug.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
        //                eve.Entry.Entity.GetType().Name, eve.Entry.State);
        //            foreach (var ve in eve.ValidationErrors)
        //            {
        //                    Debug.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
        //                    ve.PropertyName, ve.ErrorMessage);
        //            }
        //        }
        //        throw;
        //    }
        //    }
        //}
        public Task Send(string groupName, string message)
        {

            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                try
                {
                    Message msg = new Message
                    {
                        //msg.roomId = groupName;
                        Room = db.Rooms.Find(groupName)
                    };
                    ApplicationUser user = db.Users.Find(Context.User.Identity.GetUserId());
                    msg.SenderUserId = user.Id;
                    msg.SenderUser = user;
                    msg.message = message;
                    db.Messages.Add(msg);

                    db.SaveChanges();

                    //await Clients.Group(groupName).SendAsync( "Receive", user.UserName , message);
                    //Clients.Group(groupName).broadcastMessage( user.UserName , message);
                    //Clients.All.addMessage( user.UserName , message);
                }
                catch (DbEntityValidationException e)
                {
                    foreach (DbEntityValidationResult eve in e.EntityValidationErrors)
                    {
                        Debug.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",
                            eve.Entry.Entity.GetType().Name, eve.Entry.State);
                        foreach (DbValidationError ve in eve.ValidationErrors)
                        {
                            Debug.WriteLine("- Property: \"{0}\", Error: \"{1}\"",
                            ve.PropertyName, ve.ErrorMessage);
                        }
                    }
                    throw;
                }
            }
            return Clients.Group(groupName).SendAsync("Send", $"{Context.User.Identity.GetUserId()}: {message}");
        }
        //public Task OnDisconnected( string roomName )
        //{
        //    string id = HttpContext.Current.User.Identity.GetUserId();
        //    //using (var db = new ApplicationDbContext())
        //    //{
        //    //    var connection = db.Connections.Find(Context.ConnectionId);
        //    //    db.Connections.Remove(connection);
        //    //    db.SaveChanges();
        //    //}
        //    return Groups.Remove( id, roomName );
        //}
    }
}