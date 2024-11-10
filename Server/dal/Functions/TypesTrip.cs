using dal.Interfaces;
using dal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dal.Functions
{
    public class TypesTripDal : ITypesTripDal
    {
        private readonly Trips2Context _db;

        public TypesTripDal(Trips2Context db)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
        }

        public async Task<int> addAsync(TypesTrip typesTrip)
        {
            try
            {
                _db.TypesTrips.Add(typesTrip);
                await _db.SaveChangesAsync();
                return typesTrip.Id;
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
                var typesTripToDelete = await _db.TypesTrips.FirstOrDefaultAsync(u => u.Id == id);

                if (typesTripToDelete != null)
                {
                    _db.TypesTrips.Remove(typesTripToDelete);
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

        public async Task<List<TypesTrip>> getAllAsync()
        {
            try
            {
                return await _db.TypesTrips.ToListAsync();
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<TypesTrip> getByIDAsync(int id)
        {
            try
            {
                return await _db.TypesTrips.FirstOrDefaultAsync(o => o.Id == id);
            }
            catch (Exception)
            {
                throw;
            }
        }

        public Task<bool> updateAsync(TypesTrip typesTrip)
        {
            throw new NotImplementedException();
        }
    }
}
