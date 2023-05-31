using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiProyecto.Migrations
{
    public partial class FourthCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Productos_Pedidos_PedidoId_pedido",
                table: "Productos");

            migrationBuilder.DropIndex(
                name: "IX_Productos_PedidoId_pedido",
                table: "Productos");

            migrationBuilder.DropColumn(
                name: "PedidoId_pedido",
                table: "Productos");

            migrationBuilder.DropColumn(
                name: "Cantidad",
                table: "Pedidos");

            migrationBuilder.DropColumn(
                name: "Id_producto",
                table: "Pedidos");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PedidoId_pedido",
                table: "Productos",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Cantidad",
                table: "Pedidos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Id_producto",
                table: "Pedidos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Productos_PedidoId_pedido",
                table: "Productos",
                column: "PedidoId_pedido");

            migrationBuilder.AddForeignKey(
                name: "FK_Productos_Pedidos_PedidoId_pedido",
                table: "Productos",
                column: "PedidoId_pedido",
                principalTable: "Pedidos",
                principalColumn: "Id_pedido");
        }
    }
}
