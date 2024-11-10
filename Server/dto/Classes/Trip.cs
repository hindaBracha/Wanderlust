using System;
using System.Collections.Generic;

namespace dto.Classes;

public class Trip
{
    public int Id { get; set; }

    public string Destination { get; set; } = null!;

    public int CodeType { get; set; }

    public string NameType { get; set; }

    public DateTime Date { get; set; }

    public TimeSpan LeavingTime { get; set; }

    public int Long { get; set; }

    public int AvailablePlaces { get; set; }

    public double Price { get; set; }

    public string Img { get; set; } = null!;

    public bool Medic { get; set; }=false;

}