using System.ComponentModel.DataAnnotations;
namespace ApiProyecto.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        //eliminado el JSON ignore, porque sino no podia hacer POST
        public string? Password { get; set; }
        public bool? Admin { get; set; } = false;
    }
}