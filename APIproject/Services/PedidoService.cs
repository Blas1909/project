using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ApiProyecto.Helpers;
using ApiProyecto.Models;
using ApiProyecto.Services;

using Base.Data;
using Microsoft.EntityFrameworkCore;

namespace ApiProyecto.Services;




public class PedidoService 
{
    private readonly BaseDeDatos _context;

    public PedidoService(BaseDeDatos context)
    {
        _context = context;
    }

public ProductoPedido Add(PedidoRealizar pedidoRealizar)
{
    var pedido = new Pedido { Id_User= pedidoRealizar.Id_User};
    _context.Pedidos.Add(pedido);
    _context.SaveChanges();
    
    foreach(var item in pedidoRealizar.list)
    {
        var productoPedido = new ProductoPedido();
        productoPedido.Cantidad = item.cantidad; 
        productoPedido.Id_Pedido = pedido.Id;
        productoPedido.Id_Producto = item.Id_Producto;
        var producto = _context.Productos.FirstOrDefault(x=> x.Id == item.Id_Producto);
        productoPedido.Precio = producto.Precio;

        producto.Stock = producto.Stock - item.cantidad;

        _context.ProductoPedido.Add(productoPedido);
        _context.SaveChanges();
    }

    return new ProductoPedido();
}



    internal List<PedidosPorUsuario> ConsultarPedidos(int id)
    {
        //Buscamos todos los pedidos por usuario
        var pedidosUsuario = _context.Pedidos.Where(x => x.Id_User == id).ToList();
        List<ProductoPedido> productosPorUsuario = new List<ProductoPedido>();
        List<PedidosPorUsuario> pedidosPorUsuarios = new List<PedidosPorUsuario>();
        
        //Recorremos todos los pedidos que ha realizado el usuario
        foreach(var pedido in pedidosUsuario)
        {
            //Inicializamos un objeto de PedidosPorUsuario para ir añadiendo al array
            PedidosPorUsuario pedidosPor = new PedidosPorUsuario();
            pedidosPor.Productos = new List<Productos>();
            List<Productos> productos = new List<Productos>();
            //Buscamos todos los productos que tengan el id del pedido
            productosPorUsuario = _context.ProductoPedido.Where(z => z.Id_Pedido == pedido.Id).ToList();
            //Recorremos todos los productos de cada Pedido
            foreach(var productoDelPedido in productosPorUsuario)
            {
                //Buscamos el producto del Pedido en la base de datos, para sacar la marca, el modelo y el precio
                var productoGenerico = _context.Productos.FirstOrDefault(x => x.Id == productoDelPedido.Id_Producto);
                productos.Add(new Productos
                {
                    Cantidad = productoDelPedido.Cantidad,
                    Id_Producto = productoDelPedido.Id_Producto,
                    Marca = productoGenerico.Marca,
                    Modelo = productoGenerico.Modelo,
                    Precio = productoDelPedido.Precio
                });
                
            }
            //Montamos el objeto que enviaremos al frontend
            pedidosPor.Id_Pedido = pedido.Id;
            pedidosPor.Productos.AddRange(productos);
            pedidosPorUsuarios.Add(pedidosPor);
        }
        return pedidosPorUsuarios;
    }
}

public class PedidosPorUsuario
{
    public int Id_Pedido {get; set;}
    public List<Productos> Productos {get; set;}
}

public class Productos
{
    public int Id_Producto { get; set; }
    public int Cantidad { get; set; }
    public string Marca { get; set; }
    public string Modelo { get; set; }
    public decimal Precio { get; set; }
}







//asi estaba antes

// public interface IPedidosService
// {
//     private readonly BaseDeDatos _context;
//     List<Pedido> Pedidos { get; }

//     public IPedidosService(BaseDeDatos context)
//     {
//         _context = context;
//     }

//     public IEnumerable<Pedido> GetAll()
//     {
//         return _context.Pedidos.AsNoTracking().ToList();
//     }

//     public Pedido Add(Pedido newPedido)
//     {
        
//     }
    
// }

// public class PedidioService : IPedidosService 
// {
//     private readonly BaseDeDatos _context;

// }