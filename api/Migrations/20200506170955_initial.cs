using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TapRoomApi.Migrations
{
    public partial class initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "beer",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Brand = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Color = table.Column<string>(nullable: true),
                    Aroma = table.Column<string>(nullable: true),
                    Flavor = table.Column<string>(nullable: true),
                    Price = table.Column<double>(nullable: false),
                    AlcoholContent = table.Column<double>(nullable: false),
                    Pints = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_beer", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    UserName = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Role = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "review",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Rating = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    BeerId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_review", x => x.Id);
                    table.ForeignKey(
                        name: "FK_review_beer_BeerId",
                        column: x => x.BeerId,
                        principalTable: "beer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "beer",
                columns: new[] { "Id", "AlcoholContent", "Aroma", "Brand", "Color", "Flavor", "Name", "Pints", "Price" },
                values: new object[,]
                {
                    { 1, 5.5999999999999996, "Citrus, apple, Biscuit", "Fremont", "Golden Caramel", "Pine, orange, bready", "Universale", 124, 5.0 },
                    { 2, 6.2000000000000002, "Orange, dank, juicy", "Fremont", "Yellow amber", "Grapefruit, pine, honey", "Interurban", 20, 5.0 },
                    { 3, 7.4000000000000004, "Apple", "Rileys", "Golden Caramel", "Pine, apple", "Round Trip", 124, 9.0 },
                    { 4, 5.5999999999999996, "Citrus, apple, Biscuit", "Fremont", "Golden Caramel", "Pine, orange, bready", "Universale", 124, 5.0 },
                    { 5, 10.0, "Citrus, apple, Biscuit", "Andy's", "Golden Brown", "Pine, orange, bready", "The Good Stuff", 124, 12.0 }
                });

            migrationBuilder.InsertData(
                table: "user",
                columns: new[] { "Id", "Email", "FirstName", "LastName", "PasswordHash", "PasswordSalt", "Role", "UserName" },
                values: new object[,]
                {
                    { 1, "admin@gmail.com", "Admin", "Admin", new byte[] { 105, 98, 250, 217, 156, 81, 161, 85, 121, 56, 184, 45, 142, 8, 67, 93, 155, 116, 233, 87, 75, 107, 173, 118, 181, 52, 151, 220, 216, 127, 79, 36, 108, 29, 223, 177, 184, 45, 220, 222, 134, 65, 77, 95, 228, 98, 223, 58, 74, 218, 169, 182, 217, 55, 213, 10, 121, 238, 74, 185, 89, 19, 130, 226 }, new byte[] { 185, 53, 176, 0, 87, 206, 130, 140, 255, 198, 61, 98, 235, 11, 206, 136, 254, 65, 58, 203, 41, 234, 118, 157, 84, 87, 211, 45, 232, 238, 2, 230, 193, 10, 98, 247, 215, 79, 91, 229, 199, 48, 135, 183, 231, 181, 96, 100, 67, 217, 55, 166, 245, 55, 22, 6, 202, 221, 106, 83, 140, 11, 185, 122, 142, 155, 45, 183, 45, 141, 157, 199, 248, 77, 160, 116, 16, 99, 194, 240, 66, 60, 161, 59, 115, 232, 190, 65, 169, 249, 103, 11, 48, 8, 242, 65, 62, 109, 53, 158, 72, 240, 27, 30, 70, 60, 46, 71, 116, 166, 1, 190, 216, 49, 226, 0, 252, 60, 170, 152, 155, 29, 77, 87, 118, 0, 206, 144 }, "Admin", "Admin" },
                    { 2, "employeeserone@gmail.com", "Employee", "One", new byte[] { 105, 98, 250, 217, 156, 81, 161, 85, 121, 56, 184, 45, 142, 8, 67, 93, 155, 116, 233, 87, 75, 107, 173, 118, 181, 52, 151, 220, 216, 127, 79, 36, 108, 29, 223, 177, 184, 45, 220, 222, 134, 65, 77, 95, 228, 98, 223, 58, 74, 218, 169, 182, 217, 55, 213, 10, 121, 238, 74, 185, 89, 19, 130, 226 }, new byte[] { 185, 53, 176, 0, 87, 206, 130, 140, 255, 198, 61, 98, 235, 11, 206, 136, 254, 65, 58, 203, 41, 234, 118, 157, 84, 87, 211, 45, 232, 238, 2, 230, 193, 10, 98, 247, 215, 79, 91, 229, 199, 48, 135, 183, 231, 181, 96, 100, 67, 217, 55, 166, 245, 55, 22, 6, 202, 221, 106, 83, 140, 11, 185, 122, 142, 155, 45, 183, 45, 141, 157, 199, 248, 77, 160, 116, 16, 99, 194, 240, 66, 60, 161, 59, 115, 232, 190, 65, 169, 249, 103, 11, 48, 8, 242, 65, 62, 109, 53, 158, 72, 240, 27, 30, 70, 60, 46, 71, 116, 166, 1, 190, 216, 49, 226, 0, 252, 60, 170, 152, 155, 29, 77, 87, 118, 0, 206, 144 }, "Employee", "EmployeeUserOne" },
                    { 3, "employeeusertwo@gmail.com", "Employee", "Two", new byte[] { 105, 98, 250, 217, 156, 81, 161, 85, 121, 56, 184, 45, 142, 8, 67, 93, 155, 116, 233, 87, 75, 107, 173, 118, 181, 52, 151, 220, 216, 127, 79, 36, 108, 29, 223, 177, 184, 45, 220, 222, 134, 65, 77, 95, 228, 98, 223, 58, 74, 218, 169, 182, 217, 55, 213, 10, 121, 238, 74, 185, 89, 19, 130, 226 }, new byte[] { 185, 53, 176, 0, 87, 206, 130, 140, 255, 198, 61, 98, 235, 11, 206, 136, 254, 65, 58, 203, 41, 234, 118, 157, 84, 87, 211, 45, 232, 238, 2, 230, 193, 10, 98, 247, 215, 79, 91, 229, 199, 48, 135, 183, 231, 181, 96, 100, 67, 217, 55, 166, 245, 55, 22, 6, 202, 221, 106, 83, 140, 11, 185, 122, 142, 155, 45, 183, 45, 141, 157, 199, 248, 77, 160, 116, 16, 99, 194, 240, 66, 60, 161, 59, 115, 232, 190, 65, 169, 249, 103, 11, 48, 8, 242, 65, 62, 109, 53, 158, 72, 240, 27, 30, 70, 60, 46, 71, 116, 166, 1, 190, 216, 49, 226, 0, 252, 60, 170, 152, 155, 29, 77, 87, 118, 0, 206, 144 }, "Employee", "EmployeeUserTwo" },
                    { 4, "employeeusertwo@gmail.com", "Employee", "Two", new byte[] { 105, 98, 250, 217, 156, 81, 161, 85, 121, 56, 184, 45, 142, 8, 67, 93, 155, 116, 233, 87, 75, 107, 173, 118, 181, 52, 151, 220, 216, 127, 79, 36, 108, 29, 223, 177, 184, 45, 220, 222, 134, 65, 77, 95, 228, 98, 223, 58, 74, 218, 169, 182, 217, 55, 213, 10, 121, 238, 74, 185, 89, 19, 130, 226 }, new byte[] { 185, 53, 176, 0, 87, 206, 130, 140, 255, 198, 61, 98, 235, 11, 206, 136, 254, 65, 58, 203, 41, 234, 118, 157, 84, 87, 211, 45, 232, 238, 2, 230, 193, 10, 98, 247, 215, 79, 91, 229, 199, 48, 135, 183, 231, 181, 96, 100, 67, 217, 55, 166, 245, 55, 22, 6, 202, 221, 106, 83, 140, 11, 185, 122, 142, 155, 45, 183, 45, 141, 157, 199, 248, 77, 160, 116, 16, 99, 194, 240, 66, 60, 161, 59, 115, 232, 190, 65, 169, 249, 103, 11, 48, 8, 242, 65, 62, 109, 53, 158, 72, 240, 27, 30, 70, 60, 46, 71, 116, 166, 1, 190, 216, 49, 226, 0, 252, 60, 170, 152, 155, 29, 77, 87, 118, 0, 206, 144 }, null, "EmployeeUserTwo" },
                    { 5, "employeeusertwo@gmail.com", "Employee", "Two", new byte[] { 105, 98, 250, 217, 156, 81, 161, 85, 121, 56, 184, 45, 142, 8, 67, 93, 155, 116, 233, 87, 75, 107, 173, 118, 181, 52, 151, 220, 216, 127, 79, 36, 108, 29, 223, 177, 184, 45, 220, 222, 134, 65, 77, 95, 228, 98, 223, 58, 74, 218, 169, 182, 217, 55, 213, 10, 121, 238, 74, 185, 89, 19, 130, 226 }, new byte[] { 185, 53, 176, 0, 87, 206, 130, 140, 255, 198, 61, 98, 235, 11, 206, 136, 254, 65, 58, 203, 41, 234, 118, 157, 84, 87, 211, 45, 232, 238, 2, 230, 193, 10, 98, 247, 215, 79, 91, 229, 199, 48, 135, 183, 231, 181, 96, 100, 67, 217, 55, 166, 245, 55, 22, 6, 202, 221, 106, 83, 140, 11, 185, 122, 142, 155, 45, 183, 45, 141, 157, 199, 248, 77, 160, 116, 16, 99, 194, 240, 66, 60, 161, 59, 115, 232, 190, 65, 169, 249, 103, 11, 48, 8, 242, 65, 62, 109, 53, 158, 72, 240, 27, 30, 70, 60, 46, 71, 116, 166, 1, 190, 216, 49, 226, 0, 252, 60, 170, 152, 155, 29, 77, 87, 118, 0, 206, 144 }, null, "EmployeeUserTwo" }
                });

            migrationBuilder.InsertData(
                table: "review",
                columns: new[] { "Id", "BeerId", "Description", "Rating", "UserId" },
                values: new object[] { 2, 3, "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.", 3, 2 });

            migrationBuilder.InsertData(
                table: "review",
                columns: new[] { "Id", "BeerId", "Description", "Rating", "UserId" },
                values: new object[] { 1, 4, "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.", 4, 4 });

            migrationBuilder.InsertData(
                table: "review",
                columns: new[] { "Id", "BeerId", "Description", "Rating", "UserId" },
                values: new object[] { 3, 5, "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.", 4, 5 });

            migrationBuilder.CreateIndex(
                name: "IX_review_BeerId",
                table: "review",
                column: "BeerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "review");

            migrationBuilder.DropTable(
                name: "user");

            migrationBuilder.DropTable(
                name: "beer");
        }
    }
}
