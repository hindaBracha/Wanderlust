using dto.Classes;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace bll.Interfaces
{
    public interface IUserBll
    {
        Task<List<User>> getAllAsync();
        Task<User> getByIDAsync(string email, string password);
        Task<int> addAsync(User user);
        Task<bool> updateAsync(int id,User user);
        Task<bool> deleteAsync(int id);
        Task<List<Trip>> getAllTripsAsync(int id);
    }
}
