using ApiProyecto.Models;


namespace Base.Data
{
    public static class DbInitializer
    {
        public static void Initialize(BaseDeDatos context)
        {
            if (context.Productos.Any())
            {
                return;
            }
            var productos = new Producto[]
            {
                new Producto
                {
                    Id = 1,
                    Marca = "Adidas",
                    Modelo = "A3",
                    Tipo = "Accesorio",
                    Descripcion = "Unas zapas Adidas",
                    Precio = 23.59m,
                    Stock = 3,
                    FileName = "producto5.jpg",
                },
                new Producto
                {
                    Id = 2,
                    Marca = "Fila",
                    Modelo = "F10",
                    Tipo = "Accesorio",
                    Descripcion = "Muñequeras Fila",
                    Precio = 23.59m,
                    Stock = 3,
                    FileName = "producto4.jpg",
                },
                new Producto
                {
                    Id = 3,
                    Marca = "MyProtein",
                    Modelo = "Proteina",
                    Tipo = "Suplemento",
                    Descripcion = "fresa",
                    Precio = 26.99m,
                    Stock = 3,
                    FileName = "producto3.png",
                },
                new Producto
                {
                    Id = 5,
                    Marca = "HSN",
                    Modelo = "Proteina",
                    Tipo = "Suplemento",
                    Descripcion = "whey",
                    Precio = 15.49m,
                    Stock = 3,
                    FileName = "producto2.jpg",
                }
            };
            var users = new User[]
            {
                new User
                {
                    Id = 1,
                    Name = "Test",
                    Email = "test@gmail.com",
                    Password = "test",
                    Admin = true
                }
            };
            var contactos = new Contacto[]
            {
                new Contacto
                {
                    Id = 1,
                    Motivo = "Prueba",
                    Descripcion = "Una prueba de contacto",
                    Email = "test@gmail.com",
                }
            };
            context.Contactos.AddRange(contactos);
            context.Users.AddRange(users);
            context.Productos.AddRange(productos);
            context.SaveChanges();
        }
    }
}