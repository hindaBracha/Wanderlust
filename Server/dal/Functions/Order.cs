using dal.Interfaces;
using dal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace dal.Functions
{
    public class OrderDal : IOrderDal
    {
        private readonly Trips2Context _db;

        public OrderDal(Trips2Context db)
        {
            _db = db ?? throw new ArgumentNullException(nameof(db));
        }

        public async Task<int> addAsync(Order order)
        {
            try
            {
                await _db.Orders.AddAsync(order);
                Trip t= await _db.Trips.FirstOrDefaultAsync(t=>t.Id==order.CodeTrip);
                t.AvailablePlaces = t.AvailablePlaces - order.NumberOfPlaces;
                await _db.SaveChangesAsync();
                return order.Id;
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
                var orderToDelete = await _db.Orders.FirstOrDefaultAsync(u => u.Id == id);

                if (orderToDelete != null)
                {
                    _db.Orders.Remove(orderToDelete);
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

        public async Task<List<Order>> getAllAsync()
        {
            return await _db.Orders
                .Include(p => p.CodeTripNavigation)
                .Include(p => p.CodeUserNavigation)
                .ToListAsync();
        }

        public async Task<Order> getByIDAsync(int id)
        {
            return await _db.Orders
                .Include(p => p.CodeTripNavigation)
                .Include(p => p.CodeUserNavigation)
                .FirstOrDefaultAsync(o => o.Id == id);
        }

        public Task<bool> updateAsync(Order order)
        {
            throw new NotImplementedException();
        }
    }
}
