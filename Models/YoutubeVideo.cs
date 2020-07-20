using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Chat.Models
{
    public class YoutubeVideo
    {
        [Key, Column(Order = 0)]
        public string source { get; set; }
        [Key, Column(Order = 1)]
        public string roomName { get; set; }
        public string poster { get; set; }
        public string title { get; set; }
        public string descriprion { get; set; }
        public double duration { get; set; }
        public string thumbnail { get; set; }
       
    }
}