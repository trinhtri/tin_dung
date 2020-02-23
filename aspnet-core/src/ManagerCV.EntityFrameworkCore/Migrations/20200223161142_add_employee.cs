using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ManagerCV.Migrations
{
    public partial class add_employee : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
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
                    HoTen = table.Column<string>(maxLength: 100, nullable: true),
                    NamSinh = table.Column<string>(maxLength: 20, nullable: true),
                    GioiTinh = table.Column<int>(nullable: false),
                    NgonNgu = table.Column<string>(maxLength: 1000, nullable: true),
                    DanhGiaNgonNgu = table.Column<string>(maxLength: 2000, nullable: true),
                    QueQuan = table.Column<string>(maxLength: 2000, nullable: true),
                    ChoOHienTai = table.Column<string>(maxLength: 2000, nullable: true),
                    NguyenVong = table.Column<string>(maxLength: 2000, nullable: true),
                    SDT = table.Column<string>(maxLength: 30, nullable: true),
                    Email = table.Column<string>(maxLength: 100, nullable: true),
                    BangCap = table.Column<string>(maxLength: 500, nullable: true),
                    Truong = table.Column<string>(maxLength: 600, nullable: true),
                    Nganh = table.Column<string>(maxLength: 600, nullable: true),
                    NamTotNghiep = table.Column<string>(maxLength: 50, nullable: true),
                    FaceBook = table.Column<string>(maxLength: 1000, nullable: true),
                    MoTaCV = table.Column<string>(maxLength: 2000, nullable: true),
                    LuongMongMuon = table.Column<string>(maxLength: 1000, nullable: true),
                    NoiDung = table.Column<string>(maxLength: 2000, nullable: true),
                    CtyNhan = table.Column<string>(maxLength: 2000, nullable: true),
                    NgayHoTro = table.Column<DateTime>(nullable: true),
                    KetQua = table.Column<string>(maxLength: 2000, nullable: true),
                    TrangThai = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employees");
        }
    }
}
