using Microsoft.EntityFrameworkCore;
using ApiProyecto.Models;
//se importan los modelos de ambas "api con diferente namespace" para poder usar sus objetos (coches y usuarios)

namespace Base.Data;

public class BaseDeDatos : DbContext
{
    public BaseDeDatos(DbContextOptions<BaseDeDatos> options)
    : base(options)
    {
    }

    public DbSet<Producto> Productos => Set<Producto>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Contacto> Contactos => Set<Contacto>();
    public DbSet<Pedido> Pedidos => Set<Pedido>();
    public DbSet<ProductoPedido> ProductoPedido => Set<ProductoPedido>();
}