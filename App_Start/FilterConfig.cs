﻿using System.Web.Mvc;
using Chat.Controllers.Attriburtes;
namespace Chat
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new CustomAuthorize());
        }
    }
}
