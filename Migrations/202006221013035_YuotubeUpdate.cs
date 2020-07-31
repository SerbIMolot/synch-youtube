namespace Chat.Migrations
{
    using System.Data.Entity.Migrations;

    public partial class YuotubeUpdate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.YoutubeVideos", "descriprion", c => c.String());
            AddColumn("dbo.YoutubeVideos", "duration", c => c.Double(nullable: false));
            AddColumn("dbo.YoutubeVideos", "thumbnail", c => c.String());
        }

        public override void Down()
        {
            DropColumn("dbo.YoutubeVideos", "thumbnail");
            DropColumn("dbo.YoutubeVideos", "duration");
            DropColumn("dbo.YoutubeVideos", "descriprion");
        }
    }
}
