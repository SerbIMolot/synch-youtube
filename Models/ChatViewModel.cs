using Chat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Chat
{
    public class ChatViewModel
    {
        public List<Message> messageHistory { get; set; }
        public string currentRoomName { get; set; }
        public ConversationRoom room { get; set; }
        public YoutubeVideo currentRoomVideo { get; set; }
        public List<YoutubeVideo> currentRoomVideos { get; set; }
        public float currentRoomTime { get; set; }
    }
}