using Microsoft.EntityFrameworkCore.Migrations;

namespace ManagerCV.Migrations
{
    public partial class update_all_data : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "KetQua",
                table: "Employees");

            migrationBuilder.AlterColumn<int>(
                name: "TrangThai",
                table: "Employees",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit");

            migrationBuilder.AddColumn<string>(
                name: "Note",
                table: "Employees",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Note",
                table: "Employees");

            migrationBuilder.AlterColumn<bool>(
                name: "TrangThai",
                table: "Employees",
                type: "bit",
                nullable: false,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<bool>(
                name: "KetQua",
                table: "Employees",
                type: "bit",
                maxLength: 2000,
                nullable: false,
                defaultValue: false);
        }
    }
}
