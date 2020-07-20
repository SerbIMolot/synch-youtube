using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;
using System.Net;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Upload;
using Google.Apis.Util.Store;
using Google.Apis.YouTube.v3;
using Google.Apis.YouTube.v3.Data;
using Chat.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Web.UI.WebControls.WebParts;
using System.Threading;
using Chat.Views.Room;
using Microsoft.Ajax.Utilities;
using Chat.Repository;
using System.Security.Cryptography;
using System.Text.RegularExpressions;

namespace Chat.Controllers
{
    public class RoomController : Controller
    {
        private UserManager<ApplicationUser> userManager;
        private static Mutex mutexObj = new Mutex();

        public RoomController()
        {
            
        }
        RoomController(UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
        }
        // GET: Room
        [Authorize]
        public ActionResult Index()
        {
            RoomIndexVM roomVM = new RoomIndexVM()
            {
                newRoom = new ConversationRoom(),
                userRooms = new List<ConversationRoom>()
            };

            using (var db = new UnitOfWork() )
            {

                ApplicationUser user = db.userRepository.GetById(User.Identity.GetUserId());
                var rooms = db.conversationRoomRepository.GetList();

                List<ConversationRoom> room = new List<ConversationRoom>();
                foreach ( var r in rooms )
                {
                    if( r.Users.Contains( user ))
                    {
                        room.Add(r);
                    }
                }

                roomVM.userRooms = room;
            }

            return View(roomVM);
        }
        public ActionResult LoadGrid( ChatViewModel model )
        {
            return PartialView("view", model);
        }
        [HttpPost]
        public ActionResult UpdateGrid( string roomName )
        {
            mutexObj.WaitOne();
            ChatViewModel chat = new ChatViewModel()
            {
                messageHistory = new List<Message>()
            };
            //if (roomName == null)
            //{
            //    return PartialView("view", chat);
            //}
            using (var db = new UnitOfWork())
            {
                var rooms = db.conversationRoomRepository.GetByUserId(User.Identity.GetUserId());
                chat.currentRoomName = roomName;

                foreach (var room in rooms)
                {
                    var msg = db.messageRepository.GetList().OrderByDescending(m => m.messageId).Where(m => m.Room.RoomName == room.RoomName).FirstOrDefault();

                    if (msg != null)
                    {

                    }
                    else
                    {
                        var message = new Message()
                        {
                            Room = room,
                            message = "",
                        };
                    }
                }
            }
            mutexObj.ReleaseMutex();

            return PartialView("view", chat);
        }
        [HttpGet]
        public ActionResult YoutubePlayer()
        {
            return PartialView("YoutubePlayer");
        }
        [HttpPost]
        public ActionResult UpdateChat( string roomName )
        {
            mutexObj.WaitOne();

            roomName = Regex.Replace(roomName, @"[^A-Za-z0-9]+", "");
            ChatViewModel chat = new ChatViewModel()
            {
                messageHistory = new List<Message>()
            };
            using (var db = new UnitOfWork())
            {
                var rooms = db.userRepository.GetById(User.Identity.GetUserId()).Rooms.ToList();
                chat.messageHistory = db.messageRepository.GetByRoomName(roomName).OrderBy(m => m.sendDate).ToList();
                chat.currentRoomName = roomName;


                ViewBag.userName = User.Identity.GetUserName();
                mutexObj.ReleaseMutex();
            }
            return PartialView("ChatMsgView", chat);
        }
        [HttpPost]
        public ActionResult DeleteChat( string roomName )
        {
            mutexObj.WaitOne();

            roomName = Regex.Replace(roomName, @"[^A-Za-z0-9]+", "");
            string changeRoom = null;
            using (var db = new UnitOfWork())
            {
                var room = db.conversationRoomRepository.GetById(roomName);
                if (room != null)
                {
                    List<Message> messageHistory = db.messageRepository.GetByRoomName(roomName).OrderBy(m => m.sendDate).ToList();

                    if (messageHistory.Count > 0)
                    {
                        db.messageRepository.DeleteRange(messageHistory);
                    }

                    db.conversationRoomRepository.Delete(room);
                }

                db.Save();

                var rooms = db.conversationRoomRepository.GetByUserId(User.Identity.GetUserId()).ToList();
                if (rooms.Count > 0)
                {
                    changeRoom = rooms.First().RoomName;
                }

                ViewBag.userName = User.Identity.GetUserName();
            }
            mutexObj.ReleaseMutex();

            return UpdateGrid(changeRoom);
        }
        [HttpPost]
    public ActionResult ProcessLogEntries(
    string txtSearchFor, string txtDateStart,
    string txtDateStop, string txtSource, string roomName)
        {
            ChatViewModel chat = new ChatViewModel()
            {
                messageHistory = new List<Message>()
            };
            using (var db = new ApplicationDbContext())
            {
                var rooms = db.Users.Find(User.Identity.GetUserId()).Rooms;
                chat.messageHistory = db.Messages.Where(m => m.Room.RoomName == roomName).ToList();
                foreach (var room in rooms)
                {
                    var msg = db.Messages.OrderByDescending(m => m.messageId).Where(m => m.Room.RoomName == room.RoomName).FirstOrDefault();

                    if (msg != null)
                    {

                    }
                }
            }
            return PartialView("view", chat);
        }
        [Authorize]
        public ActionResult Chat(string id)
        {
            mutexObj.WaitOne();
            if( id == null )
            {
                //mutexObj.ReleaseMutex();
                //return RedirectToAction("Index","Room");
            }
            else
            {

                id = Regex.Replace(id, @"[^A-Za-z0-9]+", "");
            }

            ChatViewModel chat = new ChatViewModel()
            {
                messageHistory = new List<Message>()
            };
            ViewBag.userName = User.Identity.GetUserName();
            ViewBag.currentRoom = id;
            using (var db = new UnitOfWork())
            {
                var room = db.conversationRoomRepository.GetByRoomName(id);
                var user = db.userRepository.GetById(User.Identity.GetUserId());
                if( room != null  && room.Users.Contains(user) )
                {
                    chat.messageHistory = db.messageRepository.GetByRoomName(id).ToList();
                    chat.currentRoomName = id;
                    chat.room = room;
                    chat.currentRoomTime = 0.0f;
                    chat.currentRoomVideo = null;
                }
                else if(room != null && !room.Users.Contains( user ) )
                {
                    mutexObj.ReleaseMutex();
                    return JoinRoom(id );
                }
                
            }
            mutexObj.ReleaseMutex();
            return View(chat);
        }
        //[Authorize]
        //public ActionResult Chat(string id)
        //{
        //    mutexObj.WaitOne();
        //    if( id == null )
        //    {
        //        //mutexObj.ReleaseMutex();
        //        //return RedirectToAction("Index","Room");
        //    }
        //    ChatViewModel chat = new ChatViewModel()
        //    {
        //        messageHistory = new List<Message>()
        //    };
        //    ViewBag.userName = User.Identity.GetUserName();
        //    ViewBag.currentRoom = id;
        //    using (var db = new UnitOfWork())
        //    {
        //        var room = db.conversationRoomRepository.GetByRoomName(id);
        //        var user = db.userRepository.GetById(User.Identity.GetUserId());
        //        if( room != null  && room.Users.Contains(user) )
        //        {
        //            chat.messageHistory = db.messageRepository.GetByRoomName(id).ToList();
        //            chat.currentRoomName = id;
        //            chat.room = room;
        //            chat.currentRoomTime = 0.0f;
        //            chat.currentRoomVideo = null;
        //        }
        //        else if( id != null )
        //        {
        //           // mutexObj.ReleaseMutex();
        //           // return JoinRoom(id );
        //        }
        //        
        //    }
        //    mutexObj.ReleaseMutex();
        //    return View(chat);
        //}
        [HttpPost]
        public ActionResult CreateRoom( string roomName )
        {
            mutexObj.WaitOne();

            roomName = Regex.Replace(roomName, @"[^A-Za-z0-9]+", "");
            using (var db = new UnitOfWork())
            {
               //if (db.conversationRoomRepository.GetById(roomName) != null)
               //{
               //    return RedirectToRoute("Error", "AlreadyCreated");
               //}

                var room = db.conversationRoomRepository.GetById(roomName);
                if (room == null)
                {
                    room = new ConversationRoom()
                    {
                        RoomName = roomName
                    };
                    var user = db.userRepository.GetById(User.Identity.GetUserId());
                    room.currentAdmin = user;

                    db.userRepository.Update(user);
                    room.Users.Add(user);

                    db.conversationRoomRepository.Create(room);

                    user.Rooms.Add(room);


                    db.Save();

                }
                else
                {
                    mutexObj.ReleaseMutex();
                    return RedirectToRoute("Error", "CantFindRoom");
                }
                mutexObj.ReleaseMutex();
                return RedirectToAction("Chat/"+ room.RoomName, "Room");
            }
        }
        //[HttpPost]
        //public ActionResult CreateRoom( RoomIndexVM roomVM )
        //{
        //    mutexObj.WaitOne();
        //    using (var db = new UnitOfWork())
        //    {
        //        if (db.conversationRoomRepository.GetById(roomVM.newRoom.RoomName) != null)
        //        {
        //            return RedirectToRoute("Error", "AlreadyCreated");
        //        }
        //
        //
        //        if (roomVM.newRoom != null)
        //        {
        //            var user = db.userRepository.GetById(User.Identity.GetUserId());
        //            roomVM.newRoom.currentAdmin = db.userRepository.GetById( User.Identity.GetUserId() );
        //            user.Rooms.Add(roomVM.newRoom);
        //
        //            db.userRepository.Update(user);
        //            roomVM.newRoom.Users.Add(user);
        //            db.conversationRoomRepository.Create(roomVM.newRoom);
        //
        //            db.Save();
        //
        //        }
        //        else
        //        {
        //            mutexObj.ReleaseMutex();
        //            return RedirectToRoute("Error", "CantFindRoom");
        //        }
        //    }
        //    mutexObj.ReleaseMutex();
        //    return RedirectToAction("Chat/"+ roomVM.newRoom.RoomName, "Room");
        //}
        //private string GenerateToken()
        //{
        //    byte[] time = BitConverter.GetBytes(DateTime.UtcNow.ToBinary());
        //    byte[] key = Guid.NewGuid().ToByteArray();
        //    string token = Convert.ToBase64String(time.Concat(key).ToArray());
        //
        //    return token;
        //}
        //private bool ValidateToken( string token )
        //{
        //    byte[] data = Convert.FromBase64String(token);
        //    Date
        //    return result;
        //}
        [HttpPost]
        public ActionResult JoinRoom( string roomName )
        {
            mutexObj.WaitOne();
            roomName = Regex.Replace(roomName, @"[^A-Za-z0-9]+", "");
            using (var db = new UnitOfWork())
            {
                var room = db.conversationRoomRepository.GetById(roomName);
                if ( room == null)
                {
                    mutexObj.ReleaseMutex();
                    return RedirectToRoute("Error", "Not exist");
                }


                var user = db.userRepository.GetById(User.Identity.GetUserId());
                if (room != null && user != null)
                {
                    //room.currentAdmin = user;

                    user.Rooms.Add(room);
                    room.Users.Add(user);

                    db.userRepository.Update(user);
                    db.conversationRoomRepository.Update(room);

                    db.Save();

                }
                else
                {
                    mutexObj.ReleaseMutex();
                    return RedirectToRoute("Error", "CantFindRoom");
                }
            }
            mutexObj.ReleaseMutex();
            return RedirectToAction("Chat/"+ roomName, "Room");
        }
        [HttpGet]
        public ActionResult CreateChatRoom()
        {
            return PartialView("CreatingChatRoom");
        }
        [HttpPost]
        public ActionResult CreateChatRoom( string roomName  )
        {
            mutexObj.WaitOne();

            roomName = Regex.Replace(roomName, @"[^A-Za-z0-9]+", "");
            using (var db = new UnitOfWork())
            {
                if (db.conversationRoomRepository.GetById(roomName) != null)
                {
                    return RedirectToRoute("Error", "AlreadyCreated");
                }

                if (roomName != null)
                {
                    var user = db.userRepository.GetById(User.Identity.GetUserId());
                    ConversationRoom room = null;
                    //using (RijndaelManaged myRijndael = new RijndaelManaged())
                    //{
                    //
                    //    try
                    //    {
                    //        myRijndael.GenerateKey();
                    //        myRijndael.GenerateIV();
                    //        // Encrypt the string to an array of bytes. 
                    //        byte[] encrypted = RijndaelEncryption.EncryptStringToBytes(GenerateToken(), myRijndael.Key, myRijndael.IV);
                    //
                    //        // Decrypt the bytes to a string. 
                    //        string roundtrip = RijndaelEncryption.DecryptStringFromBytes(encrypted, myRijndael.Key, myRijndael.IV);
                    //        room = new ConversationRoom()
                    //        {
                    //            RoomName = roomName,
                    //            key = myRijndael.Key,
                    //            IV = myRijndael.IV
                    //        };
                    //        Console.WriteLine("Round Trip: {0}", encrypted);
                    //        Console.WriteLine("Round Trip: {0}", roundtrip);
                    //    }
                    //    catch (Exception e)
                    //    {
                    //        Console.WriteLine("Error: {0}", e.Message);
                    //    }
                    //}
                    room = new ConversationRoom()
                    {
                        RoomName = roomName,
                        currentAdmin = user
                    };

                    user.Rooms.Add(room);

                    db.userRepository.Update(user);

                    room.Users.Add(user);

                    db.conversationRoomRepository.Create(room);

                    db.Save();

                }
                else
                {
                    mutexObj.ReleaseMutex();
                    return RedirectToRoute("Error", "CantFindRoom");
                }

                ChatViewModel chat = new ChatViewModel()
                {
                    messageHistory = new List<Message>()
                };

                var rooms = db.conversationRoomRepository.GetByUserId(User.Identity.GetUserId());
                chat.messageHistory = db.messageRepository.GetByRoomName(roomName);
                chat.currentRoomName = roomName;
                foreach (var room in rooms)
                {

                    var msg = db.messageRepository.GetByRoomName(room.RoomName).OrderByDescending(m => m.messageId).FirstOrDefault();

                    if (msg != null)
                    {

                    }
                    else
                    {
                        var message = new Message()
                        {
                            Room = room,
                            message = "",
                        };
                    }
                }

                ViewBag.userName = User.Identity.GetUserName();
                mutexObj.ReleaseMutex();
                
                return PartialView("view", chat);
            }
        }

        [HttpGet]
        public ActionResult JoinChat( string roomName )
        {
            return PartialView("JoiningChatRoom");
        }

        [HttpGet]
        public ActionResult JoinChatRoom()
        {
            return PartialView("JoiningChatRoom");
        }
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                
            }

            base.Dispose(disposing);
        }
    }
}