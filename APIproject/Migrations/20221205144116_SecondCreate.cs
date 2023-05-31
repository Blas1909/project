using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiProyecto.Migrations
{
    public partial class SecondCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Precio",
                table: "Productos",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "REAL");

            migrationBuilder.AddColumn<int>(
                name: "PedidoId_pedido",
                table: "Productos",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Motivo",
                table: "Contactos",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "Descripcion",
                table: "Contactos",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Contactos",
                type: "TEXT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Pedidos",
                columns: table => new
                {
                    Id_pedido = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Id_User = table.Column<int>(type: "INTEGER", nullable: true),
                    Cantidad = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pedidos", x => x.Id_pedido);
                });

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Productos_Pedidos_PedidoId_pedido",
                table: "Productos");

            migrationBuilder.DropTable(
                name: "Pedidos");

            migrationBuilder.DropIndex(
                name: "IX_Productos_PedidoId_pedido",
                table: "Productos");

            migrationBuilder.DropColumn(
                name: "PedidoId_pedido",
                table: "Productos");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Contactos");

            migrationBuilder.AlterColumn<double>(
                name: "Precio",
                table: "Productos",
                type: "REAL",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "TEXT");

            migrationBuilder.AlterColumn<string>(
                name: "Motivo",
                table: "Contactos",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Descripcion",
                table: "Contactos",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);
        }
    }
}
