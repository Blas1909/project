using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiProyecto.Models

{
    public class Producto
    {
        [Key]
        public int Id { get; set; }

        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string Tipo { get; set; }
        public string Descripcion { get; set; }
        public decimal Precio { get; set; }
        public int Stock { get; set; }
        public string FileName { get; set; }
    }
}