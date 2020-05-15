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
                    { 1, "admin@gmail.com", "admin", "admin", new byte[] { 143, 159, 101, 112, 8, 133, 169, 85, 194, 202, 56, 68, 142, 163, 117, 106, 183, 170, 204, 22, 224, 129, 39, 111, 131, 125, 126, 61, 155, 215, 63, 166, 46, 61, 39, 172, 40, 57, 153, 69, 173, 42, 200, 253, 185, 38, 147, 98, 69, 130, 135, 154, 73, 236, 69, 52, 98, 71, 253, 232, 239, 19, 87, 23 }, new byte[] { 163, 205, 216, 120, 158, 213, 58, 48, 5, 142, 199, 121, 213, 184, 208, 195, 233, 117, 137, 112, 18, 217, 27, 250, 21, 233, 201, 170, 145, 57, 44, 60, 102, 166, 70, 140, 170, 108, 13, 211, 240, 197, 240, 94, 109, 15, 203, 75, 215, 213, 153, 121, 172, 234, 225, 235, 143, 229, 151, 139, 239, 70, 34, 234, 231, 227, 247, 46, 136, 194, 107, 221, 162, 219, 228, 11, 67, 250, 9, 174, 185, 186, 131, 106, 116, 189, 5, 161, 16, 219, 181, 98, 75, 129, 6, 144, 114, 35, 8, 21, 143, 242, 66, 186, 80, 230, 57, 58, 143, 221, 62, 243, 253, 144, 52, 89, 208, 53, 138, 115, 138, 105, 166, 251, 190, 202, 172, 35 }, "admin", "admin" },
                    { 2, "employee@gmail.com", "employee", "employee", new byte[] { 143, 159, 101, 112, 8, 133, 169, 85, 194, 202, 56, 68, 142, 163, 117, 106, 183, 170, 204, 22, 224, 129, 39, 111, 131, 125, 126, 61, 155, 215, 63, 166, 46, 61, 39, 172, 40, 57, 153, 69, 173, 42, 200, 253, 185, 38, 147, 98, 69, 130, 135, 154, 73, 236, 69, 52, 98, 71, 253, 232, 239, 19, 87, 23 }, new byte[] { 163, 205, 216, 120, 158, 213, 58, 48, 5, 142, 199, 121, 213, 184, 208, 195, 233, 117, 137, 112, 18, 217, 27, 250, 21, 233, 201, 170, 145, 57, 44, 60, 102, 166, 70, 140, 170, 108, 13, 211, 240, 197, 240, 94, 109, 15, 203, 75, 215, 213, 153, 121, 172, 234, 225, 235, 143, 229, 151, 139, 239, 70, 34, 234, 231, 227, 247, 46, 136, 194, 107, 221, 162, 219, 228, 11, 67, 250, 9, 174, 185, 186, 131, 106, 116, 189, 5, 161, 16, 219, 181, 98, 75, 129, 6, 144, 114, 35, 8, 21, 143, 242, 66, 186, 80, 230, 57, 58, 143, 221, 62, 243, 253, 144, 52, 89, 208, 53, 138, 115, 138, 105, 166, 251, 190, 202, 172, 35 }, "employee", "employee" },
                    { 3, "member@gmail.com", "member", "member", new byte[] { 143, 159, 101, 112, 8, 133, 169, 85, 194, 202, 56, 68, 142, 163, 117, 106, 183, 170, 204, 22, 224, 129, 39, 111, 131, 125, 126, 61, 155, 215, 63, 166, 46, 61, 39, 172, 40, 57, 153, 69, 173, 42, 200, 253, 185, 38, 147, 98, 69, 130, 135, 154, 73, 236, 69, 52, 98, 71, 253, 232, 239, 19, 87, 23 }, new byte[] { 163, 205, 216, 120, 158, 213, 58, 48, 5, 142, 199, 121, 213, 184, 208, 195, 233, 117, 137, 112, 18, 217, 27, 250, 21, 233, 201, 170, 145, 57, 44, 60, 102, 166, 70, 140, 170, 108, 13, 211, 240, 197, 240, 94, 109, 15, 203, 75, 215, 213, 153, 121, 172, 234, 225, 235, 143, 229, 151, 139, 239, 70, 34, 234, 231, 227, 247, 46, 136, 194, 107, 221, 162, 219, 228, 11, 67, 250, 9, 174, 185, 186, 131, 106, 116, 189, 5, 161, 16, 219, 181, 98, 75, 129, 6, 144, 114, 35, 8, 21, 143, 242, 66, 186, 80, 230, 57, 58, 143, 221, 62, 243, 253, 144, 52, 89, 208, 53, 138, 115, 138, 105, 166, 251, 190, 202, 172, 35 }, "member", "member" }
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
