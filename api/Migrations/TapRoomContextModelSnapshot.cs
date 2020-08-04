﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TapRoomApi.Helpers;

namespace TapRoomApi.Migrations
{
    [DbContext(typeof(TapRoomContext))]
    partial class TapRoomContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("TapRoomApi.Entities.Beer", b =>
                {
                    b.Property<int>("BeerId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("AlcoholContent")
                        .HasColumnType("float");

                    b.Property<string>("Aroma")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Brand")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Color")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Flavor")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Pints")
                        .HasColumnType("int");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.HasKey("BeerId");

                    b.ToTable("beer");

                    b.HasData(
                        new
                        {
                            BeerId = 1,
                            AlcoholContent = 5.5999999999999996,
                            Aroma = "Citrus, apple, Biscuit",
                            Brand = "Fremont",
                            Color = "Golden Caramel",
                            Flavor = "Pine, orange, bready",
                            Name = "Universale",
                            Pints = 124,
                            Price = 5.0
                        },
                        new
                        {
                            BeerId = 2,
                            AlcoholContent = 6.2000000000000002,
                            Aroma = "Orange, dank, juicy",
                            Brand = "Fremont",
                            Color = "Yellow amber",
                            Flavor = "Grapefruit, pine, honey",
                            Name = "Interurban",
                            Pints = 20,
                            Price = 5.0
                        },
                        new
                        {
                            BeerId = 3,
                            AlcoholContent = 7.4000000000000004,
                            Aroma = "Apple",
                            Brand = "Rileys",
                            Color = "Golden Caramel",
                            Flavor = "Pine, apple",
                            Name = "Round Trip",
                            Pints = 124,
                            Price = 9.0
                        },
                        new
                        {
                            BeerId = 4,
                            AlcoholContent = 5.5999999999999996,
                            Aroma = "Citrus, apple, Biscuit",
                            Brand = "Fremont",
                            Color = "Golden Caramel",
                            Flavor = "Pine, orange, bready",
                            Name = "Universale",
                            Pints = 124,
                            Price = 5.0
                        },
                        new
                        {
                            BeerId = 5,
                            AlcoholContent = 10.0,
                            Aroma = "Citrus, apple, Biscuit",
                            Brand = "Andy's",
                            Color = "Golden Brown",
                            Flavor = "Pine, orange, bready",
                            Name = "The Good Stuff",
                            Pints = 124,
                            Price = 12.0
                        });
                });

            modelBuilder.Entity("TapRoomApi.Entities.Review", b =>
                {
                    b.Property<int>("ReviewId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("BeerId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("ReviewId");

                    b.HasIndex("BeerId");

                    b.ToTable("review");

                    b.HasData(
                        new
                        {
                            ReviewId = 1,
                            BeerId = 4,
                            Description = "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
                            Rating = 4,
                            UserId = 1
                        },
                        new
                        {
                            ReviewId = 2,
                            BeerId = 3,
                            Description = "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.",
                            Rating = 3,
                            UserId = 2
                        },
                        new
                        {
                            ReviewId = 3,
                            BeerId = 5,
                            Description = "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
                            Rating = 4,
                            UserId = 3
                        });
                });

            modelBuilder.Entity("TapRoomApi.Entities.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("user");

                    b.HasData(
                        new
                        {
                            UserId = 1,
                            Email = "admin@gmail.com",
                            FirstName = "admin",
                            LastName = "admin",
                            PasswordHash = new byte[] { 99, 38, 94, 118, 11, 87, 108, 91, 239, 183, 99, 239, 80, 140, 223, 63, 247, 89, 102, 119, 38, 63, 6, 72, 123, 46, 44, 47, 242, 4, 48, 51, 116, 232, 13, 209, 155, 49, 178, 181, 165, 159, 241, 47, 57, 67, 68, 24, 54, 85, 66, 176, 255, 19, 112, 212, 74, 190, 105, 87, 170, 102, 244, 219 },
                            PasswordSalt = new byte[] { 223, 113, 222, 5, 231, 233, 144, 68, 202, 110, 231, 1, 136, 21, 122, 213, 219, 57, 69, 183, 157, 231, 80, 192, 185, 199, 147, 204, 59, 167, 147, 24, 194, 237, 90, 91, 139, 116, 137, 169, 42, 65, 254, 103, 142, 61, 177, 180, 243, 52, 54, 96, 157, 8, 11, 246, 242, 50, 42, 250, 101, 46, 185, 77, 49, 176, 75, 185, 210, 242, 28, 32, 211, 73, 55, 231, 81, 12, 85, 196, 11, 146, 171, 197, 76, 190, 80, 117, 230, 57, 204, 233, 166, 171, 16, 31, 222, 225, 32, 135, 244, 136, 72, 211, 27, 216, 138, 20, 52, 76, 114, 242, 84, 171, 74, 80, 172, 107, 120, 24, 31, 252, 218, 83, 57, 174, 172, 154 },
                            Role = "admin",
                            UserName = "admin"
                        },
                        new
                        {
                            UserId = 2,
                            Email = "employee@gmail.com",
                            FirstName = "employee",
                            LastName = "employee",
                            PasswordHash = new byte[] { 99, 38, 94, 118, 11, 87, 108, 91, 239, 183, 99, 239, 80, 140, 223, 63, 247, 89, 102, 119, 38, 63, 6, 72, 123, 46, 44, 47, 242, 4, 48, 51, 116, 232, 13, 209, 155, 49, 178, 181, 165, 159, 241, 47, 57, 67, 68, 24, 54, 85, 66, 176, 255, 19, 112, 212, 74, 190, 105, 87, 170, 102, 244, 219 },
                            PasswordSalt = new byte[] { 223, 113, 222, 5, 231, 233, 144, 68, 202, 110, 231, 1, 136, 21, 122, 213, 219, 57, 69, 183, 157, 231, 80, 192, 185, 199, 147, 204, 59, 167, 147, 24, 194, 237, 90, 91, 139, 116, 137, 169, 42, 65, 254, 103, 142, 61, 177, 180, 243, 52, 54, 96, 157, 8, 11, 246, 242, 50, 42, 250, 101, 46, 185, 77, 49, 176, 75, 185, 210, 242, 28, 32, 211, 73, 55, 231, 81, 12, 85, 196, 11, 146, 171, 197, 76, 190, 80, 117, 230, 57, 204, 233, 166, 171, 16, 31, 222, 225, 32, 135, 244, 136, 72, 211, 27, 216, 138, 20, 52, 76, 114, 242, 84, 171, 74, 80, 172, 107, 120, 24, 31, 252, 218, 83, 57, 174, 172, 154 },
                            Role = "employee",
                            UserName = "employee"
                        },
                        new
                        {
                            UserId = 3,
                            Email = "member@gmail.com",
                            FirstName = "member",
                            LastName = "member",
                            PasswordHash = new byte[] { 99, 38, 94, 118, 11, 87, 108, 91, 239, 183, 99, 239, 80, 140, 223, 63, 247, 89, 102, 119, 38, 63, 6, 72, 123, 46, 44, 47, 242, 4, 48, 51, 116, 232, 13, 209, 155, 49, 178, 181, 165, 159, 241, 47, 57, 67, 68, 24, 54, 85, 66, 176, 255, 19, 112, 212, 74, 190, 105, 87, 170, 102, 244, 219 },
                            PasswordSalt = new byte[] { 223, 113, 222, 5, 231, 233, 144, 68, 202, 110, 231, 1, 136, 21, 122, 213, 219, 57, 69, 183, 157, 231, 80, 192, 185, 199, 147, 204, 59, 167, 147, 24, 194, 237, 90, 91, 139, 116, 137, 169, 42, 65, 254, 103, 142, 61, 177, 180, 243, 52, 54, 96, 157, 8, 11, 246, 242, 50, 42, 250, 101, 46, 185, 77, 49, 176, 75, 185, 210, 242, 28, 32, 211, 73, 55, 231, 81, 12, 85, 196, 11, 146, 171, 197, 76, 190, 80, 117, 230, 57, 204, 233, 166, 171, 16, 31, 222, 225, 32, 135, 244, 136, 72, 211, 27, 216, 138, 20, 52, 76, 114, 242, 84, 171, 74, 80, 172, 107, 120, 24, 31, 252, 218, 83, 57, 174, 172, 154 },
                            Role = "member",
                            UserName = "member"
                        });
                });

            modelBuilder.Entity("TapRoomApi.Entities.Review", b =>
                {
                    b.HasOne("TapRoomApi.Entities.Beer", null)
                        .WithMany("Reviews")
                        .HasForeignKey("BeerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
