using dal.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dal.Interfaces
{
    public interface IUserDal
    {
        Task<List<User>> getAllAsync();
        Task<User> getByIDAsync(string email, string password);
        Task<int> addAsync(User User);
        Task<bool> updateAsync(int id, User User);
        Task<bool> deleteAsync(int id);
    }
}
