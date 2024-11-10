using System;
using System.Collections.Generic;

namespace dal. Models;

public partial class Trip
{
    public int Id { get; set; }

    public string Destination { get; set; } = null!;

    public int CodeType { get; set; }

    public DateTime Date { get; set; }

    public TimeSpan LeavingTime { get; set; }

    public int Long { get; set; }

    public int AvailablePlaces { get; set; }

    public double Price { get; set; }

    public string Img { get; set; } = null!;

    public virtual TypesTrip CodeTypeNavigation { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
