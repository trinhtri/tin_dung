using Microsoft.EntityFrameworkCore.Migrations;

namespace ManagerCV.Migrations
{
    public partial class update_empl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NamTotNghiep",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "Nganh",
                table: "Employees");

            migrationBuilder.AlterColumn<string>(
                name: "NoiDung",
                table: "Employees",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(2000)",
                oldMaxLength: 2000,
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "NoiDung",
                table: "Employees",
                type: "nvarchar(2000)",
                maxLength: 2000,
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NamTotNghiep",
                table: "Employees",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Nganh",
                table: "Employees",
                type: "nvarchar(600)",
                maxLength: 600,
                nullable: true);
        }
    }
}
