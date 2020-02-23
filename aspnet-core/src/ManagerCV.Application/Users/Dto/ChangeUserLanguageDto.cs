using System.ComponentModel.DataAnnotations;

namespace ManagerCV.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}