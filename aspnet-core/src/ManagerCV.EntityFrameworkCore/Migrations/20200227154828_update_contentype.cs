using Microsoft.EntityFrameworkCore.Migrations;

namespace ManagerCV.Migrations
{
    public partial class update_contentype : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ContentType",
                table: "Employees",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContentType",
                table: "Employees");
        }
    }
}
