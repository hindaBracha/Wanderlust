using dto.Classes;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace bll.Interfaces
{
    public interface ITypesTripBll
    {
        Task<List<TypesTrip>> getAllAsync();
        Task<TypesTrip> getByIDAsync(int id);
        Task<int> addAsync(TypesTrip typesTrip);
        Task<bool> updateAsync(TypesTrip typesTrip);
        Task<bool> deleteAsync(int id);
    }
}
