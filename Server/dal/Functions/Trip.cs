using dal.Interfaces;
using dal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dal.Functions
{
    public class TripDal : ITripDal
    {
        private readonly Trips2Context _db;

        public TripDal(Trips2Context db)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
        }

        public async Task<int> addAsync(Trip trip)
        {
            try
            {
                _db.Trips.Add(trip);
                await _db.SaveChangesAsync();
                return trip.Id;
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
                var tripToDelete = await _db.Trips.FirstOrDefaultAsync(u => u.Id == id);

                if (tripToDelete != null)
                {
                    _db.Trips.Remove(tripToDelete);
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

        public async Task<List<Trip>> getAllAsync()
        {
            try
            {
                var d = await _db.Trips
                    .Include(p => p.CodeTypeNavigation)
                    .ToListAsync();
                return d;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<Trip> getByIDAsync(int id)
        {
            try
            {
                return await _db.Trips
                    .Include(p => p.CodeTypeNavigation)
                    .FirstOrDefaultAsync(u => u.Id == id);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<bool> updateAsync(int id,Trip trip)
        {

            try
            {
                
                Trip u =  _db.Trips.ToList().Find(x => x.Id == id);
                // User u = GetUserByMailAndPassword(user.Email, user.Password);
                if (u != null)
                {
                    u.AvailablePlaces = trip.AvailablePlaces;

                    //db.Users.Update(user);
                    _db.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch
            {
                //logger.LogError("failed to update product" + ex.Message.ToString());
                return false;
                //throw ex;
            }
        }
    }
}

