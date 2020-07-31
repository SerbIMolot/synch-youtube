using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Chat.Models
{
    public class ConversationRoom
    {
        public ConversationRoom()
        {
            Users = new List<ApplicationUser>();
            //  RoomVideos = new List<YoutubeVideo>(); 
        }
        public ConversationRoom(string roomName)
        {
            Users = new List<ApplicationUser>();
            //  RoomVideos = new List<YoutubeVideo>();
            RoomName = RoomName;
        }
        [Key]
        [DisplayName("Room name")]
        public string RoomName { get; set; }
        public virtual List<ApplicationUser> Users { get; set; }
        public int currentVideoId { get; set; }
        public ApplicationUser currentAdmin { get; set; }
        public YoutubeVideo currentVideo { get; set; }
        // public virtual List<YoutubeVideo> RoomVideos { get; set; }
    }
}