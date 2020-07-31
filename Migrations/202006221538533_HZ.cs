namespace Chat.Migrations
{
    using System.Data.Entity.Migrations;

    public partial class HZ : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ConversationRooms", "currentVideo_source", "dbo.YoutubeVideos");
            DropIndex("dbo.ConversationRooms", new[] { "currentVideo_source" });
            DropPrimaryKey("dbo.YoutubeVideos");
            AddColumn("dbo.ConversationRooms", "currentVideo_roomName", c => c.String(maxLength: 128));
            AddColumn("dbo.YoutubeVideos", "roomName", c => c.String(nullable: false, maxLength: 128));
            AddPrimaryKey("dbo.YoutubeVideos", new[] { "source", "roomName" });
            CreateIndex("dbo.ConversationRooms", new[] { "currentVideo_source", "currentVideo_roomName" });
            AddForeignKey("dbo.ConversationRooms", new[] { "currentVideo_source", "currentVideo_roomName" }, "dbo.YoutubeVideos", new[] { "source", "roomName" });
        }

        public override void Down()
        {
            DropForeignKey("dbo.ConversationRooms", new[] { "currentVideo_source", "currentVideo_roomName" }, "dbo.YoutubeVideos");
            DropIndex("dbo.ConversationRooms", new[] { "currentVideo_source", "currentVideo_roomName" });
            DropPrimaryKey("dbo.YoutubeVideos");
            DropColumn("dbo.YoutubeVideos", "roomName");
            DropColumn("dbo.ConversationRooms", "currentVideo_roomName");
            AddPrimaryKey("dbo.YoutubeVideos", "source");
            CreateIndex("dbo.ConversationRooms", "currentVideo_source");
            AddForeignKey("dbo.ConversationRooms", "currentVideo_source", "dbo.YoutubeVideos", "source");
        }
    }
}
