using System;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using System.Collections.Concurrent;
using Microsoft.AspNet.SignalR;
using System.Web;
using Chat.Repository;
using System.Web.WebPages;
using System.Collections.Generic;
using YoutubeExplode;
using System.Web.Helpers;
using Newtonsoft.Json;
using System.IO;
using System.Data.Entity.ModelConfiguration.Conventions;
using Google.Apis.YouTube.v3.Data;
using log4net;

namespace Chat.Models
{
    public class GroupHubs : Hub
    {
        ConcurrentDictionary<string, float> roomTimes;
        ConcurrentDictionary<string, string> CurrentRoomsOfUsers;
        static ConcurrentDictionary<string, List<YoutubeVideo>> VideosInRoom = new ConcurrentDictionary<string, List<YoutubeVideo>>();
        List<ChatViewModel> currentRooms;
        private static readonly ILog Log = LogManager.GetLogger(typeof(GroupHubs));
        public GroupHubs()
        {
            CurrentRoomsOfUsers = new ConcurrentDictionary<string, string>();
            roomTimes = new ConcurrentDictionary<string, float>();
            currentRooms = new List<ChatViewModel>();
        }
        public override Task OnConnected( )
        {
            using (var db = new UnitOfWork())
            {
                var user = db.userRepository.GetById(Context.User.Identity.GetUserId());

                if (user != null )
                {


                        Connection connection = new Connection
                        {
                            ConnectionID = Context.ConnectionId,
                            UserAgent = Context.Request.Headers["User-Agent"],
                            Connected = true
                        };

                        user.currentConnectionId = Context.ConnectionId;

                        user.Connections.Add(connection);

                        db.connectionsRepository.Create(connection);

                        db.userRepository.Update(user);
                        db.Save();

                    //foreach (var item in user.Rooms)
                    //{
                    //    Groups.Add(Context.ConnectionId, item.RoomName);
                    //    foreach( var con in user.Connections )
                    //    {
                    //        System.Diagnostics.Debug.WriteLine("CONNECTION " + Context.User.Identity.Name + " curr connection " + Context.ConnectionId + " in array " + con.ConnectionID.ToString() + " State " + con.Connected );
                    //
                    //    }
                    //    Clients.Group(item.RoomName).SendAsync("Send", $"{Context.ConnectionId} has joined the group {item.RoomName}.");
                    //}


                    Clients.Caller.onConnected(Context.ConnectionId, user.UserName);
                }
            }
            return base.OnConnected();
        }
        public void UpdatePlaylist( string roomName )
        {
            using ( var db = new UnitOfWork() )
            {
                var room = db.conversationRoomRepository.GetById(roomName);
                if( room != null && VideosInRoom.ContainsKey(roomName))
                {
                    Clients.Caller.changeVideoSource(ToJsonRange(VideosInRoom[roomName]));
                }
            }
        }
        public void LoadMessageHistory( string roomName )
        {
            using (var db = new UnitOfWork())
            {
                var msges = db.messageRepository.GetByRoomName(roomName).ToList();

                foreach (var msg in msges)
                {
                    if (msg.SenderUserId != Context.User.Identity.GetUserId())
                    {
                        Clients.Caller.addMessage(msg.SenderUser.UserName, msg.message);

                    }
                    else
                    {
                        Clients.Caller.addCallerMessage(msg.SenderUser.UserName, msg.message);

                    }
                }
            }
        }
        public void UpdateRoomCurrentTime( string roomName, float time )
        {
            if( !roomName.IsEmpty() )
            {
                roomTimes[roomName] = time;
            }
        }
        public void SwitchAdminForRoom( string roomName, string userName )
        {
            if (!roomName.IsEmpty() && !userName.IsEmpty() )
            {
                using ( var db = new UnitOfWork() )
                {
                    var room = db.conversationRoomRepository.GetByRoomName(roomName);
                    
                    if( room != null )
                    {
                        if( room.currentAdmin.UserName == userName && room.Users.Count > 1 )
                        {
                            var random = new Random();
                            for( bool quit =  false; quit != true; )
                            {

                                int index = random.Next(room.Users.Count);
                                if( room.Users[index].UserName != userName )
                                {
                                    room.currentAdmin = room.Users[index];
                                    quit = true;
                                    Log.Debug("Old admin: " + userName + " New admin: " + room.currentAdmin.UserName );
                                    db.Save();
                                }
                            }
                        }
                        UpdateUsersInRoom(roomName);
                    }

                }
            }
        }
        public void ChangePlaylistItem( string roomName, int id )
        {
            if (!roomName.IsEmpty())
            {
                using (var db = new UnitOfWork())
                {
                    
                    Clients.OthersInGroup(roomName).changePlaylistItem(id);
                    
                }
            }
        }
        public void GetUsersInRoom(string roomName)
        {
            if (!roomName.IsEmpty())
            {
                using (var db = new UnitOfWork())
                {
                    var room = db.conversationRoomRepository.GetByRoomName(roomName);
                    
                    if( room.Users.Count > 0 )
                    {
                        Clients.Caller.updateUsersInRoom( ToJsonRange(room.Users), room );
                    }
                }
            }
        }
        public void UpdateUsersInRoom(string roomName)
        {
            if (!roomName.IsEmpty())
            {
                using (var db = new UnitOfWork())
                {
                    var room = db.conversationRoomRepository.GetByRoomName(roomName);
                    
                    if( room != null && room.Users.Count > 0 )
                    {
                        Clients.Group( roomName ).updateUsersInRoom( ToJson(room) );
                    }
                }
            }
        }
        public void RequestTimeSynch( string roomName, string userName )
        {
            if( !roomName.IsEmpty() )
            {
                using( var db = new UnitOfWork() )
                {
                    var room = db.conversationRoomRepository.GetByRoomName(roomName);
                    if( room != null )
                    {

                        var connection = room.currentAdmin.currentConnectionId;//Connections.SingleOrDefault(c => c.Connected == true);
                        if( connection != null  && room.currentAdmin.Id != Context.User.Identity.GetUserId())
                        {
                            Clients.Client(connection).synchWith(userName);
                        }
                    }
                }
            }
        }
        public  void SetTimeForOtherClient( string clientName, float time, int playlistIndex )
        {
            if( !clientName.IsEmpty() )
            {
                using ( var db = new UnitOfWork() )
                {
                    var users = db.userRepository.GetList().ToList();

                    var user = users.SingleOrDefault( u => u.UserName == clientName );

                    if( user != null )
                    {
                        var connection = user.currentConnectionId;

                        Clients.Client(connection).setPlaylistIndexTime(playlistIndex, time);

                    }

                }
            }
        }

        public void ValueForCallerRoomTime( string roomName, float time )
        {
            using (var db = new UnitOfWork())
            {
                var room = db.conversationRoomRepository.GetByRoomName(roomName);

                if( room != null )
                {
                    Clients.Caller.setTime(time);
                }
            }
        }
        public void SetCallerCurrentTime( string roomName )
        {
            using (var db = new UnitOfWork())
            {
                var room = db.conversationRoomRepository.GetByRoomName(roomName);

                if( room != null )
                {
                    //Clients.Caller.(roomTimes[roomName]);
                }
            }
        }
        public void SwitchCurrentRoom( string newRoomName )
        {
            using (var db = new UnitOfWork())
            {
                var room = db.conversationRoomRepository.GetByRoomName(newRoomName);
                var user = db.userRepository.GetById(Context.User.Identity.GetUserId());
                if ( room != null && user != null )
                {
                    var newCurrentRoom = currentRooms.FirstOrDefault(r => r.room.RoomName == newRoomName);
                    if( newCurrentRoom == null )
                    {
                        newCurrentRoom = new ChatViewModel();
                        newCurrentRoom.room.RoomName = room.RoomName;
                        newCurrentRoom.room.currentVideoId = 0;
                        newCurrentRoom.currentRoomTime = 0.0f;
                        newCurrentRoom.room.Users.Add(user);

                        currentRooms.Add(newCurrentRoom);
                    }
                    else
                    {
                        newCurrentRoom.room.Users.Add(user);
                        Clients.Caller().timeUpdate(newCurrentRoom.currentRoomTime);
                    }

                    CurrentRoomsOfUsers[HttpContext.Current.User.Identity.GetUserId()] = newRoomName;
                    float currentTime = 0;
                    string userName;
                    foreach ( var rUser in room.Users )
                    {
                        if( !CurrentRoomsOfUsers.TryGetValue(rUser.UserName, out userName) )
                        {
                            continue;
                        }
                        var connection = rUser.Connections.SingleOrDefault( c => c.ConnectionID == Context.ConnectionId);
                        if( connection != null )
                        {
                            Clients.Client( connection.ConnectionID ).forceTimeUpdateServer();

                        }
                        Clients.Caller().timeUpdate(roomTimes[newRoomName]);
                    }
                    
                    //var users CurrentRoomsOfUsers[newRoomName];
                    //Clients.
                }
            }
        }
        public void SetRoomTime( string roomName )
        {
            using (var db = new UnitOfWork())
            {
                var room = db.conversationRoomRepository.GetByRoomName(roomName);

                if( room != null )
                {
                    //List<ConnectionsId>
                    var currentState = currentRooms.SingleOrDefault( r => r.room.RoomName == room.RoomName );
                    foreach( var user in room.Users )
                    {
                        if( currentState.room.Users.Contains( user ) )
                        {

                        }

                    }
                    foreach( var user in currentState.room.Users)
                    {
                        //var connection = user.Connections()
                        Clients.Client( roomName ).setTime( roomTimes[roomName] );

                    }    
                }
            }
        }

        public void SendGroupMessage(string roomName, string message)
        {
            var name = Context.User.Identity.Name;
            using (var db = new UnitOfWork())
            {
                var room = db.conversationRoomRepository.GetById(roomName);
                var user = db.userRepository.GetById(Context.User.Identity.GetUserId());

                if (room == null)
                {
                    Clients.Caller.showErrorMessage("Could not find that room.");
                }
                else
                {
                     var connections = user.Connections.Where( c => c.Connected == true );

                    var msg = new Message()
                    {
                        Room = room,
                        SenderUser = user,
                        SenderUserId = user.Id,
                        message = message,
                        sendDate = DateTime.Now
                    };

                        Clients.OthersInGroup(roomName).addMessage(Context.User.Identity.Name, message, roomName, msg.sendDate.ToString());
                        Clients.Caller.addCallerMessage(Context.User.Identity.Name, message, msg.sendDate.ToString());



                    db.messageRepository.Create(msg);
                    db.Save();

                }
            }
        }
        public void JoinRoom(string roomName)
        {

            using (var db = new UnitOfWork())
            {
                var room = db.conversationRoomRepository.GetById(roomName);

                if (room != null)
                {
                    ApplicationUser user = db.userRepository.GetById(Context.User.Identity.GetUserId());

                    //user.Rooms.Add(room);
                    //db.userRepository.Update(user);
                    //
                    //room.Users.Add(user);
                    //db.conversationRoomRepository.Update(room);
                    //
                    //db.Save();

                    Groups.Add(Context.ConnectionId, roomName);

                }
            }
        }
        public void RemoveFromRoom(string roomName)
        {

            using (var db = new UnitOfWork())
            {
                var room = db.conversationRoomRepository.GetById(roomName);
                if (room != null)
                {
                    ApplicationUser user = db.userRepository.GetById(Context.User.Identity.GetUserId());

                    room.Users.Remove(user);
                    user.Rooms.Remove(room);

                    db.userRepository.Update(user);
                    db.conversationRoomRepository.Update(room);

                    db.Save();

                    Groups.Remove(Context.ConnectionId, roomName);
                }
            }
        }
        public void GroupPlay(string roomName)
        {
            if( roomName != null )
            {
                Clients.OthersInGroup(roomName).GroupPlay();
            }
        }
        public void GroupPause(string roomName)
        {
            if (roomName != null)
            {
                Clients.OthersInGroup(roomName).GroupPause();
            }
        }
        public void TimeUpdate(string roomName, float time)
        {
            if (roomName != null)
            {
                roomTimes[roomName] = time;
                Clients.OthersInGroup(roomName).timeUpdate(time);
            }
        }
        public void UpdateRoomTime( string roomName, float time )
        {
                roomTimes[roomName] = time;
        }
        public void GetTimeForNewJoin(string roomName)
        {
            Clients.OthersInGroup(roomName).forceTimeUpdateServer();
            Clients.Caller.timeUpdate(roomTimes[roomName]);
        }
        private static readonly object SynchronousReadLock = new object();
        //"[{"sources":[{"src":"www.youtube.com/watch?v=1cHXjnli2fI","type":"video/youtube"}],"poster":"https://img.youtube.com/vi/1cHXjnli2fI/mqdefault.jpg"},{"sources":[{"src":"www.youtube.com/watch?v=65r_1TzJXaQ","type":"video/youtube"}],"poster":"https://img.youtube.com/vi/65r_1TzJXaQ/mqdefault.jpg"},{"sources":[{"src":"www.youtube.com/watch?v=wuYPnkDbFFU","type":"video/youtube"}],"poster":"https://img.youtube.com/vi/wuYPnkDbFFU/mqdefault.jpg"},{"sources":[{"src":"www.youtube.com/watch?v=xU-3Zdei1N0","type":"video/youtube"}],"poster":"https://img.youtube.com/vi/xU-3Zdei1N0/mqdefault.jpg"},]"
        public async Task<IEnumerable<YoutubeVideo>> ChangeVideoSource(string roomName, string source)
        {
            if (roomName != null)
            {
                using (var db = new UnitOfWork())
                {
                    var room = db.conversationRoomRepository.GetById(roomName);

                    var youtube = new YoutubeClient();
                    List<YoutubeVideo> newVideos = new List<YoutubeVideo>();

                    if (source.Contains("list="))
                    {
                        var playlist = await youtube.Playlists.GetAsync(source);

                        foreach (var vid in await youtube.Playlists.GetVideosAsync(playlist.Id))
                        {
                            var newVid = new YoutubeVideo()
                            {
                                source = "https://www.youtube.com/watch?v=" + vid.Id,
                                poster = vid.Thumbnails.MediumResUrl,
                                title = vid.Title,
                                roomName = roomName

                            };
                            lock (SynchronousReadLock)
                            {
                                newVideos.Add(newVid);
                            }
                        }
                        //VideosInRoom.AddOrUpdate( roomName, newVideos, (key, oldValue) => { oldValue.AddRange(newVideos); return oldValue; });

                    }
                    else
                    {
                        var video = await youtube.Videos.GetAsync(source);
                        var newVid = new YoutubeVideo()
                        {
                            source = "https://www.youtube.com/watch?v=" + video.Id,
                            poster = video.Thumbnails.MediumResUrl,
                            title = video.Title,
                            duration = video.Duration.TotalSeconds,
                            thumbnail = video.Thumbnails.StandardResUrl,
                            roomName = roomName
                        };
                        lock (SynchronousReadLock)
                        {
                            newVideos.Add(newVid);
                        };
                    }
                    lock (SynchronousReadLock)
                    {
                        //List<YoutubeVideo> videosInRoomTemp;
                        //if (VideosInRoom.TryGetValue(roomName, out videosInRoomTemp))
                        //{
                        //
                        //    videosInRoomTemp.AddRange(newVideos);
                        //}
                        //else
                        //{
                        //    VideosInRoom.TryAdd(roomName, newVideos);
                        //
                        //}
                        VideosInRoom.AddOrUpdate(roomName, new List<YoutubeVideo>(newVideos), (k, v) => { v.AddRange(newVideos); return v; });
                    }
                    Log.Debug("APP DOMAIN ID = " + AppDomain.CurrentDomain.Id);


                    //newVideos = JsonConvert.SerializeObject(room.RoomVideos);

                    //room.RoomVideos.AddRange( db.VideoRepository.CreateRange( newVideos ) );
                    //db.conversationRoomRepository.Update(room);

                    //db.Save();

                    Clients.Group(roomName).changeVideoSource(ToJsonRange(VideosInRoom[roomName]));
                    
                    //return VideosInRoom[roomName];
                }
            }
            return null;
        }
        public static string ToJson( ApplicationUser user)
        {
            StringWriter sw = new StringWriter();
            JsonTextWriter writer = new JsonTextWriter(sw);

            // {
            writer.WriteStartObject();
            // "likes": ["Comedy", "Superman"]

            writer.WritePropertyName("UserName");
            writer.WriteValue(user.UserName);
            //writer.WritePropertyName("description");
            //writer.WriteValue(user.);
            

            // }
            writer.WriteEndObject();

            return sw.ToString();
        }
        public static string ToJson( ConversationRoom room )
        {
            StringWriter sw = new StringWriter();
            JsonTextWriter writer = new JsonTextWriter(sw);

            // {
            writer.WriteStartObject();
            // "likes": ["Comedy", "Superman"]

            writer.WritePropertyName("roomName");
            writer.WriteValue(room.RoomName);
            writer.WritePropertyName("Admin");
            writer.WriteRawValue(ToJson(room.currentAdmin));
            writer.WritePropertyName("Users");
            writer.WriteRawValue(ToJsonRange(room.Users));


            //writer.WritePropertyName("description");
            //writer.WriteValue(user.);
            

            // }
            writer.WriteEndObject();

            return sw.ToString();
        }
        public static string ToJsonRange( IEnumerable<ApplicationUser> users )
        {
            StringWriter sw = new StringWriter();
            JsonTextWriter writer = new JsonTextWriter(sw);

            writer.WriteStartArray();
            //writer.WriteStartObject();

            foreach (var user in users)
            {

                if (user == users.Last())
                {
                    writer.WriteRaw(ToJson(user));
                }
                else
                {
                    writer.WriteRaw(ToJson(user));
                    writer.WriteRaw(",");
                }

            }

            //writer.WriteEndObject();
            writer.WriteEndArray();

            return sw.ToString();
        }
        public static string ToJson( YoutubeVideo video )
        {
            StringWriter sw = new StringWriter();
            JsonTextWriter writer = new JsonTextWriter(sw);

            // {
            writer.WriteStartObject();
            // "likes": ["Comedy", "Superman"]

            writer.WritePropertyName("name");
            writer.WriteValue(video.title);
            writer.WritePropertyName("description");
            writer.WriteValue(video.descriprion);
            writer.WritePropertyName("duration");
            writer.WriteValue(video.duration);
            writer.WritePropertyName("sources");
            writer.WriteStartArray();
            writer.WriteStartObject();

            writer.WritePropertyName("src"); 
            writer.WriteValue(video.source);

            writer.WritePropertyName("type"); 
            writer.WriteValue("video/youtube");
            writer.WriteEndObject();
            writer.WriteEndArray();
            // "name" : "Jerry"
            writer.WritePropertyName("poster");
            writer.WriteValue(video.poster);

            writer.WritePropertyName("thumbnail");
            writer.WriteStartArray();
            writer.WriteStartObject();
            writer.WritePropertyName("srcset");
            writer.WriteValue(video.thumbnail);
            writer.WritePropertyName("type");
            writer.WriteValue("image/jpeg");
            writer.WritePropertyName("type");
            writer.WriteValue("(min-width: 200px;)");
            writer.WriteEndObject();
            writer.WriteStartObject();
            writer.WritePropertyName("src");
            writer.WriteValue(video.poster);
            writer.WriteEndObject();
            writer.WriteEndArray();


            // }
            writer.WriteEndObject();

            return sw.ToString();
        }
        public static string ToJsonRange( IEnumerable< YoutubeVideo > videos )
        {
            StringWriter sw = new StringWriter();
            JsonTextWriter writer = new JsonTextWriter(sw);

            writer.WriteStartArray();
            //writer.WriteStartObject();
            
            foreach( var video in videos )
            {

                if(video == videos.Last())
                {
                    writer.WriteRaw(ToJson(video));
                }
                else
                {
                    writer.WriteRaw(ToJson(video));
                    writer.WriteRaw(",");
                }

            }

            //writer.WriteEndObject();
            writer.WriteEndArray();

            return sw.ToString();
        }
        public override Task OnReconnected()
        {
            
            // Add your own code here.
            // For example: in a chat application, you might have marked the
            // user as offline after a period of inactivity; in that case 
            // mark the user as online again.
            return base.OnReconnected();
        }
        public override Task OnDisconnected(bool stopCalled)
        {

                using (var db = new UnitOfWork())
                {
                var user = db.userRepository.GetById(Context.User.Identity.GetUserId());
                System.Diagnostics.Debug.WriteLine("STOP CALLED  =  " + stopCalled);
                var connection = db.connectionsRepository.GetList().SingleOrDefault(c => c.ConnectionID == Context.ConnectionId && c.Connected == true);
                if (connection != null)
                {
                    connection.Connected = false;
                    db.connectionsRepository.Update(connection);
                    db.Save();
                }
                    var connections = db.connectionsRepository.GetList().Where(c => c.ConnectionID == Context.ConnectionId && c.Connected == true);
                foreach ( var con in connections )
                    {
                        System.Diagnostics.Debug.WriteLine(Context.User.Identity.Name + " curr connection " + Context.ConnectionId + " in array " + con.ConnectionID.ToString() + " State " + con.Connected ) ;
                    }
            if( stopCalled == true )
            {
                    //var connections = db.connectionsRepository.GetList().Where(c => c.ConnectionID == Context.ConnectionId && c.Connected == true);
                    foreach( var con in connections )
                    {
                        System.Diagnostics.Debug.WriteLine(Context.User.Identity.Name + " curr connection " + Context.ConnectionId + " in array " + con.ConnectionID.ToString() + " State " + con.Connected ) ;
                    }
                    connection = db.connectionsRepository.GetList().SingleOrDefault( c => c.ConnectionID == Context.ConnectionId && c.Connected == true );
                    if (connection != null)
                    {
                        connection.Connected = false;
                        db.connectionsRepository.Update(connection);
                        db.Save();
                    }
                    foreach (var con in connections)
                    {
                        System.Diagnostics.Debug.WriteLine(Context.User.Identity.Name + " curr connection " + Context.ConnectionId + " in array " + con.ConnectionID.ToString() + " State " + con.Connected);
                    }
                    //var rooms = db.conversationRoomRepository.GetByUserId(Context.User.Identity.GetUserId());
                    //foreach( var room in rooms )
                    //{
                    //    if ( room.currentAdmin.Id == Context.User.Identity.GetUserId() )
                    //    {
                    //        SwitchAdminForRoom( room.RoomName, Context.User.Identity.GetUserName() );
                    //
                    //    }
                    //    room.Users.Remove(user);
                    //    UpdateUsersInRoom(room.RoomName);
                    //
                    //}
                    //
                    Clients.Caller.onUserDisconnected(Context.User.Identity.Name);
            }

                var rooms = db.conversationRoomRepository.GetByUserId(Context.User.Identity.GetUserId());
                foreach (var room in rooms)
                {
                    if (room.currentAdmin != null && room.currentAdmin.Id == Context.User.Identity.GetUserId())
                    {
                        SwitchAdminForRoom(room.RoomName, Context.User.Identity.GetUserName());

                    }
                    room.Users.Remove(user);
                    if( room.Users.Count == 0 )
                    {
                        db.conversationRoomRepository.Delete(room);
                    }
                    else
                    {
                        UpdateUsersInRoom(room.RoomName);
                    }
                    db.Save();

                }
                user.currentConnectionId = null;
                
                }

            return base.OnDisconnected(stopCalled);
        }
    }
}