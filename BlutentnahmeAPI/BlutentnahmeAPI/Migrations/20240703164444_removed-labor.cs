using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BlutentnahmeAPI.Migrations
{
    /// <inheritdoc />
    public partial class removedlabor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blutproben_Labore_LaborID",
                table: "Blutproben");

            migrationBuilder.DropTable(
                name: "Labore");

            migrationBuilder.DropIndex(
                name: "IX_Blutproben_LaborID",
                table: "Blutproben");

            migrationBuilder.DropColumn(
                name: "LaborID",
                table: "Blutproben");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LaborID",
                table: "Blutproben",
                type: "varchar(255)",
                nullable: true);

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
    }
}
