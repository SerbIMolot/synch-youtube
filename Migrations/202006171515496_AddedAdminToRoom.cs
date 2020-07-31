namespace Chat.Migrations
{
    using System.Data.Entity.Migrations;

    public partial class AddedAdminToRoom : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ApplicationUserConversationRooms", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.ApplicationUserConversationRooms", "ConversationRoom_RoomName", "dbo.ConversationRooms");
            DropIndex("dbo.ApplicationUserConversationRooms", new[] { "ApplicationUser_Id" });
            DropIndex("dbo.ApplicationUserConversationRooms", new[] { "ConversationRoom_RoomName" });
            AddColumn("dbo.ConversationRooms", "ApplicationUser_Id", c => c.String(maxLength: 128));
            AddColumn("dbo.ConversationRooms", "currentAdmin_Id", c => c.String(maxLength: 128));
            AddColumn("dbo.AspNetUsers", "ConversationRoom_RoomName", c => c.String(maxLength: 128));
            CreateIndex("dbo.ConversationRooms", "ApplicationUser_Id");
            CreateIndex("dbo.ConversationRooms", "currentAdmin_Id");
            CreateIndex("dbo.AspNetUsers", "ConversationRoom_RoomName");
            AddForeignKey("dbo.ConversationRooms", "ApplicationUser_Id", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.ConversationRooms", "currentAdmin_Id", "dbo.AspNetUsers", "Id");
            AddForeignKey("dbo.AspNetUsers", "ConversationRoom_RoomName", "dbo.ConversationRooms", "RoomName");
            DropTable("dbo.ApplicationUserConversationRooms");
        }

        public override void Down()
        {
            CreateTable(
                "dbo.ApplicationUserConversationRooms",
                c => new
                {
                    ApplicationUser_Id = c.String(nullable: false, maxLength: 128),
                    ConversationRoom_RoomName = c.String(nullable: false, maxLength: 128),
                })
                .PrimaryKey(t => new { t.ApplicationUser_Id, t.ConversationRoom_RoomName });

            DropForeignKey("dbo.AspNetUsers", "ConversationRoom_RoomName", "dbo.ConversationRooms");
            DropForeignKey("dbo.ConversationRooms", "currentAdmin_Id", "dbo.AspNetUsers");
            DropForeignKey("dbo.ConversationRooms", "ApplicationUser_Id", "dbo.AspNetUsers");
            DropIndex("dbo.AspNetUsers", new[] { "ConversationRoom_RoomName" });
            DropIndex("dbo.ConversationRooms", new[] { "currentAdmin_Id" });
            DropIndex("dbo.ConversationRooms", new[] { "ApplicationUser_Id" });
            DropColumn("dbo.AspNetUsers", "ConversationRoom_RoomName");
            DropColumn("dbo.ConversationRooms", "currentAdmin_Id");
            DropColumn("dbo.ConversationRooms", "ApplicationUser_Id");
            CreateIndex("dbo.ApplicationUserConversationRooms", "ConversationRoom_RoomName");
            CreateIndex("dbo.ApplicationUserConversationRooms", "ApplicationUser_Id");
            AddForeignKey("dbo.ApplicationUserConversationRooms", "ConversationRoom_RoomName", "dbo.ConversationRooms", "RoomName", cascadeDelete: true);
            AddForeignKey("dbo.ApplicationUserConversationRooms", "ApplicationUser_Id", "dbo.AspNetUsers", "Id", cascadeDelete: true);
        }
    }
}
