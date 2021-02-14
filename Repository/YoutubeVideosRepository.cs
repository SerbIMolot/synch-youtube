using Chat.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace Chat.Repository
{
    public class YoutubeVideosRepository
    {
        public ApplicationDbContext db;

        public YoutubeVideosRepository(ApplicationDbContext context)
        {
            db = context;
        }

        public IEnumerable<YoutubeVideo> GetList()
        {
            return db.Videos.ToList();
        }

        public YoutubeVideo GetById(int id)
        {
            return db.Videos.Find(id);
        }
        public YoutubeVideo GetByIdDetached(int id)
        {
            YoutubeVideo video = db.Videos.Find(id);
            db.Entry(video).State = EntityState.Detached;
            return video;
        }

        public void Create(YoutubeVideo video)
        {
            if (video == null && db.Videos.Any(v => v.source == video.source))
            {
                return;
            }
            db.Videos.Add(video);
        }
        public IEnumerable<YoutubeVideo> CreateRange(IEnumerable<YoutubeVideo> videos)
        {
            if (videos == null)
            {
                return null;
            }
            IEnumerable<YoutubeVideo> vids = videos.Where(v => db.Videos.Any(vid => v.source != vid.source && v.roomName != vid.roomName));

            db.Videos.AddRange(vids);

            return videos;
        }

        public void Update(YoutubeVideo video)
        {
            db.Entry(video).State = EntityState.Modified;
        }

        public void Delete(int id)
        {
            YoutubeVideo video = db.Videos.Find(id);
            if (video != null)
            {
                db.Videos.Remove(video);
            }
        }
        public void DeleteRange(IEnumerable<YoutubeVideo> msgList)
        {
            db.Videos.RemoveRange(msgList);
        }
        public void Delete(YoutubeVideo video)
        {
            YoutubeVideo YoutubeVideo = db.Videos.Find(video);
            if (video != null)
            {
                db.Videos.Remove(video);
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