using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace Bookmarks.Models
{
    public class FavoriteDBContext : DbContext
    {
        public DbSet<Favorite> favorite { get; set; }
    }
}