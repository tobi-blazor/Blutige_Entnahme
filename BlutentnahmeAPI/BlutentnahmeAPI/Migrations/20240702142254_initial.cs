using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlutentnahmeAPI.Migrations
{
    /// <inheritdoc />
    public partial class initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Labore",
                columns: table => new
                {
                    LaborID = table.Column<string>(type: "varchar(255)", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Labore", x => x.LaborID);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Patienten",
                columns: table => new
                {
                    PersonID = table.Column<string>(type: "varchar(255)", nullable: false),
                    Vorname = table.Column<string>(type: "longtext", nullable: false),
                    Nachname = table.Column<string>(type: "longtext", nullable: false),
                    Geburtsdatum = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Hinweise = table.Column<string>(type: "longtext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Patienten", x => x.PersonID);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Personal",
                columns: table => new
                {
                    PersonID = table.Column<string>(type: "varchar(255)", nullable: false),
                    Vorname = table.Column<string>(type: "longtext", nullable: false),
                    Nachname = table.Column<string>(type: "longtext", nullable: false),
                    Geburtsdatum = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Personal", x => x.PersonID);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Aufträge",
                columns: table => new
                {
                    AuftragsID = table.Column<string>(type: "varchar(255)", nullable: false),
                    GeplanterZeitpunkt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    PatientPersonID = table.Column<string>(type: "varchar(255)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Aufträge", x => x.AuftragsID);
                    table.ForeignKey(
                        name: "FK_Aufträge_Patienten_PatientPersonID",
                        column: x => x.PatientPersonID,
                        principalTable: "Patienten",
                        principalColumn: "PersonID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Blutproben",
                columns: table => new
                {
                    ProbeID = table.Column<string>(type: "varchar(255)", nullable: false),
                    MaximaleVerweildauer = table.Column<TimeSpan>(type: "time(6)", nullable: false),
                    Grund = table.Column<string>(type: "longtext", nullable: false),
                    Hinweise = table.Column<string>(type: "longtext", nullable: false),
                    EntnahmeZeitpunkt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    PersonalPersonID = table.Column<string>(type: "varchar(255)", nullable: false),
                    AuftragsID = table.Column<string>(type: "varchar(255)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Blutproben", x => x.ProbeID);
                    table.ForeignKey(
                        name: "FK_Blutproben_Aufträge_AuftragsID",
                        column: x => x.AuftragsID,
                        principalTable: "Aufträge",
                        principalColumn: "AuftragsID");
                    table.ForeignKey(
                        name: "FK_Blutproben_Personal_PersonalPersonID",
                        column: x => x.PersonalPersonID,
                        principalTable: "Personal",
                        principalColumn: "PersonID",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Aufträge_PatientPersonID",
                table: "Aufträge",
                column: "PatientPersonID");

            migrationBuilder.CreateIndex(
                name: "IX_Blutproben_AuftragsID",
                table: "Blutproben",
                column: "AuftragsID");

            migrationBuilder.CreateIndex(
                name: "IX_Blutproben_PersonalPersonID",
                table: "Blutproben",
                column: "PersonalPersonID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Blutproben");

            migrationBuilder.DropTable(
                name: "Labore");

            migrationBuilder.DropTable(
                name: "Aufträge");

            migrationBuilder.DropTable(
                name: "Personal");

            migrationBuilder.DropTable(
                name: "Patienten");
        }
    }
}
