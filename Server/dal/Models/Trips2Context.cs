using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace dal. Models;

public partial class Trips2Context : DbContext
{
    public Trips2Context()
    {
    }

    public Trips2Context(DbContextOptions<Trips2Context> options)
        : base(options)
    {
    }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<Trip> Trips { get; set; }

    public virtual DbSet<TypesTrip> TypesTrips { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source= AYALA\\SQLEXPRESS;Initial Catalog=trips2; Trusted_Connection=True;MultipleActiveResultSets=True;Encrypt=False");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__orders__3213E83F54BDAE26");

            entity.ToTable("orders");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CodeTrip).HasColumnName("codeTrip");
            entity.Property(e => e.CodeUser).HasColumnName("codeUser");
            entity.Property(e => e.OrderDate)
                .HasColumnType("date")
                .HasColumnName("orderDate");
            entity.Property(e => e.OrderTime).HasColumnName("orderTime");

            entity.HasOne(d => d.CodeTripNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.CodeTrip)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__orders__codeTrip__3E52440B");

            entity.HasOne(d => d.CodeUserNavigation).WithMany(p => p.Orders)
                .HasForeignKey(d => d.CodeUser)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__orders__codeUser__3D5E1FD2");
        });

        modelBuilder.Entity<Trip>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__trips__3213E83FF790A8AF");

            entity.ToTable("trips");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.AvailablePlaces).HasColumnName("availablePlaces");
            entity.Property(e => e.CodeType).HasColumnName("codeType");
            entity.Property(e => e.Date)
                .HasColumnType("datetime")
                .HasColumnName("date");
            entity.Property(e => e.Destination)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("destination");
            entity.Property(e => e.Img)
                .HasMaxLength(300)
                .IsUnicode(false)
                .HasColumnName("img");
            entity.Property(e => e.LeavingTime).HasColumnName("leavingTime");
            entity.Property(e => e.Long).HasColumnName("long");
            entity.Property(e => e.Price).HasColumnName("price");

            entity.HasOne(d => d.CodeTypeNavigation).WithMany(p => p.Trips)
                .HasForeignKey(d => d.CodeType)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__trips__codeType__3A81B327");
        });

        modelBuilder.Entity<TypesTrip>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__typesTri__3213E83F2CC41976");

            entity.ToTable("typesTrip");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("name");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__users__3213E83F3B556CF6");

            entity.ToTable("users");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.CellPhone)
                .HasMaxLength(10)
                .IsUnicode(false)
                .HasColumnName("cellPhone");
            entity.Property(e => e.Email)
                .HasMaxLength(30)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.Facertificate).HasColumnName("FACertificate");
            entity.Property(e => e.LastName)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("lastName");
            entity.Property(e => e.Name)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("name");
            entity.Property(e => e.Password)
                .HasMaxLength(8)
                .IsUnicode(false)
                .HasColumnName("password");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
