namespace SynchTube.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MsgRoomIdChange : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.ApplicationUserRooms", "Room_id", "dbo.Rooms");
            DropForeignKey("dbo.Messages", "roomId", "dbo.Rooms");
            DropIndex("dbo.Messages", new[] { "roomId" });
            DropIndex("dbo.ApplicationUserRooms", new[] { "Room_id" });
            DropColumn("dbo.ApplicationUserRooms", "Room_id");
            DropColumn("dbo.ConversationRoomApplicationUsers", "ConversationRoom_RoomName");
            RenameColumn(table: "dbo.ConversationRoomApplicationUsers", name: "Room_id", newName: "ConversationRoom_RoomName");
            RenameColumn(table: "dbo.ApplicationUserRooms", name: "ConversationRoom_RoomName", newName: "Room_id");
            DropPrimaryKey("dbo.Rooms");
            DropPrimaryKey("dbo.ApplicationUserRooms");
            AlterColumn("dbo.Messages", "roomId", c => c.String(nullable: false, maxLength: 128));
            AlterColumn("dbo.Rooms", "id", c => c.String(nullable: false, maxLength: 128));
            AlterColumn("dbo.ApplicationUserRooms", "Room_id", c => c.String(nullable: false, maxLength: 128));
            AddPrimaryKey("dbo.Rooms", "id");
            AddPrimaryKey("dbo.ApplicationUserRooms", new[] { "ApplicationUser_Id", "Room_id" });
            CreateIndex("dbo.Messages", "roomId");
            CreateIndex("dbo.ApplicationUserRooms", "Room_id");
            AddForeignKey("dbo.ApplicationUserRooms", "Room_id", "dbo.Rooms", "id", cascadeDelete: true);
            AddForeignKey("dbo.Messages", "roomId", "dbo.Rooms", "id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Messages", "roomId", "dbo.Rooms");
            DropForeignKey("dbo.ApplicationUserRooms", "Room_id", "dbo.Rooms");
            DropIndex("dbo.ApplicationUserRooms", new[] { "Room_id" });
            DropIndex("dbo.Messages", new[] { "roomId" });
            DropPrimaryKey("dbo.ApplicationUserRooms");
            DropPrimaryKey("dbo.Rooms");
            AlterColumn("dbo.ApplicationUserRooms", "Room_id", c => c.Int(nullable: false));
            AlterColumn("dbo.Rooms", "id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.Messages", "roomId", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.ApplicationUserRooms", new[] { "ApplicationUser_Id", "Room_id" });
            AddPrimaryKey("dbo.Rooms", "id");
            RenameColumn(table: "dbo.ApplicationUserRooms", name: "Room_id", newName: "ConversationRoom_RoomName");
            RenameColumn(table: "dbo.ConversationRoomApplicationUsers", name: "ConversationRoom_RoomName", newName: "Room_id");
            AddColumn("dbo.ConversationRoomApplicationUsers", "ConversationRoom_RoomName", c => c.String(nullable: false, maxLength: 128));
            AddColumn("dbo.ApplicationUserRooms", "Room_id", c => c.Int(nullable: false));
            CreateIndex("dbo.ApplicationUserRooms", "Room_id");
            CreateIndex("dbo.Messages", "roomId");
            AddForeignKey("dbo.Messages", "roomId", "dbo.Rooms", "id", cascadeDelete: true);
            AddForeignKey("dbo.ApplicationUserRooms", "Room_id", "dbo.Rooms", "id", cascadeDelete: true);
        }
    }
}
