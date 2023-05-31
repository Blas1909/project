using System.ComponentModel.DataAnnotations;
namespace ApiProyecto.Models
{
    public class Contacto
    {
        [Key]
        public int Id { get; set; }
        public string Motivo { get; set; }
        public string Descripcion { get; set; }
        public string Email { get; set; }
    }
}