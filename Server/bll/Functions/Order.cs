using AutoMapper;
using bll.Interfaces;
using dal.Interfaces;
using dto.Classes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace bll.Functions
{
    public class OrderBll : IOrderBll
    {
        private readonly IOrderDal _idal;
        private readonly IMapper _mapper;

        public OrderBll(IOrderDal dal)
        {
            _idal = dal ?? throw new ArgumentNullException(nameof(dal));

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<TripsProfile>();
            });

            _mapper = config.CreateMapper();
        }

        public async Task<int> addAsync(dto.Classes.Order order)
        {
            //order.Date >= DateTime.Now &&
            if ( order.NumberOfPlaces > 0)
            {
                order.OrderDate = DateTime.Now;

                order.OrderTime = DateTime.Now.TimeOfDay;
                dal.Models.Order norder = _mapper.Map<dto.Classes.Order, dal.Models.Order>(order);

                int id = await _idal.addAsync(norder);

                ////norder.CodeTripNavigation.AvailablePlaces--;

                return id;
            }
            else
            {
                return -1;
            }
        }

        public Task<bool> deleteAsync(int id)
        {
            return _idal.deleteAsync(id);
        }

        public async Task<List<dto.Classes.Order>> getAllAsync()
        {
            List<dal.Models.Order> orders = await _idal.getAllAsync();
            return _mapper.Map<List<dal.Models.Order>, List<dto.Classes.Order>>(orders);
        }

        public Task<dto.Classes.Order> getByIDAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> updateAsync(dto.Classes.Order order)
        {
            throw new NotImplementedException();
        }

        public async Task<List<dto.Classes.Order>> getAllToTripAsync(int id)
        {
            List<dal.Models.Order> orders = (await _idal.getAllAsync()).Where(x => x.Id == id).ToList();
            return _mapper.Map<List<dal.Models.Order>, List<dto.Classes.Order>>(orders);
        }
    }
}
