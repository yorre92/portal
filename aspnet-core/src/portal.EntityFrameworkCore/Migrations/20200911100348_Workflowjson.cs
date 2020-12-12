using Microsoft.EntityFrameworkCore.Migrations;

namespace portal.Migrations
{
    public partial class Workflowjson : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "WorkflowJson",
                table: "Orders",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WorkflowJson",
                table: "Orders");
        }
    }
}
