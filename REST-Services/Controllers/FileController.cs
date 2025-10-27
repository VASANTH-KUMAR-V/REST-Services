using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace FileUploadAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageUploadController : ControllerBase
    {
        private readonly string uploadsFolder = @"C:\Users\Anaiyaan\source\repos\REST-Services\Restapi";
        //private readonly string uploadsFolder = @"E:\Restapi";

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile image)
        {
            if (image == null || image.Length == 0)
                return BadRequest("No image uploaded.");

            // Validate image type
            var allowedTypes = new[] { "image/jpeg", "image/png", "image/jpg" };
            if (!allowedTypes.Contains(image.ContentType))
                return BadRequest("Only JPG and PNG images are allowed.");

            // Ensure folder exists
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var filePath = Path.Combine(uploadsFolder, image.FileName);

            // Save the file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            return Ok(new
            {
                Message = "Image uploaded successfully!",
                FileName = image.FileName,
                FilePath = filePath
            });
        }

        [HttpGet("download/{fileName}")]
        public IActionResult DownloadImage(string fileName)
        {
            if (string.IsNullOrEmpty(fileName))
                return BadRequest("File name must be provided.");

            var filePath = Path.Combine(uploadsFolder, fileName);

            if (!System.IO.File.Exists(filePath))
                return NotFound("File not found.");

            var fileBytes = System.IO.File.ReadAllBytes(filePath);

            // Set content type based on file extension
            var contentType = fileName.EndsWith(".png") ? "image/png" : "image/jpeg";

            return File(fileBytes, contentType, fileName);
        }
    }
}
