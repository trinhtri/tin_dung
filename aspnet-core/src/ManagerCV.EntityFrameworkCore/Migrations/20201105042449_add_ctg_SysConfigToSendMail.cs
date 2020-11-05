using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ManagerCV.Migrations
{
    public partial class add_ctg_SysConfigToSendMail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SysConfigToSendMails",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreationTime = table.Column<DateTime>(nullable: false),
                    CreatorUserId = table.Column<long>(nullable: true),
                    LastModificationTime = table.Column<DateTime>(nullable: true),
                    LastModifierUserId = table.Column<long>(nullable: true),
                    IsDeleted = table.Column<bool>(nullable: false),
                    DeleterUserId = table.Column<long>(nullable: true),
                    DeletionTime = table.Column<DateTime>(nullable: true),
                    TenantId = table.Column<int>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    ServerURL = table.Column<string>(nullable: true),
                    Port = table.Column<int>(nullable: false),
                    UserName = table.Column<string>(nullable: true),
                    PassWord = table.Column<string>(nullable: true),
                    UseSSL = table.Column<int>(nullable: false),
                    ToMail = table.Column<string>(nullable: true),
                    CCMail = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    IsActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SysConfigToSendMails", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SysConfigToSendMails");
        }
    }
}
