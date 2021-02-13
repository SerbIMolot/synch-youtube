using Chat.Models;
using Chat.Repository;
using Chat.Controllers.Attriburtes;
using Chat.Views.Room;
using Microsoft.AspNet.Identity;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Web.Mvc;

namespace Chat.Controllers
{
    public class RoomController : Controller
    {
        private readonly UserManager<ApplicationUser> userManager;
        private static readonly Mutex mutexObj = new Mutex();

        public RoomController()
        {

        }

        private RoomController(UserManager<ApplicationUser> userManager)
        {
            this.userManager = userManager;
        }
        // GET: Room

        public ActionResult Index()
        {
            RoomIndexVM roomVM = new RoomIndexVM()
            {
                newRoom = new ConversationRoom(),
                userRooms = new List<ConversationRoom>()
            };

            using (UnitOfWork db = new UnitOfWork())
            {

                ApplicationUser user = db.userRepository.GetById(User.Identity.GetUserId());
                IEnumerable<ConversationRoom> rooms = db.conversationRoomRepository.GetList();

                List<ConversationRoom> room = new List<ConversationRoom>();
                foreach (ConversationRoom r in rooms)
                {
                    if (r.Users.Contains(user))
                    {
                        room.Add(r);
                    }
                }

                roomVM.userRooms = room;
            }

            return View(roomVM);
        }
        public ActionResult LoadGrid(ChatViewModel model)
        {
            return PartialView("view", model);
        }
        [HttpPost]
        public ActionResult UpdateGrid(string roomName)
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
            using (UnitOfWork db = new UnitOfWork())
            {
                List<ConversationRoom> rooms = db.conversationRoomRepository.GetByUserId(User.Identity.GetUserId());
                chat.currentRoomName = roomName;

                foreach (ConversationRoom room in rooms)
                {
                    Message msg = db.messageRepository.GetList().OrderByDescending(m => m.messageId).Where(m => m.Room.RoomName == room.RoomName).FirstOrDefault();

                    if (msg != null)
                    {

                    }
                    else
                    {
                        Message message = new Message()
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
        public ActionResult UpdateChat(string roomName)
        {
            mutexObj.WaitOne();

            roomName = Regex.Replace(roomName, @"[^A-Za-z0-9]+", "");
            ChatViewModel chat = new ChatViewModel()
            {
                messageHistory = new List<Message>()
            };
            using (UnitOfWork db = new UnitOfWork())
            {
                List<ConversationRoom> rooms = db.userRepository.GetById(User.Identity.GetUserId()).Rooms.ToList();
                chat.messageHistory = db.messageRepository.GetByRoomName(roomName).OrderBy(m => m.sendDate).ToList();
                chat.currentRoomName = roomName;


                ViewBag.userName = User.Identity.GetUserName();
                mutexObj.ReleaseMutex();
            }
            return PartialView("ChatMsgView", chat);
        }
        [HttpPost]
        public ActionResult DeleteChat(string roomName)
        {
            mutexObj.WaitOne();

            roomName = Regex.Replace(roomName, @"[^A-Za-z0-9]+", "");
            string changeRoom = null;
            using (UnitOfWork db = new UnitOfWork())
            {
                ConversationRoom room = db.conversationRoomRepository.GetById(roomName);
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

                List<ConversationRoom> rooms = db.conversationRoomRepository.GetByUserId(User.Identity.GetUserId()).ToList();
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
            using (ApplicationDbContext db = new ApplicationDbContext())
            {
                List<ConversationRoom> rooms = db.Users.Find(User.Identity.GetUserId()).Rooms;
                chat.messageHistory = db.Messages.Where(m => m.Room.RoomName == roomName).ToList();
                foreach (ConversationRoom room in rooms)
                {
                    Message msg = db.Messages.OrderByDescending(m => m.messageId).Where(m => m.Room.RoomName == room.RoomName).FirstOrDefault();

                    if (msg != null)
                    {

                    }
                }
            }
            return PartialView("view", chat);
        }
        [Route("Chat/{id}")]
        public ActionResult Chat(string id)
        {
            mutexObj.WaitOne();
            if (id == null)
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
            using (UnitOfWork db = new UnitOfWork())
            {
                ConversationRoom room = db.conversationRoomRepository.GetByRoomName(id);
                ApplicationUser user = db.userRepository.GetById(User.Identity.GetUserId());
                if (room != null && room.Users.Contains(user))
                {
                    chat.messageHistory = db.messageRepository.GetByRoomName(id).ToList();
                    chat.currentRoomName = id;
                    chat.room = room;
                    chat.currentRoomTime = 0.0f;
                    chat.currentRoomVideo = null;
                }
                else if (room != null && !room.Users.Contains(user))
                {
                    mutexObj.ReleaseMutex();
                    return RedirectToAction("JoinRoom", room.RoomName);
                }

            }
            mutexObj.ReleaseMutex();
            return View(chat);
        }
        //
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

       // [Route("Create/{roomName}")]
        [HttpPost]
        public ActionResult CreateRoom(string roomName)
        {
            mutexObj.WaitOne();

            roomName = Regex.Replace(roomName, @"[^A-Za-z0-9]+", "");
            using (UnitOfWork db = new UnitOfWork())
            {
                //if (db.conversationRoomRepository.GetById(roomName) != null)
                //{
                //    return RedirectToRoute("Error", "AlreadyCreated");
                //}

                ConversationRoom room = db.conversationRoomRepository.GetById(roomName);
                if (room == null)
                {
                    room = new ConversationRoom()
                    {
                        RoomName = roomName
                    };
                    ApplicationUser user = db.userRepository.GetById(User.Identity.GetUserId());
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
                return Redirect("/Chat/" + room.RoomName);
                //return RedirectToAction("Chat", "Room", room.RoomName);
                //return Redirect(Url.Action("Chat/" + room.RoomName,"Room"));
                //return Redirect("/Room/Chat/" + room.RoomName);
            }
        }
        [HttpPost]
        public ActionResult JoinRoom(string roomName)
        {
            mutexObj.WaitOne();
            roomName = Regex.Replace(roomName, @"[^A-Za-z0-9]+", "");
            using (UnitOfWork db = new UnitOfWork())
            {
                ConversationRoom room = db.conversationRoomRepository.GetById(roomName);
                if (room == null)
                {
                    mutexObj.ReleaseMutex();
                    return RedirectToRoute("Error", "Not exist");
                }


                ApplicationUser user = db.userRepository.GetById(User.Identity.GetUserId());
                if (room != null && user != null)
                {

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
            return Redirect("/Chat/" + roomName);
        }
        [HttpGet]
        public ActionResult CreateChatRoom()
        {
            return PartialView("CreatingChatRoom");
        }
        [HttpPost]
        public ActionResult CreateChatRoom(string roomName)
        {
            mutexObj.WaitOne();

            roomName = Regex.Replace(roomName, @"[^A-Za-z0-9]+", "");
            using (UnitOfWork db = new UnitOfWork())
            {
                if (db.conversationRoomRepository.GetById(roomName) != null)
                {
                    return RedirectToRoute("Error", "AlreadyCreated");
                }

                if (roomName != null)
                {
                    ApplicationUser user = db.userRepository.GetById(User.Identity.GetUserId());
                    ConversationRoom room = null;

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

                List<ConversationRoom> rooms = db.conversationRoomRepository.GetByUserId(User.Identity.GetUserId());
                chat.messageHistory = db.messageRepository.GetByRoomName(roomName);
                chat.currentRoomName = roomName;
                foreach (ConversationRoom room in rooms)
                {

                    Message msg = db.messageRepository.GetByRoomName(room.RoomName).OrderByDescending(m => m.messageId).FirstOrDefault();

                    if (msg != null)
                    {

                    }
                    else
                    {
                        Message message = new Message()
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
        public ActionResult JoinChat(string roomName)
        {
            if (User.IsInRole("temporary"))
            {

            }
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