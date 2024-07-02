using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlutentnahmeAPI.Migrations
{
    /// <inheritdoc />
    public partial class labor_vergessen : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "LaborEingang",
                table: "Blutproben",
                type: "datetime(6)",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AlterColumn<DateTime>(
                name: "EntnahmeZeitpunkt",
                table: "Blutproben",
                type: "datetime(6)",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)");

            migrationBuilder.AddColumn<string>(
                name: "LaborID",
                table: "Blutproben",
                type: "varchar(255)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Blutproben_LaborID",
                table: "Blutproben",
                column: "LaborID");

            migrationBuilder.AddForeignKey(
                name: "FK_Blutproben_Labore_LaborID",
                table: "Blutproben",
                column: "LaborID",
                principalTable: "Labore",
                principalColumn: "LaborID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blutproben_Labore_LaborID",
                table: "Blutproben");

            migrationBuilder.DropIndex(
                name: "IX_Blutproben_LaborID",
                table: "Blutproben");

            migrationBuilder.DropColumn(
                name: "LaborID",
                table: "Blutproben");

            migrationBuilder.AlterColumn<DateTime>(
                name: "LaborEingang",
                table: "Blutproben",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "EntnahmeZeitpunkt",
                table: "Blutproben",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime(6)",
                oldNullable: true);
        }
    }
}
