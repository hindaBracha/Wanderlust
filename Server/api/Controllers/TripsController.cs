using bll.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

[ApiController]
[Route("api/trips")]
public class TripController : ControllerBase
{
    private readonly ITripBll _tripBll;

    public TripController(ITripBll tripBll)
    {
        _tripBll = tripBll ?? throw new ArgumentNullException(nameof(tripBll));
    }

    [HttpGet]
public async Task<List<dto.Classes.Trip>> GetAllTrips()
{
    var trips = await _tripBll.getAllAsync();
    return trips;
}


    [HttpGet("{id}")]
    public async Task<IActionResult> GetTripById(int id)
    {
        var trip = await _tripBll.getByIDAsync(id);

        if (trip != null)
        {
            return Ok(trip);
        }

        return NotFound();
    }

    [HttpGet("{id}/invites")]
    public async Task<IActionResult> GetInvitesToTripById(int id)
    {
        var invites = await _tripBll.getOrderToTripAsync(id);
        return Ok(invites);
    }

    [HttpPost]
    public async Task<IActionResult> AddTrip([FromBody] dto.Classes.Trip trip)
    {
        var newTripId = await _tripBll.addAsync(trip);

        if (newTripId != -1)
        {
            return CreatedAtAction(nameof(GetTripById), new { id = newTripId }, null);
        }

        return BadRequest("Invalid trip data");
    }

    [HttpPost("{id}/invite")]
    public async Task<IActionResult> AddInviteToTrip(int id)
    {
        // Implement the logic to add an invite to a trip asynchronously
        // and return the result
        return Ok();
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTrip(int id, [FromBody] dto.Classes.Trip trip)
    {
        //trip.Id = id;
        var success = await _tripBll.updateAsync(id, trip);

        if (success)
        {
            return NoContent();
        }

        return NotFound();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTrip(int id)
    {
        var success = await _tripBll.deleteAsync(id);

        if (success)
        {
            return NoContent();
        }

        return NotFound();
    }
}
