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
    public class UserBll : IUserBll
    {
        private readonly IUserDal _dal;
        private readonly ITripDal _dalT;
        private readonly IOrderDal _dalO;
        private readonly IMapper _mapper;

        public UserBll(IUserDal dal, ITripDal dalT, IOrderDal dalO)
        {
            _dal = dal ?? throw new ArgumentNullException(nameof(dal));
            _dalT = dalT ?? throw new ArgumentNullException(nameof(dalT));
            _dalO = dalO ?? throw new ArgumentNullException(nameof(dalO));

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<TripsProfile>();
            });

            _mapper = config.CreateMapper();
        }

        public async Task<int> addAsync(dto.Classes.User user)
        {
          var all  = await getAllAsync();

            if (!all.Any(t => t.Name == user.Name))
            {
         
                return await _dal.addAsync(_mapper.Map<dto.Classes.User, dal.Models.User>(user));
            }
            else
            {
                return -1;
            }
        }

        public async Task<bool> deleteAsync(int id)
        {
            var list = _mapper.Map<List<dal.Models.Trip>, List<dto.Classes.Trip>>(await _dalT.getAllAsync());
            await _dal.deleteAsync(id);
            return true;
        }


        public async Task<List<dto.Classes.User>> getAllAsync()
        {
            List<dal.Models.User> users = await _dal.getAllAsync();
            return _mapper.Map<List<dal.Models.User>, List<dto.Classes.User>>(users);
        }

        public async Task<dto.Classes.User> getByIDAsync(string email, string password)
        {
            //var allUsers = await getAllAsync();
            var user = await _dal.getByIDAsync(email, password);
            return _mapper.Map<dal.Models.User, dto.Classes.User>(user);
        }


        public async Task<bool> updateAsync(int id, dto.Classes.User user)
        {                     
               return await _dal.updateAsync(id,_mapper.Map<dto.Classes.User, dal.Models.User>(user));            
        }

        public async Task<List<dto.Classes.Trip>> getAllTripsAsync(int id)
        {
            
            List<dal.Models.Order> orders = (await _dalO.getAllAsync()).Where(x => x.CodeUser == id).ToList();
            List<dal.Models.Trip> trips = await _dalT.getAllAsync();
            List<dal.Models.Trip> mergedList = trips
                .Where(trip => orders.Any(order => order.CodeTrip == trip.Id)).ToList();
            return _mapper.Map<List<dal.Models.Trip>, List<dto.Classes.Trip>>(mergedList);
        }
    }
}
