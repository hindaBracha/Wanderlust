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

using dal.Functions;
using dal.Interfaces;
using Microsoft.Extensions.DependencyInjection;

public static class IBllEx
{
    public static void addDal(this IServiceCollection ExBll)
    {
        //ExBll.AddScoped<IOrderDal, OrderDal>();
        //ExBll.AddScoped<ITripDal, TripDal>();
        //ExBll.AddScoped<ITypesTripDal, TypesTripDal>();
        //ExBll.AddScoped<IUserDal, UserDal>();
    }
}
