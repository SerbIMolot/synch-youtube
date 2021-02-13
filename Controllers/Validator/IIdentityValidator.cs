using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using System.Text.RegularExpressions;
using System;
using Chat.Models;
using Chat.Controllers;
using Chat;
using System.Linq;

public class CustomUserValidator : UserValidator<ApplicationUser>
{
    public CustomUserValidator(ApplicationUserManager mgr)
        : base(mgr)
    {
        AllowOnlyAlphanumericUserNames = false;
    }
    public override async Task<IdentityResult> ValidateAsync(ApplicationUser user)
    {
        IdentityResult result = await base.ValidateAsync(user);
        //if (user.Email.ToLower().EndsWith("@spam.com"))
        //{
        //    var errors = result.Errors.ToList();
        //    errors.Add("Данный домен находится в спам-базе. Выберите другой почтовый сервис");
        //    result = new IdentityResult(errors);
        //}
        //if (user.UserName.Contains("admin"))
        //{
        //    var errors = result.Errors.ToList();
        //    errors.Add("Ник пользователя не должен содержать слово 'admin'");
        //    result = new IdentityResult(errors);
        //}
        return result;
    }
}
public class CustomPasswordValidator : IIdentityValidator<string>
{
    public int RequiredLength { get; set; } // минимальная длина
    public CustomPasswordValidator(int length)
    {
        RequiredLength = length;
    }
    public Task<IdentityResult> ValidateAsync(string item)
    {
        if (String.IsNullOrEmpty(item) || item.Length < RequiredLength)
        {
            return Task.FromResult(IdentityResult.Failed(
                            String.Format("Минимальная длина пароля равна {0}", RequiredLength)));
        }
        string pattern = "^[0-9]+$";

        if (!Regex.IsMatch(item, pattern))
        {
            return Task.FromResult(IdentityResult.Failed("Пароль должен состоять только из цифр"));
        }

        return Task.FromResult(IdentityResult.Success);
    }
}