using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Chat.Models;
using System.Data.Entity;

namespace Chat.Repository
{

    public class ConnectionsRepository
    {
        public ApplicationDbContext db;
        
        public ConnectionsRepository(ApplicationDbContext context)
        {
            db = context;
        }

        public IEnumerable<Connection> GetList()
        {
            return db.Connections.ToList();
        }

        public Connection GetById(string id)
        {
            return db.Connections.Find(id);
        }
        public Connection GetByUserAgent(string userAgent)
        {
            return db.Connections.SingleOrDefault( c => c.UserAgent == userAgent);
        }
        public Connection GetByIdDetached(string id)
        {
            var conection = db.Connections.Find(id);
            db.Entry(conection).State = EntityState.Detached;
            return conection;
        }

        public void Create(Connection conection)
        {
            if (conection == null)
            {
                return;
            }
            db.Connections.Add(conection);
        }

        public void Update(Connection conection)
        {
            db.Entry(conection).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            Connection conection = db.Connections.Find(id);
            if (conection != null)
                db.Connections.Remove(conection);
        }

        public void Delete(Connection conection)
        {
            Connection Connection = db.Connections.Find(conection);
            if (conection != null)
                db.Connections.Remove(conection);
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