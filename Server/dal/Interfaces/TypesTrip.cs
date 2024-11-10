using dal.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dal.Interfaces
{
    public interface ITypesTripDal
    {
        Task<List<TypesTrip>> getAllAsync();
        Task<TypesTrip> getByIDAsync(int id);
        Task<int> addAsync(TypesTrip TypesTrip);
        Task<bool> updateAsync(TypesTrip TypesTrip);
        Task<bool> deleteAsync(int id);
    }
}
