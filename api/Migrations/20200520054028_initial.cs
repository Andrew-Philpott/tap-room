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
                    Id = table.Column<int>(nullable: false)
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
                    table.PrimaryKey("PK_beer", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
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
                    table.PrimaryKey("PK_user", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "review",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
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
                    { 1, "admin@gmail.com", "admin", "admin", new byte[] { 136, 63, 234, 173, 11, 53, 243, 131, 129, 183, 174, 40, 69, 136, 180, 172, 96, 9, 40, 245, 134, 238, 251, 123, 84, 114, 129, 84, 215, 119, 253, 89, 73, 238, 215, 51, 98, 98, 153, 202, 10, 29, 195, 130, 164, 50, 121, 240, 121, 200, 145, 122, 196, 96, 84, 241, 242, 244, 146, 203, 139, 30, 96, 252 }, new byte[] { 241, 22, 93, 19, 181, 239, 224, 31, 107, 232, 201, 127, 183, 68, 252, 238, 191, 125, 243, 110, 0, 97, 29, 18, 63, 28, 49, 172, 188, 133, 206, 120, 133, 102, 145, 191, 117, 51, 203, 80, 49, 115, 215, 146, 98, 211, 159, 46, 206, 0, 129, 240, 66, 71, 123, 242, 196, 54, 191, 127, 114, 83, 149, 115, 45, 49, 95, 175, 138, 130, 59, 237, 138, 243, 41, 12, 78, 190, 11, 111, 96, 9, 15, 131, 17, 183, 104, 230, 178, 249, 135, 104, 247, 235, 54, 187, 2, 161, 176, 50, 85, 142, 126, 193, 90, 238, 192, 37, 107, 171, 1, 98, 193, 221, 167, 179, 151, 115, 26, 136, 135, 53, 195, 162, 233, 63, 9, 107 }, "admin", "admin" },
                    { 2, "employee@gmail.com", "employee", "employee", new byte[] { 136, 63, 234, 173, 11, 53, 243, 131, 129, 183, 174, 40, 69, 136, 180, 172, 96, 9, 40, 245, 134, 238, 251, 123, 84, 114, 129, 84, 215, 119, 253, 89, 73, 238, 215, 51, 98, 98, 153, 202, 10, 29, 195, 130, 164, 50, 121, 240, 121, 200, 145, 122, 196, 96, 84, 241, 242, 244, 146, 203, 139, 30, 96, 252 }, new byte[] { 241, 22, 93, 19, 181, 239, 224, 31, 107, 232, 201, 127, 183, 68, 252, 238, 191, 125, 243, 110, 0, 97, 29, 18, 63, 28, 49, 172, 188, 133, 206, 120, 133, 102, 145, 191, 117, 51, 203, 80, 49, 115, 215, 146, 98, 211, 159, 46, 206, 0, 129, 240, 66, 71, 123, 242, 196, 54, 191, 127, 114, 83, 149, 115, 45, 49, 95, 175, 138, 130, 59, 237, 138, 243, 41, 12, 78, 190, 11, 111, 96, 9, 15, 131, 17, 183, 104, 230, 178, 249, 135, 104, 247, 235, 54, 187, 2, 161, 176, 50, 85, 142, 126, 193, 90, 238, 192, 37, 107, 171, 1, 98, 193, 221, 167, 179, 151, 115, 26, 136, 135, 53, 195, 162, 233, 63, 9, 107 }, "employee", "employee" },
                    { 3, "member@gmail.com", "member", "member", new byte[] { 136, 63, 234, 173, 11, 53, 243, 131, 129, 183, 174, 40, 69, 136, 180, 172, 96, 9, 40, 245, 134, 238, 251, 123, 84, 114, 129, 84, 215, 119, 253, 89, 73, 238, 215, 51, 98, 98, 153, 202, 10, 29, 195, 130, 164, 50, 121, 240, 121, 200, 145, 122, 196, 96, 84, 241, 242, 244, 146, 203, 139, 30, 96, 252 }, new byte[] { 241, 22, 93, 19, 181, 239, 224, 31, 107, 232, 201, 127, 183, 68, 252, 238, 191, 125, 243, 110, 0, 97, 29, 18, 63, 28, 49, 172, 188, 133, 206, 120, 133, 102, 145, 191, 117, 51, 203, 80, 49, 115, 215, 146, 98, 211, 159, 46, 206, 0, 129, 240, 66, 71, 123, 242, 196, 54, 191, 127, 114, 83, 149, 115, 45, 49, 95, 175, 138, 130, 59, 237, 138, 243, 41, 12, 78, 190, 11, 111, 96, 9, 15, 131, 17, 183, 104, 230, 178, 249, 135, 104, 247, 235, 54, 187, 2, 161, 176, 50, 85, 142, 126, 193, 90, 238, 192, 37, 107, 171, 1, 98, 193, 221, 167, 179, 151, 115, 26, 136, 135, 53, 195, 162, 233, 63, 9, 107 }, "member", "member" }
                });

            migrationBuilder.InsertData(
                table: "review",
                columns: new[] { "Id", "BeerId", "Description", "Rating", "UserId" },
                values: new object[] { 2, 3, "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.", 3, 2 });

            migrationBuilder.InsertData(
                table: "review",
                columns: new[] { "Id", "BeerId", "Description", "Rating", "UserId" },
                values: new object[] { 1, 4, "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.", 4, 1 });

            migrationBuilder.InsertData(
                table: "review",
                columns: new[] { "Id", "BeerId", "Description", "Rating", "UserId" },
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
