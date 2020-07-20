using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Chat.Models;
using System.Data.Entity;

namespace Chat.Repository
{

    public class UserRepository
    {
        public ApplicationDbContext db;
        
        public UserRepository(ApplicationDbContext context)
        {
            db = context;
        }

        public IEnumerable<ApplicationUser> GetList()
        {
            return db.Users.ToList();
        }

        public ApplicationUser GetById(string id)
        {
            return db.Users.Find(id);
        }
        public ApplicationUser GetByIdDetached(string id)
        {
            var user = db.Users.Find(id);
            db.Entry(user).State = EntityState.Detached;
            return user;
        }
        public List< ApplicationUser > GetByRoomName(string roomId )
        {
            return db.Users.Where(m => m.Rooms.SingleOrDefault( r => r.RoomName == roomId) != null ).ToList();
        }

        public void Create(ApplicationUser user)
        {
            if (user == null)
            {
                return;
            }
            db.Users.Add(user);
        }

        public void Update(ApplicationUser user)
        {
            db.Entry(user).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            ApplicationUser user = db.Users.Find(id);
            if (user != null)
                db.Users.Remove(user);
        }

        public void Delete(ApplicationUser user)
        {
            ApplicationUser ApplicationUser = db.Users.Find(user);
            if (user != null)
                db.Users.Remove(user);
        }

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}