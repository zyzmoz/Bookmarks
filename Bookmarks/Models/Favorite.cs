using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Bookmarks.Models
{
    public class Favorite
    {
        [Key]
        public int Id { get; set; }
        public String Description { get; set; }
        public String Link { get; set; }

    }
}