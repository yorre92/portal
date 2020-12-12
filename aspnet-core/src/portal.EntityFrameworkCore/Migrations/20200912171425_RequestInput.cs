using Microsoft.EntityFrameworkCore.Migrations;

namespace portal.Migrations
{
    public partial class RequestInput : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ServiceId",
                table: "Request");

            migrationBuilder.DropColumn(
                name: "WorkflowJson",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "OrderId",
                table: "Request",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "RequestInput",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(nullable: true),
                    Value = table.Column<string>(nullable: true),
                    RequestId = table.Column<string>(nullable: true),
                    RequestId1 = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RequestInput", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RequestInput_Request_RequestId1",
                        column: x => x.RequestId1,
                        principalTable: "Request",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RequestInput_RequestId1",
                table: "RequestInput",
                column: "RequestId1");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RequestInput");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "Request");

            migrationBuilder.AddColumn<int>(
                name: "ServiceId",
                table: "Request",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "WorkflowJson",
                table: "Orders",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
