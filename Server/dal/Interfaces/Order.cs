using dal.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dal.Interfaces
{
    public interface IOrderDal
    {
        Task<List<Order>> getAllAsync();
        Task<Order> getByIDAsync(int id);
        Task<int> addAsync(Order order);
        Task<bool> updateAsync(Order order);
        Task<bool> deleteAsync(int id);
    }
}
