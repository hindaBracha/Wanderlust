using bll.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System.Collections.Generic;
using dto.Classes;

[ApiController]
[Route("api/orders")]
public class OrderController : ControllerBase
{
    private readonly IOrderBll _orderBll;

    public OrderController(IOrderBll orderBll)
    {
        _orderBll = orderBll;
    }

    [HttpGet]
    public async Task<List<Order>> GetAllOrders()
    {
        var orders = await _orderBll.getAllAsync();
        return orders;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrderById(int id)
    {
        var order = await _orderBll.getByIDAsync(id);

        if (order != null)
        {
            return Ok(order);
        }

        return NotFound();
    }

    [HttpPost]
    public async Task<int> AddOrder([FromBody] dto.Classes.Order order)
    {
        var newOrderId = await _orderBll.addAsync(order);

        if (newOrderId != -1)
        {
            //CreatedAtAction(nameof(GetOrderById), new { id = newOrderId }, null)
            return newOrderId;
        }

        return -1;
        //BadRequest("Invalid order data")
    }

    [HttpDelete("{id}")]
    public async Task<bool> DeleteOrder(int id)
    {
        var success = await _orderBll.deleteAsync(id);

        if (success)
        {
            return true;
        }

        return false;
    }

    [HttpGet("trip/{id}")]
    public async Task<IActionResult> GetAllOrdersToTrip(int id)
    {
        var orders = await _orderBll.getAllToTripAsync(id);
        return Ok(orders);
    }
}
