using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ManagerCV.Migrations
{
    public partial class addSendCV : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CtyNhan",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "NgayHoTro",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "NgayNhanCV",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "NgayPhongVan",
                table: "Employees");

            migrationBuilder.AlterColumn<string>(
                name: "Note",
                table: "Employees",
                maxLength: 2000,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "SendCV",
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
                    Employee_Id = table.Column<int>(nullable: false),
                    NgayGui = table.Column<DateTime>(nullable: false),
                    NgayPhongVan = table.Column<DateTime>(nullable: true),
                    NgayNhan = table.Column<DateTime>(nullable: true),
                    TrangThai = table.Column<int>(nullable: false),
                    TenCty = table.Column<string>(nullable: true),
                    Note = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SendCV", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SendCV_Employees_Employee_Id",
                        column: x => x.Employee_Id,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SendCV_Employee_Id",
                table: "SendCV",
                column: "Employee_Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SendCV");

            migrationBuilder.AlterColumn<string>(
                name: "Note",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 2000,
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CtyNhan",
                table: "Employees",
                type: "nvarchar(2000)",
                maxLength: 2000,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayHoTro",
                table: "Employees",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayNhanCV",
                table: "Employees",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayPhongVan",
                table: "Employees",
                type: "datetime2",
                nullable: true);
        }
    }
}
