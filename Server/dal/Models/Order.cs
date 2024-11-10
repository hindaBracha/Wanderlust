using System;
using System.Collections.Generic;

namespace dal. Models;

public partial class Order
{
    public int Id { get; set; }

    public int CodeUser { get; set; }

    public DateTime OrderDate { get; set; }

    public TimeSpan OrderTime { get; set; }

    public int CodeTrip { get; set; }

    public int NumberOfPlaces { get; set; }

    public virtual Trip CodeTripNavigation { get; set; } = null!;

    public virtual User CodeUserNavigation { get; set; } = null!;
}
