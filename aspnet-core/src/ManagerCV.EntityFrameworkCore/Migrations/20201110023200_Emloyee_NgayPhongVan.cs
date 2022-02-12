using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ManagerCV.Migrations
{
    public partial class Emloyee_NgayPhongVan : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "NgayPhongVan",
                table: "Employees",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NgayPhongVan",
                table: "Employees");
        }
    }
}
