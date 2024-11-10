using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;
using dto.Classes;
using dal.Interfaces;

namespace dto.Classes
{
    public class TripsProfile : Profile
    {
        IOrderDal dalOrders;

        public TripsProfile()
        {
            CreateMap<dal.Models.TypesTrip, TypesTrip>().ReverseMap();
            CreateMap<dal.Models.TypesTrip, TypesTrip>().ReverseMap()
                .ForMember(dest => dest.Id, opt => opt.Ignore());


            CreateMap<dal.Models.User, User>().ReverseMap();
            CreateMap<dal.Models.User, User>().ReverseMap()
                .ForMember(dest => dest.Id, opt => opt.Ignore());


            CreateMap<Order, dal.Models.Order>()
            .ForMember(dest => dest.Id, opt => opt.Ignore());
            CreateMap<dal.Models.Order, Order>()
                .ForMember(dest => dest.Name,
                opt => opt.MapFrom(src => src.CodeUserNavigation.Name + " " + src.CodeUserNavigation.LastName))
               .ForMember(dest => dest.Destination,
                opt => opt.MapFrom(src => src.CodeTripNavigation.Destination))
               .ForMember(dest => dest.Date,
                opt => opt.MapFrom(src => src.CodeTripNavigation.Date));

            CreateMap<Trip, dal.Models.Trip>()
                .ForMember(dest => dest.Id, opt => opt.Ignore());
            CreateMap<dal.Models.Trip, Trip>()
                .ForMember(dest => dest.NameType, opt => opt.MapFrom(src => src.CodeTypeNavigation.Name))
                .ForMember(dest => dest.Medic, opt => opt.MapFrom(src => src.Orders.Any(order => order.CodeUserNavigation.Facertificate == 0)));

            //opt => opt.MapFrom(async (src, dest, _, context) =>
            //{
            //    //var orders = await dalOrders.getAllAsync();
            //    //orders.FirstOrDefault(x => x.CodeTrip == src.Id && x.CodeUserNavigation.Facertificate == 1);


            //}));


        }
    }
}
//CreateMap<dal.Models.Trip, Trip>()
//    .ForMember(dest => dest.NameType, opt => opt.MapFrom(src => src.CodeTypeNavigation.Name))
//    .ForMember(dest => dest.Medic, opt => opt.MapFrom(src =>
//        dalOrders.getAll().FirstOrDefault(x => x.CodeTrip == src.Id && x.CodeUserNavigation.Facertificate == 1)
//    ))
//    .ForMember(dest => dest.Id, opt => opt.Ignore()) // התעלמות מ-Id רק בצד היעד
//    .ReverseMap();

//public MapperProfile()
//{
//    CreateMap();
//    CreateMap()
//    .ForMember(dest => dest.IdBooking, opt => opt.Ignore());

//    CreateMap();
//    CreateMap()
//    .ForMember(dest => dest.IdTrips, opt => opt.Ignore())
//    .ForMember(dest => dest.typeName, opt => opt.MapFrom(src => src.IdTypeNavigation.NameType));

//    CreateMap();
//    CreateMap()
//    .ForMember(dest => dest.IdType, opt => opt.Ignore());

//    CreateMap();
//    CreateMap()
//    .ForMember(dest => dest.IdUser, opt => opt.Ignore());
//}

//}
//}
