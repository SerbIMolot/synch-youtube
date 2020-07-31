using Chat.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Chat.Repository
{
    public class MessageRepository
    {
        public ApplicationDbContext db;

        public MessageRepository(ApplicationDbContext context)
        {
            db = context;
        }

        public IEnumerable<Message> GetList()
        {
            return db.Messages.Include(m => m.SenderUser).ToList();
        }

        public Message GetById(int id)
        {
            return db.Messages.Find(id);
        }
        public Message GetByIdDetached(int id)
        {
            Message msg = db.Messages.Find(id);
            db.Entry(msg).State = EntityState.Detached;
            return msg;
        }
        public List<Message> GetByUser(ApplicationUser user)
        {
            return db.Messages.Where(m => m.SenderUser == user).ToList();
        }
        public List<Message> GetByUserId(string userId)
        {
            return db.Messages.Where(m => m.SenderUserId == userId).ToList();
        }
        public List<Message> GetByRoom(ConversationRoom room)
        {
            return db.Messages.Where(m => m.Room.RoomName == room.RoomName).ToList();
        }
        public List<Message> GetByRoomName(string roomId)
        {
            return db.Messages.Where(m => m.Room.RoomName == roomId).Include(m => m.SenderUser).ToList();
        }

        public void Create(Message msg)
        {
            if (msg == null)
            {
                return;
            }
            db.Messages.Add(msg);
        }

        public void Update(Message msg)
        {
            db.Entry(msg).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            Message msg = db.Messages.Find(id);
            if (msg != null)
            {
                db.Messages.Remove(msg);
            }
        }
        public void DeleteRange(IEnumerable<Message> msgList)
        {
            db.Messages.RemoveRange(msgList);
        }
        public void Delete(Message msg)
        {
            Message message = db.Messages.Find(msg);
            if (msg != null)
            {
                db.Messages.Remove(msg);
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