using bll.Interfaces;
using dto.Classes;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly IUserBll _userBll;

    public UserController(IUserBll userBll)
    {
        _userBll = userBll ?? throw new ArgumentNullException(nameof(userBll));
    }

    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _userBll.getAllAsync();
        return Ok(users);
    }

    [HttpGet("byPass")]
    public async Task<User> GetUserById([FromQuery] string email, [FromQuery] string password)
    {
        var user = await _userBll.getByIDAsync(email, password);

        if (user != null)
        {
            return user;
        }

        return null;
    }

    [HttpPost]
    public async Task<int> AddUser([FromBody] dto.Classes.User user)
    {
        var newUserId = await _userBll.addAsync(user);

        if (newUserId != -1)
        {
            return newUserId;
        }

        return -1;
    }

    [HttpPut("{id}")]
    public async Task<bool> UpdateUser(int id, [FromBody] dto.Classes.User user)
    {
        var success = await _userBll.updateAsync(id,user);

        if (success)
        {
            return true;
        }

        return false;
    }

    [HttpDelete("{id}")]
    public async Task<bool> DeleteUser(int id)
    {
        var success = await _userBll.deleteAsync(id);

        if (success)
        {
            return true;
        }

        return false;
    }

    [HttpGet("{id}/trips")]
    public async Task<IActionResult> GetAllTripsForUser(int id)
    {
        var trips = await _userBll.getAllTripsAsync(id);
        return Ok(trips);
    }
}
