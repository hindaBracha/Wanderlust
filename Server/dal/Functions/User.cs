using dal.Interfaces;
using dal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dal.Functions
{
    public class UserDal : IUserDal
    {
        private readonly Trips2Context _db;

        public UserDal(Trips2Context db)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
        }

        public async Task<int> addAsync(User user)
        {
            try
            {
                _db.Users.Add(user);
                await _db.SaveChangesAsync();
                return user.Id;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        public async Task<bool> deleteAsync(int id)
        {
            try
            {
                var userToDelete = await _db.Users.FirstOrDefaultAsync(u => u.Id == id);

                if (userToDelete != null)
                {
                    _db.Users.Remove(userToDelete);
                    await _db.SaveChangesAsync();
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<List<User>> getAllAsync()
        {
            try
            {
                return await _db.Users.ToListAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<User> getByIDAsync(string email, string password)
        {
            try
            {
                return await _db.Users.FirstOrDefaultAsync(o => o.Email == email && o.Password == password);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

       

       

        public async Task<bool> updateAsync(int id, User updatedUser)
        {
            var allUsers = await getAllAsync();

            var existingUser = allUsers.FirstOrDefault(u => u.Id == id);

            if (existingUser != null)
            {
                try
                {

                    // עדכון המשתמש בבסיס הנתונים
                    existingUser.Name = updatedUser.Name;
                    existingUser.LastName = updatedUser.LastName;
                    existingUser.Email = updatedUser.Email;
                    existingUser.Password = updatedUser.Password;
                    await _db.SaveChangesAsync();
                    return true;
                }
                catch (Exception)
                {
                    // טיפול בשגיאה אם יש כל בעיה בעדכון
                    return false;
                }
            } 
            return true;

        }
    }
}
