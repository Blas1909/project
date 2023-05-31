using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;

namespace file.Controllers
{
    [Route("api/file")]
    [ApiController]

    public class FileController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get(String imageUrl)
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", imageUrl);
            var image = System.IO.File.OpenRead(path);
            return File(image, "image/jpeg");
        }
    }
}