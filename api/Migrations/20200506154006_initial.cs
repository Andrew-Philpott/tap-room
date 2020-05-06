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
                    Pints = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
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
                columns: new[] { "Id", "AlcoholContent", "Aroma", "Brand", "Color", "Flavor", "Name", "Pints", "Price", "UserId" },
                values: new object[,]
                {
                    { 1, 5.5999999999999996, "Citrus, apple, Biscuit", "Fremont", "Golden Caramel", "Pine, orange, bready", "Universale", 124, 5.0, 1 },
                    { 2, 6.2000000000000002, "Orange, dank, juicy", "Fremont", "Yellow amber", "Grapefruit, pine, honey", "Interurban", 20, 5.0, 1 },
                    { 3, 7.4000000000000004, "Apple", "Rileys", "Golden Caramel", "Pine, apple", "Round Trip", 124, 9.0, 1 },
                    { 4, 5.5999999999999996, "Citrus, apple, Biscuit", "Fremont", "Golden Caramel", "Pine, orange, bready", "Universale", 124, 5.0, 1 },
                    { 5, 10.0, "Citrus, apple, Biscuit", "Andy's", "Golden Brown", "Pine, orange, bready", "The Good Stuff", 124, 12.0, 1 }
                });

            migrationBuilder.InsertData(
                table: "user",
                columns: new[] { "Id", "Email", "FirstName", "LastName", "PasswordHash", "PasswordSalt", "Role", "UserName" },
                values: new object[,]
                {
                    { 1, "admin@gmail.com", "Admin", "Admin", new byte[] { 218, 131, 183, 163, 155, 60, 228, 30, 90, 244, 178, 12, 139, 45, 73, 133, 177, 196, 182, 122, 146, 182, 194, 121, 254, 254, 156, 199, 127, 74, 49, 22, 98, 78, 125, 34, 166, 239, 185, 10, 14, 253, 2, 104, 78, 55, 217, 112, 68, 124, 232, 158, 61, 105, 241, 132, 66, 109, 30, 53, 79, 54, 251, 59 }, new byte[] { 72, 161, 109, 219, 194, 170, 180, 193, 13, 4, 66, 205, 225, 32, 173, 14, 204, 98, 82, 112, 7, 160, 63, 190, 91, 173, 224, 144, 190, 226, 132, 179, 211, 92, 123, 53, 82, 7, 108, 227, 190, 114, 233, 216, 206, 84, 74, 141, 216, 31, 242, 58, 181, 171, 146, 241, 7, 229, 181, 157, 65, 14, 168, 251, 214, 157, 142, 245, 13, 193, 81, 119, 49, 62, 170, 71, 22, 201, 61, 192, 90, 153, 202, 13, 144, 135, 101, 95, 23, 2, 59, 106, 190, 80, 135, 199, 76, 58, 170, 63, 99, 190, 97, 59, 126, 96, 138, 6, 206, 209, 197, 161, 28, 78, 88, 185, 82, 156, 62, 1, 161, 146, 29, 88, 85, 73, 110, 125 }, "Admin", "Admin" },
                    { 2, "employeeserone@gmail.com", "Employee", "One", new byte[] { 218, 131, 183, 163, 155, 60, 228, 30, 90, 244, 178, 12, 139, 45, 73, 133, 177, 196, 182, 122, 146, 182, 194, 121, 254, 254, 156, 199, 127, 74, 49, 22, 98, 78, 125, 34, 166, 239, 185, 10, 14, 253, 2, 104, 78, 55, 217, 112, 68, 124, 232, 158, 61, 105, 241, 132, 66, 109, 30, 53, 79, 54, 251, 59 }, new byte[] { 72, 161, 109, 219, 194, 170, 180, 193, 13, 4, 66, 205, 225, 32, 173, 14, 204, 98, 82, 112, 7, 160, 63, 190, 91, 173, 224, 144, 190, 226, 132, 179, 211, 92, 123, 53, 82, 7, 108, 227, 190, 114, 233, 216, 206, 84, 74, 141, 216, 31, 242, 58, 181, 171, 146, 241, 7, 229, 181, 157, 65, 14, 168, 251, 214, 157, 142, 245, 13, 193, 81, 119, 49, 62, 170, 71, 22, 201, 61, 192, 90, 153, 202, 13, 144, 135, 101, 95, 23, 2, 59, 106, 190, 80, 135, 199, 76, 58, 170, 63, 99, 190, 97, 59, 126, 96, 138, 6, 206, 209, 197, 161, 28, 78, 88, 185, 82, 156, 62, 1, 161, 146, 29, 88, 85, 73, 110, 125 }, "Employee", "EmployeeUserOne" },
                    { 3, "employeeusertwo@gmail.com", "Employee", "Two", new byte[] { 218, 131, 183, 163, 155, 60, 228, 30, 90, 244, 178, 12, 139, 45, 73, 133, 177, 196, 182, 122, 146, 182, 194, 121, 254, 254, 156, 199, 127, 74, 49, 22, 98, 78, 125, 34, 166, 239, 185, 10, 14, 253, 2, 104, 78, 55, 217, 112, 68, 124, 232, 158, 61, 105, 241, 132, 66, 109, 30, 53, 79, 54, 251, 59 }, new byte[] { 72, 161, 109, 219, 194, 170, 180, 193, 13, 4, 66, 205, 225, 32, 173, 14, 204, 98, 82, 112, 7, 160, 63, 190, 91, 173, 224, 144, 190, 226, 132, 179, 211, 92, 123, 53, 82, 7, 108, 227, 190, 114, 233, 216, 206, 84, 74, 141, 216, 31, 242, 58, 181, 171, 146, 241, 7, 229, 181, 157, 65, 14, 168, 251, 214, 157, 142, 245, 13, 193, 81, 119, 49, 62, 170, 71, 22, 201, 61, 192, 90, 153, 202, 13, 144, 135, 101, 95, 23, 2, 59, 106, 190, 80, 135, 199, 76, 58, 170, 63, 99, 190, 97, 59, 126, 96, 138, 6, 206, 209, 197, 161, 28, 78, 88, 185, 82, 156, 62, 1, 161, 146, 29, 88, 85, 73, 110, 125 }, "Employee", "EmployeeUserTwo" },
                    { 4, "employeeusertwo@gmail.com", "Employee", "Two", new byte[] { 218, 131, 183, 163, 155, 60, 228, 30, 90, 244, 178, 12, 139, 45, 73, 133, 177, 196, 182, 122, 146, 182, 194, 121, 254, 254, 156, 199, 127, 74, 49, 22, 98, 78, 125, 34, 166, 239, 185, 10, 14, 253, 2, 104, 78, 55, 217, 112, 68, 124, 232, 158, 61, 105, 241, 132, 66, 109, 30, 53, 79, 54, 251, 59 }, new byte[] { 72, 161, 109, 219, 194, 170, 180, 193, 13, 4, 66, 205, 225, 32, 173, 14, 204, 98, 82, 112, 7, 160, 63, 190, 91, 173, 224, 144, 190, 226, 132, 179, 211, 92, 123, 53, 82, 7, 108, 227, 190, 114, 233, 216, 206, 84, 74, 141, 216, 31, 242, 58, 181, 171, 146, 241, 7, 229, 181, 157, 65, 14, 168, 251, 214, 157, 142, 245, 13, 193, 81, 119, 49, 62, 170, 71, 22, 201, 61, 192, 90, 153, 202, 13, 144, 135, 101, 95, 23, 2, 59, 106, 190, 80, 135, 199, 76, 58, 170, 63, 99, 190, 97, 59, 126, 96, 138, 6, 206, 209, 197, 161, 28, 78, 88, 185, 82, 156, 62, 1, 161, 146, 29, 88, 85, 73, 110, 125 }, null, "EmployeeUserTwo" },
                    { 5, "employeeusertwo@gmail.com", "Employee", "Two", new byte[] { 218, 131, 183, 163, 155, 60, 228, 30, 90, 244, 178, 12, 139, 45, 73, 133, 177, 196, 182, 122, 146, 182, 194, 121, 254, 254, 156, 199, 127, 74, 49, 22, 98, 78, 125, 34, 166, 239, 185, 10, 14, 253, 2, 104, 78, 55, 217, 112, 68, 124, 232, 158, 61, 105, 241, 132, 66, 109, 30, 53, 79, 54, 251, 59 }, new byte[] { 72, 161, 109, 219, 194, 170, 180, 193, 13, 4, 66, 205, 225, 32, 173, 14, 204, 98, 82, 112, 7, 160, 63, 190, 91, 173, 224, 144, 190, 226, 132, 179, 211, 92, 123, 53, 82, 7, 108, 227, 190, 114, 233, 216, 206, 84, 74, 141, 216, 31, 242, 58, 181, 171, 146, 241, 7, 229, 181, 157, 65, 14, 168, 251, 214, 157, 142, 245, 13, 193, 81, 119, 49, 62, 170, 71, 22, 201, 61, 192, 90, 153, 202, 13, 144, 135, 101, 95, 23, 2, 59, 106, 190, 80, 135, 199, 76, 58, 170, 63, 99, 190, 97, 59, 126, 96, 138, 6, 206, 209, 197, 161, 28, 78, 88, 185, 82, 156, 62, 1, 161, 146, 29, 88, 85, 73, 110, 125 }, null, "EmployeeUserTwo" }
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
