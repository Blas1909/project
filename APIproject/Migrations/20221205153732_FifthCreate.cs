using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiProyecto.Migrations
{
    public partial class FifthCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ProductoPedido",
                columns: table => new
                {
                    Id_ProductoPedido = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Id_Pedido = table.Column<int>(type: "INTEGER", nullable: true),
                    Id_Producto = table.Column<int>(type: "INTEGER", nullable: false),
                    Cantidad = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductoPedido", x => x.Id_ProductoPedido);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProductoPedido");
        }
    }
}
