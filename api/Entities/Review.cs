using System;
using System.Globalization;
using System.Collections.Generic;

namespace TapRoomApi.Entities
{
  public class Review
  {
    public int ReviewId { get; set; }
    public int Rating { get; set; }
    public string Headline { get; set; }
    public string Description { get; set; }
    public virtual Beer Beer { get; set; }
    public int BeerId { get; set; }
    public string UserId { get; set; }
    public string Name { get; set; }
    public string DateCreated { get; set; } = DateTime.Now.ToString("g", CultureInfo.CreateSpecificCulture("en-us"));
    public virtual ICollection<ReviewLike> Likes { get; set; }
  }
}