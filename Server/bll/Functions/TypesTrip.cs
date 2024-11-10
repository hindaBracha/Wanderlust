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
    public class TypesTripBll : ITypesTripBll
    {
        private readonly ITypesTripDal _dal;
        private readonly IMapper _mapper;

        public TypesTripBll(ITypesTripDal dal)
        {
            _dal = dal ?? throw new ArgumentNullException(nameof(dal));

            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile<TripsProfile>();
            });

            _mapper = config.CreateMapper();
        }

        public async Task<int> addAsync(dto.Classes.TypesTrip typesTrip)
        {
            var allTypesTrips = await getAllAsync();

            if (!allTypesTrips.Any(t => t.Name == typesTrip.Name))
            {
                int id = await _dal.addAsync(_mapper.Map<dto.Classes.TypesTrip, dal.Models.TypesTrip>(typesTrip));
                return id;
            }
            else
            {
                return -1;
            }
        }

        public Task<bool> deleteAsync(int id)
        {
            try
            {
                return _dal.deleteAsync(id);
            }
            catch (Exception ex)
            {
                return Task.FromResult(false);
            }
        }

        public async Task<List<dto.Classes.TypesTrip>> getAllAsync()
        {
            List<dal.Models.TypesTrip> typesTrips = await _dal.getAllAsync();
            return _mapper.Map<List<dal.Models.TypesTrip>, List<dto.Classes.TypesTrip>>(typesTrips);
        }

        public Task<dto.Classes.TypesTrip> getByIDAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> updateAsync(dto.Classes.TypesTrip typesTrip)
        {
            throw new NotImplementedException();
        }
    }
}
