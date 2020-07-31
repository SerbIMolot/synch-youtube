using Chat.Models;
using System;

namespace Chat.Repository
{
    public class UnitOfWork : IDisposable
    {
        private readonly ApplicationDbContext context;
        private ConversationRoomRepository convRoomRepository;
        private MessageRepository msgRepository;
        private UserRepository usrRepository;
        private ConnectionsRepository connectRepository;
        private YoutubeVideosRepository videoRepository;

        private bool disposed = false;

        public UnitOfWork()
        {
            context = new ApplicationDbContext();

        }

        public YoutubeVideosRepository VideoRepository
        {

            get
            {
                if (videoRepository == null)
                {
                    videoRepository = new YoutubeVideosRepository(context);
                }
                return videoRepository;
            }
        }
        public ConversationRoomRepository conversationRoomRepository
        {

            get
            {
                if (convRoomRepository == null)
                {
                    convRoomRepository = new ConversationRoomRepository(context);
                }
                return convRoomRepository;
            }
        }
        public ConnectionsRepository connectionsRepository
        {

            get
            {

                if (connectRepository == null)
                {
                    connectRepository = new ConnectionsRepository(context);
                }
                return connectRepository;
            }
        }
        public MessageRepository messageRepository
        {

            get
            {

                if (msgRepository == null)
                {
                    msgRepository = new MessageRepository(context);
                }
                return msgRepository;
            }
        }
        public UserRepository userRepository
        {

            get
            {

                if (usrRepository == null)
                {
                    usrRepository = new UserRepository(context);
                }
                return usrRepository;
            }
        }

        public void Save()
        {
            context.SaveChanges();
        }


        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    context.Dispose();
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