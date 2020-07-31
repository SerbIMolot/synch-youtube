using Chat.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
namespace Chat.Repository
{
    public class ConversationRoomRepository
    {
        public ApplicationDbContext db;

        public ConversationRoomRepository(ApplicationDbContext context)
        {
            db = context;
        }

        public IEnumerable<ConversationRoom> GetList()
        {
            return db.Rooms.ToList();
        }

        public ConversationRoom GetById(string id)
        {
            return db.Rooms.Find(id);
        }
        public ConversationRoom GetByIdDetached(string id)
        {
            ConversationRoom room = db.Rooms.Find(id);
            db.Entry(room).State = EntityState.Detached;
            return room;
        }
        public List<ConversationRoom> GetByUser(ApplicationUser user)
        {
            return db.Rooms.Where(m => m.Users.Contains(user)).ToList();
        }
        public List<ConversationRoom> GetByUserId(string userId)
        {
            ApplicationUser user = db.Users.SingleOrDefault(u => u.Id == userId);
            List<ConversationRoom> rooms = db.Rooms.ToList();

            List<ConversationRoom> roomsWithUser = new List<ConversationRoom>();

            foreach (ConversationRoom room in rooms)
            {
                if (room.Users.Contains(user))
                {
                    roomsWithUser.Add(room);
                }
            }
            return roomsWithUser;
        }
        public ConversationRoom GetByRoomName(string roomId)
        {
            return db.Rooms.Include(r => r.Users).Include(r => r.currentAdmin).Include(r => r.currentAdmin.Connections).SingleOrDefault(r => r.RoomName == roomId);
        }

        public void Create(ConversationRoom room)
        {
            if (room == null)
            {
                return;
            }
            db.Rooms.Add(room);
        }

        public void Update(ConversationRoom room)
        {
            db.Entry(room).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            ConversationRoom room = db.Rooms.Find(id);
            if (room != null)
            {
                using (UnitOfWork unit = new UnitOfWork())
                {
                    List<Message> messages = unit.messageRepository.GetByRoom(room);
                    unit.messageRepository.DeleteRange(messages);
                    unit.Save();
                }
                db.Rooms.Remove(room);

            }
        }
        public void DeleteRange(IEnumerable<ConversationRoom> roomList)
        {
            foreach (ConversationRoom room in roomList)
            {
                Delete(room);

            }
        }
        public void Delete(ConversationRoom room)
        {
            if (room != null)
            {
                using (UnitOfWork unit = new UnitOfWork())
                {
                    List<Message> messages = unit.messageRepository.GetByRoom(room);
                    unit.messageRepository.DeleteRange(messages);
                    unit.Save();
                }
                db.Rooms.Remove(room);

            }
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
            }
            disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}