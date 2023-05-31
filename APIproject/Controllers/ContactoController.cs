using ApiProyecto.Models;
using ApiProyecto.Services;
using Microsoft.AspNetCore.Mvc;
using file.Controllers;

namespace ApiProyecto.Controllers;

[ApiController]
[Route("[controller]")]

public class ContactoController : ControllerBase
{
    ContactoService _contactoservice;

    public ContactoController(ContactoService contactoservice)
    {
        _contactoservice = contactoservice;
    }

    // GET all action
    [HttpGet]
    public IEnumerable<Contacto> GetAll()
    {
        return _contactoservice.GetAll();
    }

    // POST action
    [HttpPost]
    public IActionResult Create(Contacto contacto)
    {
        // Este codigo guardara el producto y devolvera un resultado
        _contactoservice.Add(contacto);
        return CreatedAtAction(nameof(Create), new { id = contacto.Id }, contacto);
    }
}