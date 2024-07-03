using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlutentnahmeAPI.Migrations
{
    /// <inheritdoc />
    public partial class timespanentfernt : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MaximaleVerweildauer",
                table: "Blutproben");

            migrationBuilder.AddColumn<DateTime>(
                name: "spätesterEntnahmezeitpunkt",
                table: "Blutproben",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "spätesterEntnahmezeitpunkt",
                table: "Blutproben");

            migrationBuilder.AddColumn<TimeSpan>(
                name: "MaximaleVerweildauer",
                table: "Blutproben",
                type: "time(6)",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0));
        }
    }
}
