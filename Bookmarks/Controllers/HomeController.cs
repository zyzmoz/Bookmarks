using Bookmarks.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Bookmarks.Controllers
{
    public class HomeController : Controller
    {
        //Getting Favorites
        public ActionResult Index()
        {
            return View();
        }

        //Getting all favorites
        public JsonResult GetAllFavorites()
        {
            using (FavoriteDBContext contextObj = new FavoriteDBContext())
            {
                var favoriteList = contextObj.favorite.ToList();
                return Json(favoriteList, JsonRequestBehavior.AllowGet);
            }
        }

        //Getting Favorite by Id
        public JsonResult GetFavoriteById(string id)
        {
            using (FavoriteDBContext contextObj = new FavoriteDBContext())
            {
                var favoriteId = Convert.ToInt32(id);
                var getFavoriteById = contextObj.favorite.Find(favoriteId);
                return Json(getFavoriteById, JsonRequestBehavior.AllowGet);
            }
        }

        //Update Favorite
        public string UpdateFavorite(Favorite favorite)
        {
            if (favorite != null)
            {
                using (FavoriteDBContext contextObj = new FavoriteDBContext())
                {
                    int favoriteId = Convert.ToInt32(favorite.Id);
                    Favorite _favorite = contextObj.favorite.Where(b => b.Id == favoriteId).FirstOrDefault();

                    _favorite.Description = favorite.Description;
                    _favorite.Link = favorite.Link;

                    contextObj.SaveChanges();
                    return "Favorite updated";
                }
            }
            else
            {
                return "Invelid Favorite record";
            }
        }

        //Adding a Favorite
        public string AddFavorite(Favorite favorite)
        {
            if (favorite != null)
            {
                using (FavoriteDBContext contextObj = new FavoriteDBContext())
                {
                    contextObj.favorite.Add(favorite);
                    contextObj.SaveChanges();
                    return "Favorite added";
                }

            }
            else
            {
                return "Invalid Favorite record";
            }
        }

        //Deleting a Favorite
        public string DeleteFavorite(string id)
        {
            if (!String.IsNullOrEmpty(id))
            {
                try
                {
                    int _favoriteId = Convert.ToInt32(id);

                    using (FavoriteDBContext contextObj = new FavoriteDBContext())
                    {
                        var _favorite = contextObj.favorite.Find(_favoriteId);

                        contextObj.favorite.Remove(_favorite);
                        contextObj.SaveChanges();

                        return "Record deleted sucessfully";
                    }             

                }
                catch (Exception)
                {
                    return "Record not found";
                }
            }
            else
            {
                return "Record not found";
            }
        }
        

    }
}