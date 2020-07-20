namespace Chat.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CurrentConnectionIdToUser : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.AspNetUsers", "currentConnectionId", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.AspNetUsers", "currentConnectionId");
        }
    }
}
