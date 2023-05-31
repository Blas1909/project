using ApiProyecto.Models;
using Base.Data;
using Microsoft.EntityFrameworkCore;

namespace ApiProyecto.Services;

public class ProductoService
{

    private readonly BaseDeDatos _context;
    List<Producto> Productos { get; }

    public ProductoService(BaseDeDatos context)
    {
        _context = context;
    }


    public IEnumerable<Producto> GetAll()
    {
        return _context.Productos.AsNoTracking().ToList();
    }



    public Producto? GetById(int id)
    {
        return _context.Productos.AsNoTracking().SingleOrDefault(p => p.Id == id);
    }




    public Producto Add(Producto newProducto)
    {
        _context.Productos.Add(newProducto);
        _context.SaveChanges();

        return newProducto;
    }


    public void Delete(int id)
    {
        var productoToDelete = _context.Productos.Find(id);
        if (productoToDelete is not null)
        {
            _context.Productos.Remove(productoToDelete);
            _context.SaveChanges();
        }
    }



//probar update de un array cambiando solo la cnatidad
//preguntar a kiko
    public void Update(int id, Producto producto)
    {
        var productoToUpdate = _context.Productos.Find(id);

        if (productoToUpdate is null)
        {
            throw new NullReferenceException("El producto no existe");
        }
        productoToUpdate.Marca = producto.Marca;
        productoToUpdate.Modelo = producto.Modelo;
        productoToUpdate.Tipo = producto.Tipo;
        productoToUpdate.Descripcion = producto.Descripcion;
        productoToUpdate.Precio = producto.Precio;
        productoToUpdate.Stock = producto.Stock;
        _context.SaveChanges();
    }
}