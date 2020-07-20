using Chat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Chat.Views.Room
{
    public class RoomIndexVM
    {
        public List<ConversationRoom> userRooms { get; set; }
        public ConversationRoom newRoom { get; set; }
    }
}