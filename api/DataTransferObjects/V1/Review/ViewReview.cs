using System.Collections.Generic;

namespace TapRoomApi.DataTransferObjects.V1
{
  public class ViewReview
  {
    public int ReviewId { get; set; }
    public int Rating { get; set; }
    public string Headline { get; set; }
    public string Description { get; set; }
    public int BeerId { get; set; }
    public string Name { get; set; }
    public string UserId { get; set; }
    public virtual ViewBeer Beer { get; set; }
    public string DateCreated { get; set; }
    public virtual ICollection<ViewReviewLike> Likes { get; set; }
  }
}