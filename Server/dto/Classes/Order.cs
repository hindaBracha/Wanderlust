using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;

namespace dto.Classes;

public class Order
{
    public int Id { get; set; }

    public int CodeUser { get; set; }

    public string Name { get; set; }

    public DateTime OrderDate { get; set; }

    public TimeSpan OrderTime { get; set; }

    public int CodeTrip { get; set; }

    public string Destination { get; set; }

    public DateTime Date  { get; set; }

    public int NumberOfPlaces { get; set; }
}
