
using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IMageMy : ControllerBase
    {
        
        [HttpPost("/api/upload/{id}")]
        public async Task<IActionResult> Upload(int id)
        {
            try
            {
                var file = HttpContext.Request.Form.Files["profile_picture"];

                if (file == null || file.Length == 0)
                {
                    return BadRequest("No file received.");
                }

                var uniqueFileName = id + ".png";
                var filePath = Path.Combine("wwwroot/images", uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                var imageUrl = $"{Request.Scheme}://{Request.Host}/images/{uniqueFileName}";

                return Ok(new { imageUrl });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("/api/getImage/{id}")]    
        public IActionResult GetImage(int id)
        {
            try
            {
                var uniqueFileName = id + ".png";
                var filePath = Path.Combine("wwwroot/images", uniqueFileName);

                var imageBytes = System.IO.File.ReadAllBytes(filePath);

                return File(imageBytes, "image/png");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("/api/getAllImages")]
        public IActionResult GetAllImages()
        {
            try
            {
                var imageUrls = new List<string>();

                var directoryPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

                var imageFiles = Directory.GetFiles(directoryPath, "*.png");

                foreach (var imageFile in imageFiles)
                {
                    var imageUrl = $"{Request.Scheme}://{Request.Host}/images/{Path.GetFileName(imageFile)}";
                    imageUrls.Add(imageUrl);
                }

                return Ok(imageUrls);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
