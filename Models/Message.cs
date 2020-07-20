using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chat.Models
{
    public class Message
    {
        [Key]
        public int messageId { get; set; }

        public virtual ConversationRoom Room { get; set; }

        [DisplayFormat(DataFormatString = "{HH:mm tt    |    MMMM dd}")]
        public DateTime? sendDate { get; set; }

        public string SenderUserId { get; set; }

        [Required]
        [ForeignKey("SenderUserId")]
        public virtual ApplicationUser SenderUser { get; set; }

        public string message { get; set; }
    }
}