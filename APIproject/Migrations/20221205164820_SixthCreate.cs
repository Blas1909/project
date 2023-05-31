using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiProyecto.Migrations
{
    public partial class SixthCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id_ProductoPedido",
                table: "ProductoPedido",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "Id_pedido",
                table: "Pedidos",
                newName: "Id");

            migrationBuilder.AlterColumn<int>(
                name: "Id_Pedido",
                table: "ProductoPedido",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "Id_User",
                table: "Pedidos",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "ProductoPedido",
                newName: "Id_ProductoPedido");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Pedidos",
                newName: "Id_pedido");

            migrationBuilder.AlterColumn<int>(
                name: "Id_Pedido",
                table: "ProductoPedido",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AlterColumn<int>(
                name: "Id_User",
                table: "Pedidos",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");
        }
    }
}
