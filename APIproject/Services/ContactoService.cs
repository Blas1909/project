using ApiProyecto.Models;
using Base.Data;
using Microsoft.EntityFrameworkCore;

namespace ApiProyecto.Services;


public class ContactoService
{
    private readonly BaseDeDatos _context;
    List<Contacto> Contactos { get; }

    public ContactoService(BaseDeDatos context)
    {
        _context = context;
    }


    public IEnumerable<Contacto> GetAll()
    {
        return _context.Contactos.AsNoTracking().ToList();
    }

    public Contacto Add(Contacto newContacto)
    {
        _context.Contactos.Add(newContacto);
        _context.SaveChanges();

        var productoPedido = new ProductoPedido{Cantidad = 3, Id_Pedido = 1, Id_Producto = 1};

    _context.ProductoPedido.Add(productoPedido);
    _context.SaveChanges();

        return newContacto;
    }
}