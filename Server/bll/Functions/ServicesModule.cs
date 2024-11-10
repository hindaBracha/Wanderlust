//using bll.Functions;
//using bll.Interfaces;
//using Microsoft.Extensions.DependencyInjection;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace bll.Functions
//{
//    internal class ServicesModule
//    {

//    }
//}
using bll.Functions;
using bll.Interfaces;
using dal.Functions;
using dal.Interfaces;
using dal.Models;
using Microsoft.Extensions.DependencyInjection;

public static class ServicesModule
{
    public static void AddBll(this IServiceCollection services)
    {
        services.addDal();
        services.AddScoped<IOrderBll, OrderBll>();
        services.AddScoped<ITripBll, TripBll>();
        services.AddScoped<ITypesTripBll, TypesTripBll>();
        services.AddScoped<IUserBll, UserBll>();
    
    //services.AddSingleton<ITrips2Context, Trips2Context>;
    // הוספת שאר ה-Services...
}
}
