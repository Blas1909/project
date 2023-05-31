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


public interface IUserService
{
    AuthenticateResponse Authenticate(AuthenticateRequest model);
    IEnumerable<User> GetAll();
    User Add(User newUser);
    // void Add(User user);
    User? GetById(int Id);
    void Update(int id, User user);
    // void Update(User user);
}

public class UserService : IUserService
{

    private readonly BaseDeDatos _context;

    public UserService(BaseDeDatos context, IOptions<AppSettings> appSettings)
    {

        _context = context;
        _appSettings = appSettings.Value;
        // users = new List<User>
        // {
        //     new User { Id = 1, Name = "Test", Email = "test@gmail.com", Password = "test" }
        // };
    }

    // private List<User> users = new List<User>
    // {
    //     new User { Id = 1, Name = "Test", Email = "test@gmail.com", Password = "test" }
    // };


    private readonly AppSettings _appSettings;

    public AuthenticateResponse Authenticate(AuthenticateRequest model)
    {
        var user = _context.Users.SingleOrDefault(x => x.Email == model.Email && x.Password == model.Password);

        // return null if user not found
        if (user == null) return null;

        // authentication successful so generate jwt token
        var token = generateJwtToken(user);

        return new AuthenticateResponse(user, token);
    }





    // public IEnumerable<User> GetAll() => users;
    // metodo get all remplazado por esto
    public IEnumerable<User> GetAll()
    {
        return _context.Users.AsNoTracking().ToList();
    }





    // public User? GetById(int Id) => Users.FirstOrDefault(x => x.Id == Id);
    // metodo GetById remplazado por esto
    public User? GetById(int id)
    {
        return _context.Users.AsNoTracking().SingleOrDefault(p => p.Id == id);
    }





    // helper methods

    private string generateJwtToken(User user)
    {
        // generate token that is valid for 7 days
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }





    // public void Add(User user)
    // {
    //     user.Id = nextId++;
    //     Users.Add(user);
    // }
    // metodo Add remplazado por esto

    public User Add(User newUser)
    {
        _context.Users.Add(newUser);
        _context.SaveChanges();

        return newUser;
    }





    // public void Update(User user)
    // {
    //     var index = users.FindIndex(p => p.Id == user.Id);
    //     if (index == -1)
    //         return;

    //     users[index].Name = user.Name;
    //     users[index].Email = user.Email;
    // }
    // metodo Update remplazado por esto


    public void Update(int id, User user)
    {
        var userToUpdate = _context.Users.Find(id);

        if (userToUpdate is null)
        {
            throw new NullReferenceException("El usuario no existe");
        }
        userToUpdate.Name = user.Name;
        userToUpdate.Email = user.Email;
        _context.SaveChanges();
    }
}