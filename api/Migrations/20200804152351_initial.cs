using System;
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
                    BeerId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
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
                    table.PrimaryKey("PK_beer", x => x.BeerId);
                });

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
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
                    table.PrimaryKey("PK_user", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "review",
                columns: table => new
                {
                    ReviewId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Rating = table.Column<int>(nullable: false),
                    Description = table.Column<string>(nullable: true),
                    BeerId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_review", x => x.ReviewId);
                    table.ForeignKey(
                        name: "FK_review_beer_BeerId",
                        column: x => x.BeerId,
                        principalTable: "beer",
                        principalColumn: "BeerId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "beer",
                columns: new[] { "BeerId", "AlcoholContent", "Aroma", "Brand", "Color", "Flavor", "Name", "Pints", "Price" },
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
                columns: new[] { "UserId", "Email", "FirstName", "LastName", "PasswordHash", "PasswordSalt", "Role", "UserName" },
                values: new object[,]
                {
                    { 1, "admin@gmail.com", "admin", "admin", new byte[] { 99, 38, 94, 118, 11, 87, 108, 91, 239, 183, 99, 239, 80, 140, 223, 63, 247, 89, 102, 119, 38, 63, 6, 72, 123, 46, 44, 47, 242, 4, 48, 51, 116, 232, 13, 209, 155, 49, 178, 181, 165, 159, 241, 47, 57, 67, 68, 24, 54, 85, 66, 176, 255, 19, 112, 212, 74, 190, 105, 87, 170, 102, 244, 219 }, new byte[] { 223, 113, 222, 5, 231, 233, 144, 68, 202, 110, 231, 1, 136, 21, 122, 213, 219, 57, 69, 183, 157, 231, 80, 192, 185, 199, 147, 204, 59, 167, 147, 24, 194, 237, 90, 91, 139, 116, 137, 169, 42, 65, 254, 103, 142, 61, 177, 180, 243, 52, 54, 96, 157, 8, 11, 246, 242, 50, 42, 250, 101, 46, 185, 77, 49, 176, 75, 185, 210, 242, 28, 32, 211, 73, 55, 231, 81, 12, 85, 196, 11, 146, 171, 197, 76, 190, 80, 117, 230, 57, 204, 233, 166, 171, 16, 31, 222, 225, 32, 135, 244, 136, 72, 211, 27, 216, 138, 20, 52, 76, 114, 242, 84, 171, 74, 80, 172, 107, 120, 24, 31, 252, 218, 83, 57, 174, 172, 154 }, "admin", "admin" },
                    { 2, "employee@gmail.com", "employee", "employee", new byte[] { 99, 38, 94, 118, 11, 87, 108, 91, 239, 183, 99, 239, 80, 140, 223, 63, 247, 89, 102, 119, 38, 63, 6, 72, 123, 46, 44, 47, 242, 4, 48, 51, 116, 232, 13, 209, 155, 49, 178, 181, 165, 159, 241, 47, 57, 67, 68, 24, 54, 85, 66, 176, 255, 19, 112, 212, 74, 190, 105, 87, 170, 102, 244, 219 }, new byte[] { 223, 113, 222, 5, 231, 233, 144, 68, 202, 110, 231, 1, 136, 21, 122, 213, 219, 57, 69, 183, 157, 231, 80, 192, 185, 199, 147, 204, 59, 167, 147, 24, 194, 237, 90, 91, 139, 116, 137, 169, 42, 65, 254, 103, 142, 61, 177, 180, 243, 52, 54, 96, 157, 8, 11, 246, 242, 50, 42, 250, 101, 46, 185, 77, 49, 176, 75, 185, 210, 242, 28, 32, 211, 73, 55, 231, 81, 12, 85, 196, 11, 146, 171, 197, 76, 190, 80, 117, 230, 57, 204, 233, 166, 171, 16, 31, 222, 225, 32, 135, 244, 136, 72, 211, 27, 216, 138, 20, 52, 76, 114, 242, 84, 171, 74, 80, 172, 107, 120, 24, 31, 252, 218, 83, 57, 174, 172, 154 }, "employee", "employee" },
                    { 3, "member@gmail.com", "member", "member", new byte[] { 99, 38, 94, 118, 11, 87, 108, 91, 239, 183, 99, 239, 80, 140, 223, 63, 247, 89, 102, 119, 38, 63, 6, 72, 123, 46, 44, 47, 242, 4, 48, 51, 116, 232, 13, 209, 155, 49, 178, 181, 165, 159, 241, 47, 57, 67, 68, 24, 54, 85, 66, 176, 255, 19, 112, 212, 74, 190, 105, 87, 170, 102, 244, 219 }, new byte[] { 223, 113, 222, 5, 231, 233, 144, 68, 202, 110, 231, 1, 136, 21, 122, 213, 219, 57, 69, 183, 157, 231, 80, 192, 185, 199, 147, 204, 59, 167, 147, 24, 194, 237, 90, 91, 139, 116, 137, 169, 42, 65, 254, 103, 142, 61, 177, 180, 243, 52, 54, 96, 157, 8, 11, 246, 242, 50, 42, 250, 101, 46, 185, 77, 49, 176, 75, 185, 210, 242, 28, 32, 211, 73, 55, 231, 81, 12, 85, 196, 11, 146, 171, 197, 76, 190, 80, 117, 230, 57, 204, 233, 166, 171, 16, 31, 222, 225, 32, 135, 244, 136, 72, 211, 27, 216, 138, 20, 52, 76, 114, 242, 84, 171, 74, 80, 172, 107, 120, 24, 31, 252, 218, 83, 57, 174, 172, 154 }, "member", "member" }
                });

            migrationBuilder.InsertData(
                table: "review",
                columns: new[] { "ReviewId", "BeerId", "Description", "Rating", "UserId" },
                values: new object[] { 2, 3, "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.", 3, 2 });

            migrationBuilder.InsertData(
                table: "review",
                columns: new[] { "ReviewId", "BeerId", "Description", "Rating", "UserId" },
                values: new object[] { 1, 4, "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.", 4, 1 });

            migrationBuilder.InsertData(
                table: "review",
                columns: new[] { "ReviewId", "BeerId", "Description", "Rating", "UserId" },
                values: new object[] { 3, 5, "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.", 4, 3 });

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
