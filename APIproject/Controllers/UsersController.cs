using Microsoft.AspNetCore.Mvc;
using ApiProyecto.Helpers;
using ApiProyecto.Models;
using ApiProyecto.Services;

namespace ApiProyecto.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("authenticate")]
    public IActionResult Authenticate(AuthenticateRequest model)
    {
        var response = _userService.Authenticate(model);

        if (response == null)
            return BadRequest(new { message = "Email or password is incorrect" });

        return Ok(response);
    }



    // POST action
    [HttpPost]
    public IActionResult Add(Models.User user)
    {
        bool exists = _userService.GetAll().Any(u => u.Email == user.Email);
        if (exists)
        {
            return BadRequest();
        }
        else
        {
            // Este codigo guardara el usuario y devolvera un resultado
            _userService.Add(user);
            return CreatedAtAction(nameof(Add), new { Id = user.Id }, user);
        }
    }


    //POST edit action
    [HttpPost("{id}")]
    public IActionResult Update(int Id, User user)
    {
        // Este codigo actualizara el usuario y devolvera un resultado
        if (Id != user.Id)
            return BadRequest();

        var existingUser = _userService.GetById(Id);
        if (existingUser is null)
            return NotFound();

        _userService.Update(Id, user);
        // _userService.Update(user);

        return NoContent();
    }


    [HttpGet]
    public IActionResult GetAll()
    {
        var users = _userService.GetAll();
        return Ok(users);
    }
}