using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ApiProyecto.Models

{
    public class ProductoAdd
    {
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string Tipo { get; set; }
        public string Descripcion { get; set; }
        public decimal Precio { get; set; }
        public int Stock { get; set; }
        public IFormFile FormFile { get; set; }
    }
}