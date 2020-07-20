namespace Chat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemoveYotube : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.YoutubeVideos", "ConversationRoom_RoomName", "dbo.ConversationRooms");
            DropIndex("dbo.YoutubeVideos", new[] { "ConversationRoom_RoomName" });
            DropColumn("dbo.YoutubeVideos", "ConversationRoom_RoomName");
        }
        
        public override void Down()
        {
            AddColumn("dbo.YoutubeVideos", "ConversationRoom_RoomName", c => c.String(maxLength: 128));
            CreateIndex("dbo.YoutubeVideos", "ConversationRoom_RoomName");
            AddForeignKey("dbo.YoutubeVideos", "ConversationRoom_RoomName", "dbo.ConversationRooms", "RoomName");
        }
    }
}
