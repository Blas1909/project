using ApiProyecto.Models;
using ApiProyecto.Services;
using Microsoft.AspNetCore.Mvc;
using file.Controllers;

namespace ApiProyecto.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductoController : ControllerBase
{
    ProductoService _productoservice;

    public ProductoController(ProductoService productoservice)
    {
        _productoservice = productoservice;
    }

    // GET all action
    [HttpGet]
    public IEnumerable<Producto> GetAll()
    {
        return _productoservice.GetAll();
    }

    // GET by Id action
    [HttpGet("{id}")]
    public ActionResult<Producto> Get(int id)
    {
        var producto = _productoservice.GetById(id);

        if (producto == null)
        {
            return NotFound();
        }
        return producto;
    }






    // [HttpPost]
    // public IActionResult Create(Producto producto)
    // {
    //     // Este codigo guardara el producto y devolvera un resultado
    //     _productoservice.Add(producto);
    //     return CreatedAtAction(nameof(Create), new { id = producto.Id }, producto);
    // }

    // POST action
    // [Consumes("multipart/form-data")]
    [HttpPost]
    public ActionResult Post([FromForm] ProductoAdd producto)
    {
        var filename = string.Empty;
        if (producto.FormFile != null)
        {
            try
            {
                filename = $"{Guid.NewGuid()}{Path.GetExtension(producto.FormFile.FileName)}";
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", filename);
                Console.WriteLine(path);
                using (Stream stream = new FileStream(path, FileMode.Create))
                {
                    producto.FormFile.CopyTo(stream);
                }
                // return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        var productoAdd = _productoservice.Add(new Producto
        {
            Descripcion = producto.Descripcion,
            FileName = filename,
            Marca = producto.Marca,
            Modelo = producto.Modelo,
            Precio = producto.Precio,
            Stock = producto.Stock,
            Tipo = producto.Tipo
        });
        return CreatedAtAction(nameof(Post), new { id = productoAdd.Id }, productoAdd);
    }






    // PUT action
    [HttpPut("{id}")]
    public IActionResult Update(int id, ProductoAdd producto)
    {
        // Este codigo actualizara el producto y devolvera un resultado
        // if (id != producto.Id)
        //     return BadRequest();

        var existingProducto = _productoservice.GetById(id);
        if (existingProducto is null)
            return NotFound();

        existingProducto.Descripcion = producto.Descripcion;
        existingProducto.Marca = producto.Marca;
        existingProducto.Modelo = producto.Modelo;
        existingProducto.Precio = producto.Precio;
        existingProducto.Stock = producto.Stock;
        existingProducto.Tipo = producto.Tipo;

        _productoservice.Update(id, existingProducto);

        return NoContent();
    }









    // DELETE action
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        // Este codigo eliminara el producto y devolvera un resultado
        var producto = _productoservice.GetById(id);

        if (producto is null)
            return NotFound();

        _productoservice.Delete(id);

        return NoContent();
    }
}