using dal.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dal.Interfaces
{
    public interface ITripDal
    {
        Task<List<Trip>> getAllAsync();
        Task<Trip> getByIDAsync(int id);
        Task<int> addAsync(Trip trip);
        Task<bool> updateAsync(int id,Trip trip);
        Task<bool> deleteAsync(int id);
    }
}
