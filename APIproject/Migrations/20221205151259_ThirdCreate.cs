using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiProyecto.Migrations
{
    public partial class ThirdCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Id_producto",
                table: "Pedidos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Id_producto",
                table: "Pedidos");
        }
    }
}
