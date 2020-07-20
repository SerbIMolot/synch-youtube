using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel;

namespace Chat.Models
{
    public class ConversationRoomVM
    {
        public ConversationRoomVM()
        {
            Users = new List<ApplicationUser>(); 
        }
        public ConversationRoomVM(string roomName)
        {
            Users = new List<ApplicationUser>(); 
            RoomName = RoomName;
        }
        [Key]
        [DisplayName("Room name")]
        public string RoomName { get; set; }
        public virtual List<ApplicationUser> Users { get; set; }
        public int currentVideoId { get; set; }
        public int currentVideoTime { get; set; }
    }
}