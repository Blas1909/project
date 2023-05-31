using System.ComponentModel.DataAnnotations;
namespace ApiProyecto.Models
{
    public class ProductoPedido
    {
        [Key]
        public int Id { get; set; }
        public int Id_Pedido { get; set; }
        public int Id_Producto { get; set; }
        public int Cantidad { get; set; }
        public decimal Precio { get; set; }
    }
}