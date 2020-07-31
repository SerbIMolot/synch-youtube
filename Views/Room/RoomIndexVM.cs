using Chat.Models;
using System.Collections.Generic;

namespace Chat.Views.Room
{
    public class RoomIndexVM
    {
        public List<ConversationRoom> userRooms { get; set; }
        public ConversationRoom newRoom { get; set; }
    }
}