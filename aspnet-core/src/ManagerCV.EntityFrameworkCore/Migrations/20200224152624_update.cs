using Microsoft.EntityFrameworkCore.Migrations;

namespace ManagerCV.Migrations
{
    public partial class update : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MoTaCV",
                table: "Employees");

            migrationBuilder.AlterColumn<bool>(
                name: "TrangThai",
                table: "Employees",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<bool>(
                name: "KetQua",
                table: "Employees",
                maxLength: 2000,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(2000)",
                oldMaxLength: 2000,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "KinhNghiem",
                table: "Employees",
                maxLength: 2000,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "KinhNghiem",
                table: "Employees");

            migrationBuilder.AlterColumn<int>(
                name: "TrangThai",
                table: "Employees",
                type: "int",
                nullable: false,
                oldClrType: typeof(bool));

            migrationBuilder.AlterColumn<string>(
                name: "KetQua",
                table: "Employees",
                type: "nvarchar(2000)",
                maxLength: 2000,
                nullable: true,
                oldClrType: typeof(bool),
                oldMaxLength: 2000);

            migrationBuilder.AddColumn<string>(
                name: "MoTaCV",
                table: "Employees",
                type: "nvarchar(2000)",
                maxLength: 2000,
                nullable: true);
        }
    }
}
