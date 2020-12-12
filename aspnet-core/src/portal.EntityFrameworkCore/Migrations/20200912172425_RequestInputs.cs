using Microsoft.EntityFrameworkCore.Migrations;

namespace portal.Migrations
{
    public partial class RequestInputs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RequestInput_Request_RequestId",
                table: "RequestInput");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RequestInput",
                table: "RequestInput");

            migrationBuilder.RenameTable(
                name: "RequestInput",
                newName: "RequestInputs");

            migrationBuilder.RenameIndex(
                name: "IX_RequestInput_RequestId",
                table: "RequestInputs",
                newName: "IX_RequestInputs_RequestId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RequestInputs",
                table: "RequestInputs",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RequestInputs_Request_RequestId",
                table: "RequestInputs",
                column: "RequestId",
                principalTable: "Request",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RequestInputs_Request_RequestId",
                table: "RequestInputs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RequestInputs",
                table: "RequestInputs");

            migrationBuilder.RenameTable(
                name: "RequestInputs",
                newName: "RequestInput");

            migrationBuilder.RenameIndex(
                name: "IX_RequestInputs_RequestId",
                table: "RequestInput",
                newName: "IX_RequestInput_RequestId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RequestInput",
                table: "RequestInput",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RequestInput_Request_RequestId",
                table: "RequestInput",
                column: "RequestId",
                principalTable: "Request",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
