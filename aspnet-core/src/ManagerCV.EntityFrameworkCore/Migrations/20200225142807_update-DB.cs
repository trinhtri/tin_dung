using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ManagerCV.Migrations
{
    public partial class updateDB : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CVName",
                table: "Employees",
                maxLength: 2000,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CVUrl",
                table: "Employees",
                maxLength: 2000,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "NgayNhanCV",
                table: "Employees",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CVName",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "CVUrl",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "NgayNhanCV",
                table: "Employees");
        }
    }
}
