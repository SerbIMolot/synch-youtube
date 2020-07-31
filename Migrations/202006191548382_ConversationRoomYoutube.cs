namespace Chat.Migrations
{
    using System.Data.Entity.Migrations;

    public partial class ConversationRoomYoutube : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.YoutubeVideos",
                c => new
                {
                    source = c.String(nullable: false, maxLength: 128),
                    poster = c.String(),
                    title = c.String(),
                    ConversationRoom_RoomName = c.String(maxLength: 128),
                })
                .PrimaryKey(t => t.source)
                .ForeignKey("dbo.ConversationRooms", t => t.ConversationRoom_RoomName)
                .Index(t => t.ConversationRoom_RoomName);

            AddColumn("dbo.ConversationRooms", "currentVideo_source", c => c.String(maxLength: 128));
            CreateIndex("dbo.ConversationRooms", "currentVideo_source");
            AddForeignKey("dbo.ConversationRooms", "currentVideo_source", "dbo.YoutubeVideos", "source");
        }

        public override void Down()
        {
            DropForeignKey("dbo.YoutubeVideos", "ConversationRoom_RoomName", "dbo.ConversationRooms");
            DropForeignKey("dbo.ConversationRooms", "currentVideo_source", "dbo.YoutubeVideos");
            DropIndex("dbo.YoutubeVideos", new[] { "ConversationRoom_RoomName" });
            DropIndex("dbo.ConversationRooms", new[] { "currentVideo_source" });
            DropColumn("dbo.ConversationRooms", "currentVideo_source");
            DropTable("dbo.YoutubeVideos");
        }
    }
}
