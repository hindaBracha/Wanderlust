using dto.Classes;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace bll.Interfaces
{
    public interface IOrderBll
    {
        Task<List<Order>> getAllAsync();
        Task<Order> getByIDAsync(int id);
        Task<int> addAsync(Order order);
        Task<bool> updateAsync(Order order);
        Task<bool> deleteAsync(int id);
        Task<List<Order>> getAllToTripAsync(int id);
    }
}
