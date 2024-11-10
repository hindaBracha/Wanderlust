using AutoMapper;
using bll.Interfaces;
using dal.Interfaces;
using dal.Models;
using dto.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace bll.Functions
{
    public class TripBll : ITripBll
    {
        private readonly ITripDal _dal;
        private readonly IMapper _mapper;

        public TripBll(ITripDal dalT)
        {
            _dal = dalT ?? throw new ArgumentNullException(nameof(dalT));

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<TripsProfile>();
            });

            _mapper = config.CreateMapper();
        }

        public async Task<int> addAsync(dto.Classes.Trip trip)
        {
            if (trip.Date > DateTime.Now && trip.Long >= 1 && trip.Long <= 200 && trip.AvailablePlaces > 0 && trip.Price <= trip.Long / 24 * 500)
            {
                int id = await _dal.addAsync(_mapper.Map<dto.Classes.Trip, dal.Models.Trip>(trip));
                return id;
            }
            return -1;
        }

        public Task<bool> deleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<dto.Classes.Trip>> getAllAsync()
        {
            List<dal.Models.Trip> trips = await _dal.getAllAsync();
            return _mapper.Map<List<dal.Models.Trip>, List<dto.Classes.Trip>>(trips);
        }

        public async Task<dto.Classes.Trip> getByIDAsync(int id)
        {
            return (await getAllAsync()).FirstOrDefault(u => u.Id == id);
        }

        public async Task<bool> updateAsync(int id,dto.Classes.Trip trip)
        {
            //var existingTrip = (await getAllAsync()).FirstOrDefault(u => u.Id == trip.Id);

            //if (existingTrip != null)
            //{
              return await _dal.updateAsync(id,_mapper.Map<dto.Classes.Trip, dal.Models.Trip>(trip));
                 //true;
            //}
            //else
            //{
            //    return false;
            //}
        }

        public async Task<List<dto.Classes.Order>> getOrderToTripAsync(int id)
        {
            dal.Models.Trip trip = (await _dal.getAllAsync()).FirstOrDefault(x => x.Id == id);

            return _mapper.Map<List<dal.Models.Order>, List<dto.Classes.Order>>(trip.Orders.ToList());
        }
    }
}
