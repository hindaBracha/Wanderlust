using bll.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

[ApiController]
[Route("api/types-trips")]
public class TypesTripController : ControllerBase
{
    private readonly ITypesTripBll _typesTripBll;

    public TypesTripController(ITypesTripBll typesTripBll)
    {
        _typesTripBll = typesTripBll ?? throw new ArgumentNullException(nameof(typesTripBll));
    }

    [HttpGet]
    public async Task<IActionResult> GetAllTypesTrips()
    {
        var typesTrips = await _typesTripBll.getAllAsync();
        return Ok(typesTrips);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetTypesTripById(int id)
    {
        var typesTrip = await _typesTripBll.getByIDAsync(id);

        if (typesTrip != null)
        {
            return Ok(typesTrip);
        }

        return NotFound();
    }

    [HttpPost]
    public async Task<IActionResult> AddTypesTrip([FromBody] dto.Classes.TypesTrip typesTrip)
    {
        var newTypesTripId = await _typesTripBll.addAsync(typesTrip);

        if (newTypesTripId != -1)
        {
            return CreatedAtAction(nameof(GetTypesTripById), new { id = newTypesTripId }, null);
        }

        return BadRequest("Invalid types trip data");
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTypesTrip(int id, [FromBody] dto.Classes.TypesTrip typesTrip)
    {
        typesTrip.Id = id;
        var success = await _typesTripBll.updateAsync(typesTrip);

        if (success)
        {
            return NoContent();
        }

        return NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTypesTrip(int id)
    {
        var success = await _typesTripBll.deleteAsync(id);

        if (success)
        {
            return NoContent();
        }

        return NotFound();
    }
}
