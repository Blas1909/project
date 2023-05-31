using System.ComponentModel.DataAnnotations;
namespace ApiProyecto.Models
{
    public class Pedido
    {
        [Key]
        public int Id { get; set; }
        public int Id_User { get; set; }
    }

    public class PedidoRealizar
    {
        public int Id_User { get; set; }
        public List<ItemPedido> list { get; set; }
    }
    public class ItemPedido
    {
        public int Id_Producto { get; set; }
        public int cantidad { get; set; }
        public decimal Precio { get; set; }
    }
}