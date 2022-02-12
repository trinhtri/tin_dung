using Microsoft.EntityFrameworkCore.Migrations;

namespace ManagerCV.Migrations
{
    public partial class update_company : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SoUVUT",
                table: "Companys");

            migrationBuilder.DropColumn(
                name: "VTUVUT",
                table: "Companys");

            migrationBuilder.AddColumn<string>(
                name: "ContentTypeHD",
                table: "Companys",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContentTypeTT",
                table: "Companys",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "HopDong",
                table: "Companys",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "Companys",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SoUVTT",
                table: "Companys",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ThanhToan",
                table: "Companys",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContentTypeHD",
                table: "Companys");

            migrationBuilder.DropColumn(
                name: "ContentTypeTT",
                table: "Companys");

            migrationBuilder.DropColumn(
                name: "HopDong",
                table: "Companys");

            migrationBuilder.DropColumn(
                name: "Note",
                table: "Companys");

            migrationBuilder.DropColumn(
                name: "SoUVTT",
                table: "Companys");

            migrationBuilder.DropColumn(
                name: "ThanhToan",
                table: "Companys");

            migrationBuilder.AddColumn<string>(
                name: "SoUVUT",
                table: "Companys",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VTUVUT",
                table: "Companys",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
