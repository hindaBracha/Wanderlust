using dto.Classes;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace bll.Interfaces
{
    public interface ITripBll
    {
        Task<List<Trip>> getAllAsync();
        Task<Trip> getByIDAsync(int id);
        Task<int> addAsync(Trip trip);
        Task<bool> updateAsync(int id,Trip trip);
        Task<bool> deleteAsync(int id);
        Task<List<Order>> getOrderToTripAsync(int id);
    }
}
