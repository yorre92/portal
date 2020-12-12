using Microsoft.EntityFrameworkCore.Migrations;

namespace portal.Migrations
{
    public partial class RequestInputInt : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RequestInput_Request_RequestId1",
                table: "RequestInput");

            migrationBuilder.DropIndex(
                name: "IX_RequestInput_RequestId1",
                table: "RequestInput");

            migrationBuilder.DropColumn(
                name: "RequestId1",
                table: "RequestInput");

            migrationBuilder.AlterColumn<int>(
                name: "RequestId",
                table: "RequestInput",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RequestInput_RequestId",
                table: "RequestInput",
                column: "RequestId");

            migrationBuilder.AddForeignKey(
                name: "FK_RequestInput_Request_RequestId",
                table: "RequestInput",
                column: "RequestId",
                principalTable: "Request",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RequestInput_Request_RequestId",
                table: "RequestInput");

            migrationBuilder.DropIndex(
                name: "IX_RequestInput_RequestId",
                table: "RequestInput");

            migrationBuilder.AlterColumn<string>(
                name: "RequestId",
                table: "RequestInput",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddColumn<int>(
                name: "RequestId1",
                table: "RequestInput",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RequestInput_RequestId1",
                table: "RequestInput",
                column: "RequestId1");

            migrationBuilder.AddForeignKey(
                name: "FK_RequestInput_Request_RequestId1",
                table: "RequestInput",
                column: "RequestId1",
                principalTable: "Request",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
