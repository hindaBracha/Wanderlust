using System;
using System.Collections.Generic;

namespace dal. Models;

public partial class User
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public string CellPhone { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public byte Facertificate { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
