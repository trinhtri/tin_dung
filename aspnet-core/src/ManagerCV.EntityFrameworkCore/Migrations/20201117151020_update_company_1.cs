using Microsoft.EntityFrameworkCore.Migrations;

namespace ManagerCV.Migrations
{
    public partial class update_company_1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UrlHopDong",
                table: "Companys",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UrlThanhToan",
                table: "Companys",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UrlHopDong",
                table: "Companys");

            migrationBuilder.DropColumn(
                name: "UrlThanhToan",
                table: "Companys");
        }
    }
}
