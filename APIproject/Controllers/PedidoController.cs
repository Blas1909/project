using ApiProyecto.Models;
using ApiProyecto.Helpers;
using ApiProyecto.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiProyecto.Controllers;

[ApiController]
[Route("[controller]")]

public class PedidosController : ControllerBase
{
    PedidoService _pedidosService;

    public PedidosController(PedidoService pedidosService)
    {
        _pedidosService = pedidosService;
    }

// POST action
    [HttpPost]
    public ProductoPedido Add(PedidoRealizar pedidoRealizar)
    {
        return _pedidosService.Add(pedidoRealizar);
    }


// GET action
 [HttpGet]
    public List<PedidosPorUsuario> PedidosPorUsuario(int id)
    {
        return _pedidosService.ConsultarPedidos(id);
    }
}
